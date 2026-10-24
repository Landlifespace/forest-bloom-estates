import { useId, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Petals } from "./Petals";
import { EMAIL, ENQUIRY_ENDPOINT, PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from "@/lib/site";

const budgets = ["₹40L – ₹70L", "₹70L – ₹1 Cr", "₹1 – 1.5 Cr", "₹1.5 – 2.5 Cr", "₹2.5 Cr+"];
const sizes = [
  "1,200 – 1,800 sqft",
  "1,800 – 2,400 sqft",
  "2,400 – 3,200 sqft",
  "3,200 sqft+",
  "Show me all",
];

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "sent" | "failed";

const normalisePhone = (v: string) => v.replace(/[\s\-()]/g, "").replace(/^(\+?91|0)/, "");

function validate(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (d.name.length < 2 || d.name.length > 80) e.name = "Please enter your full name";
  if (!/^[6-9]\d{9}$/.test(normalisePhone(d.phone)))
    e.phone = "Enter a valid 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || d.email.length > 120)
    e.email = "Please enter a valid email";
  if (!d.budget) e.budget = "Select a budget";
  if (!d.size) e.size = "Select a plot size";
  return e;
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const d: Record<string, string> = {};
    fd.forEach((v, k) => (d[k] = String(v).trim()));
    const errs = validate(d);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, phone: normalisePhone(d.phone) }),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-black via-forest-deep/40 to-emerald-black" />
      <Petals count={10} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Book Your Site Visit"
          align="center"
          title={
            <>
              Don&rsquo;t wait for the price to rise.{" "}
              <span className="italic text-gradient-bloom">Walk the land first.</span>
            </>
          }
          intro="Tell us a little about you. Our team will personally call within 24 hours to schedule your visit and share the project details on WhatsApp."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl glass-strong p-7 md:p-10">
              {status === "sent" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-2xl text-gold">
                    ✦
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-mist">Thank you.</h3>
                  <p className="mt-3 text-sm text-mist/70">
                    Your enquiry has reached our team. We will call you within 24 hours to schedule
                    your site visit and share the project details on WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5" noValidate>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Full name" error={errors.name} />
                    <Field name="phone" label="Phone number" type="tel" error={errors.phone} />
                  </div>
                  <Field name="email" label="Email" type="email" error={errors.email} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      name="budget"
                      label="Budget range"
                      options={budgets}
                      error={errors.budget}
                    />
                    <Select
                      name="size"
                      label="Preferred plot size"
                      options={sizes}
                      error={errors.size}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="enq-message"
                      className="text-[11px] uppercase tracking-[0.25em] text-mist/60"
                    >
                      Message (optional)
                    </label>
                    <textarea
                      id="enq-message"
                      name="message"
                      rows={3}
                      maxLength={800}
                      className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                      placeholder="Anything you want us to know."
                    />
                  </div>
                  {status === "failed" && (
                    <div
                      role="alert"
                      className="rounded-xl border border-bougainvillea/40 px-4 py-3 text-sm text-bougainvillea"
                    >
                      We could not send your enquiry. Please call {PHONE_DISPLAY} or message us on
                      WhatsApp and we will take it from there.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-emerald-black shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Book My Site Visit →"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact details + map */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl glass p-7">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                The Sales Lounge
              </div>
              <div className="mt-4 font-display text-2xl text-mist">
                Land &amp; Life Space Pvt Ltd
              </div>
              <div className="mt-2 text-sm text-mist/70">
                Mavallipura · <br />
                Yelahanka. North Bengaluru
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={TEL_URL}
                  className="rounded-xl border border-mist/15 px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:bg-gold hover:text-emerald-black hover:border-gold"
                >
                  Call Sales
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                  className="rounded-xl bg-bloom px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-white"
                >
                  WhatsApp
                </a>
              </div>
              <div className="mt-5 space-y-2 text-sm text-mist/70">
                <div>
                  <span aria-hidden="true">📞</span> {PHONE_DISPLAY}
                </div>
                <div>
                  <span aria-hidden="true">✉</span>{" "}
                  <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">
                    {EMAIL}
                  </a>
                </div>
                <a
                  href="https://www.landlifespace.in"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-gold transition-colors"
                >
                  <span aria-hidden="true">🌐</span> www.landlifespace.in
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl glass">
              <iframe
                title="Map showing the Through the Woods site at Mavallipura, Yelahanka"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1481.7915615157926!2d77.53548348151841!3d13.126222070956635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA3JzM0LjEiTiA3N8KwMzInMTAuMiJF!5e1!3m2!1sen!2sin!4v1778223602920!5m2!1sen!2sin"
                className="h-64 w-full"
                style={{}}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.25em] text-mist/60">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        autoComplete={type === "tel" ? "tel" : type === "email" ? "email" : "name"}
        inputMode={type === "tel" ? "numeric" : undefined}
        type={type}
        maxLength={type === "tel" ? 20 : 120}
        className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
        placeholder={label}
      />
      {error && (
        <div id={`${id}-err`} role="alert" className="mt-1 text-xs text-bougainvillea">
          {error}
        </div>
      )}
    </div>
  );
}

function Select({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.25em] text-mist/60">
        {label}
      </label>
      <select
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
      >
        <option value="" disabled className="bg-emerald-black">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-emerald-black">
            {o}
          </option>
        ))}
      </select>
      {error && (
        <div id={`${id}-err`} role="alert" className="mt-1 text-xs text-bougainvillea">
          {error}
        </div>
      )}
    </div>
  );
}
