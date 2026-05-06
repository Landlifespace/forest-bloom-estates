import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#story", label: "Story" },
  { href: "#location", label: "Location" },
  { href: "#amenities", label: "Amenities" },
  { href: "#nature", label: "Nature" },
  { href: "#masterplan", label: "Master Plan" },
  { href: "#pricing", label: "Plots" },
  { href: "#developer", label: "Developer" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          scrolled ? "glass-strong rounded-full mx-4 lg:mx-10 py-3" : ""
        }`}
      >
        <a href="#top" className="flex items-center gap-3 group">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition-transform group-hover:rotate-12">
            <LogoMark />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide text-mist">Mavallipura</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Land &amp; Life Space
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[13px] uppercase tracking-[0.2em] text-mist/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-black shadow-gold transition-transform hover:scale-105 md:inline-flex"
          >
            Book Site Visit
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
          >
            <span className="block h-px w-5 bg-mist before:block before:h-px before:w-5 before:-translate-y-1.5 before:bg-mist after:block after:h-px after:w-5 after:translate-y-1 after:bg-mist" />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mx-4 mt-3 glass-strong rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-mist/80 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-emerald-black"
            >
              Book Site Visit
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c2 4 6 6 10 6-2 6-6 10-10 14-4-4-8-8-10-14 4 0 8-2 10-6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}
