const cols = [
  {
    h: "Project",
    items: [
      { t: "The Story", href: "#story" },
      { t: "Location", href: "#location" },
      { t: "Amenities", href: "#amenities" },
      { t: "Master Plan", href: "#masterplan" },
      { t: "Plot Pricing", href: "#pricing" },
    ],
  },
  {
    h: "Company",
    items: [
      { t: "About Land & Life Space", href: "#developer" },
      { t: "Philosophy", href: "#nature" },
      { t: "FAQ", href: "#faq" },
      { t: "RERA & Approvals", href: "#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-mist/10 pt-20 pb-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-black to-[oklch(0.10_0.02_160)]" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2c2 4 6 6 10 6-2 6-6 10-10 14-4-4-8-8-10-14 4 0 8-2 10-6z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="11" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <div>
                <div className="font-display text-2xl text-mist">Mavallipura</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  By Land &amp; Life Space
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mist/60">
              A signature plotted community at the heart of North Bengaluru&rsquo;s growth
              corridor. 28 acres. 100* amenities. One address that only gets better.
            </p>

            <div className="mt-8 space-y-2 text-sm text-mist/70">
              <div>Mavallipura, , Yelahanka. Bengaluru</div>
              <div>+91 95918 04455 · sales@landlifespace.in</div>
              <div>www.landlifespace.in</div>
            </div>

            <div className="mt-6 flex gap-3">
              {["IG", "Fb", "Yt", "Li"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-xs uppercase tracking-widest text-mist/70 transition-colors hover:bg-gold hover:text-emerald-black"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h} className="lg:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">{c.h}</div>
              <ul className="mt-5 space-y-3">
                {c.items.map((it) => (
                  <li key={it.t}>
                    <a
                      href={it.href}
                      className="text-sm text-mist/70 transition-colors hover:text-gold"
                    >
                      {it.t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
              Resources
            </div>
            <div className="mt-5 space-y-3">
              <a
                href="#contact"
                className="block rounded-full bg-gold px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-emerald-black shadow-gold transition-transform hover:scale-[1.02]"
              >
                Book a Site Visit
              </a>
              <a
                href="#contact"
                className="block rounded-full border border-mist/20 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:bg-mist/5"
              >
                Download Brochure
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener"
                className="block rounded-full bg-bloom px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-white"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="my-12 divider-leaf" />

        <div className="flex flex-col gap-4 text-xs text-mist/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Land &amp; Life Space Pvt Ltd. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <span>RERA registration in process</span>
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Disclaimer</a>
          </div>
        </div>

        <div className="mt-8 max-w-4xl text-[10px] leading-relaxed text-mist/30">
          Disclaimer: Pricing, plot sizes, amenity counts, and timelines indicated are pre-launch
          and indicative. Final terms will be confirmed at RERA registration. Images and renders
          are artistic representations. We do not accept booking amounts before RERA registration.
        </div>
      </div>
    </footer>
  );
}
