<?php
// Site-visit enquiry endpoint. Mails the sales inbox and keeps a private copy of every lead.

const MAIL_FROM = 'enquiry@throughthewoods.in';
const MAIL_TO = 'enquiry@throughthewoods.in, Info@landlifespace.in'; // second inbox is the safety net
const RATE_LIMIT = 5;   // submissions per IP per hour
const MAX_BODY = 8192;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $code, array $body): never
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

/**
 * Minimal authenticated SMTP client (implicit TLS). Credentials live in
 * <above-webroot>/enquiries/smtp.php, which returns ['user' => ..., 'pass' => ...].
 * Returns null on success or an error string.
 */
function smtp_send(array $cfg, string $from, array $to, string $data): ?string
{
    $fp = @stream_socket_client('ssl://smtp.hostinger.com:465', $errno, $errstr, 12);
    if (!$fp) {
        return "connect: $errstr";
    }
    stream_set_timeout($fp, 12);
    $read = static function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $out .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $out;
    };
    $cmd = static function (string $c, string $expect) use ($fp, $read): ?string {
        fwrite($fp, $c . "\r\n");
        $r = $read();
        return str_starts_with($r, $expect) ? null : trim($r);
    };
    $err = null;
    if (!str_starts_with($read(), '220')) {
        fclose($fp);
        return 'banner';
    }
    $steps = [
        ['EHLO throughthewoods.in', '250'],
        ['AUTH LOGIN', '334'],
        [base64_encode($cfg['user']), '334'],
        [base64_encode($cfg['pass']), '235'],
        ["MAIL FROM:<$from>", '250'],
    ];
    foreach ($to as $rcpt) {
        $steps[] = ["RCPT TO:<$rcpt>", '250'];
    }
    $steps[] = ['DATA', '354'];
    foreach ($steps as [$c, $e]) {
        if (($err = $cmd($c, $e)) !== null) {
            @fwrite($fp, "QUIT\r\n");
            fclose($fp);
            return $c === base64_encode($cfg['pass']) ? "auth: $err" : $err;
        }
    }
    // Dot-stuff and terminate.
    $data = preg_replace('/^\./m', '..', str_replace("\r\n", "\n", $data));
    $err = $cmd(str_replace("\n", "\r\n", $data) . "\r\n.", '250');
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $err;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false]);
}

$host = $_SERVER['HTTP_HOST'] ?? '';
$origin = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST);
if ($origin !== null && $origin !== false && preg_replace('/^www\./', '', $origin) !== preg_replace('/^www\./', '', $host)) {
    reply(403, ['ok' => false]);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if ($raw === false || strlen($raw) > MAX_BODY) {
    reply(413, ['ok' => false]);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    reply(400, ['ok' => false]);
}

// Honeypot: bots fill the hidden field. Pretend success so they do not retry.
if (!empty($in['website'])) {
    reply(200, ['ok' => true]);
}

$clean = static function ($v, int $max): string {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
};

$name = preg_replace('/\s+/u', ' ', $clean($in['name'] ?? '', 80));
$phone = $clean($in['phone'] ?? '', 20);
$email = $clean($in['email'] ?? '', 120);
$budget = $clean($in['budget'] ?? '', 40);
$size = $clean($in['size'] ?? '', 40);
$message = $clean($in['message'] ?? '', 800);

if (
    mb_strlen($name) < 2
    || !preg_match('/^[6-9][0-9]{9}$/', $phone)
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || $budget === ''
    || $size === ''
) {
    reply(422, ['ok' => false]);
}

// Private storage lives above public_html so it is never served.
$store = dirname($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) . '/enquiries';
if (!is_dir($store)) {
    @mkdir($store, 0700, true);
}

// Per-IP rate limit.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = $store . '/rate-' . md5($ip) . '.json';
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter((array) json_decode((string) @file_get_contents($rateFile), true), static fn ($t) => $t > $now - 3600);
}
if (count($hits) >= RATE_LIMIT) {
    reply(429, ['ok' => false]);
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

$lead = [
    'received' => gmdate('c'),
    'ip' => $ip,
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'budget' => $budget,
    'size' => $size,
    'message' => $message,
];

// 1. Durable copy first: a mail failure must never lose a lead.
$saved = @file_put_contents($store . '/leads.jsonl', json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) !== false;

// 2. Notify the team.
$body = "New site-visit enquiry from throughthewoods.in\n\n"
    . "Name:      $name\n"
    . "Phone:     +91 $phone\n"
    . "Email:     $email\n"
    . "Budget:    $budget\n"
    . "Plot size: $size\n"
    . 'Message:   ' . ($message !== '' ? $message : 'N/A') . "\n\n"
    . 'Received:  ' . gmdate('Y-m-d H:i') . " UTC\n";
$subject = mb_encode_mimeheader('New site-visit enquiry - ' . $name, 'UTF-8');
$recipients = array_map('trim', explode(',', MAIL_TO));
$method = 'none';
$mailError = null;
$mailed = false;

$cfgFile = $store . '/smtp.php';
$cfg = is_file($cfgFile) ? include $cfgFile : null;
if (is_array($cfg) && !empty($cfg['user']) && !empty($cfg['pass'])) {
    $method = 'smtp';
    $host = 'throughthewoods.in';
    $msg = implode("\r\n", [
        'Date: ' . date('r'),
        'From: Through the Woods <' . MAIL_FROM . '>',
        'To: ' . implode(', ', $recipients),
        'Reply-To: ' . $email,
        'Subject: ' . $subject,
        'Message-ID: <' . bin2hex(random_bytes(8)) . '@' . $host . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: quoted-printable',
        '',
        quoted_printable_encode($body),
    ]);
    $mailError = smtp_send($cfg, MAIL_FROM, $recipients, $msg);
    $mailed = $mailError === null;
}
if (!$mailed) {
    // Fallback: local relay. Not reliable on this host, so the lead log remains the source of truth.
    $method .= '+mail';
    $headers = implode("\r\n", [
        'From: Through the Woods <' . MAIL_FROM . '>',
        'Reply-To: ' . $email,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ]);
    $mailed = mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
}

// Record the outcome so a lost mail is visible, not silent.
$status = ['received' => $lead['received'], 'method' => $method, 'mailed' => $mailed, 'error' => $mailError];
@file_put_contents($store . '/mail-status.jsonl', json_encode($status) . "\n", FILE_APPEND | LOCK_EX);

if (!$saved && !$mailed) {
    reply(500, ['ok' => false]);
}
reply(200, ['ok' => true, 'mailed' => $mailed, 'via' => $method]);
