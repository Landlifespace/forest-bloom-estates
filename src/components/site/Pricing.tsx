import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const tiers = [
  {
    name: "Studio",
    size: "600 – 1,000 sqft",
    psf: "₹6,500 / sqft",
    total: "₹39 L – ₹65 L",
    blurb: "An entry into a premium estate without compromise.",
  },
  {
    name: "Classic",
    size: "1,000 – 1,500 sqft",
    psf: "₹6,500 – 7,000",
    total: "₹65 L – ₹1.05 Cr",
    blurb: "The most-loved size. Room for a generous family home.",
    featured: true,
  },
  {
    name: "Premium",
    size: "1,500 – 2,400 sqft",
    psf: "₹7,000 – 7,500",
    total: "₹1.05 – 1.8 Cr",
    blurb: "Lifestyle plots with extra setback, more daylight.",
  },
  {
    name: "Signature",
    size: "2,400 – 4,000+ sqft",
    psf: "₹7,500 – 8,500",
    total: "₹1.8 – 3.4 Cr+",
    blurb: "The estate's largest, most private plots.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Plot Pricing"
          title={
            <>
              Find the plot that fits{" "}
              <span className="italic text-gradient-bloom">your dream home.</span>
            </>
          }
          intro="Pre-launch indicative pricing — buyers who register interest now receive priority pricing notification before public launch. Final pricing confirmed at RERA registration."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1 ${
                t.featured
                  ? "glass-strong shadow-glow ring-1 ring-bougainvillea/40"
                  : "glass hover:ring-1 hover:ring-gold/30"
              }`}
            >
              {t.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-bloom px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                  Most chosen
                </div>
              )}
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">{t.name}</div>
              <div className="mt-3 font-display text-2xl text-mist">{t.size}</div>
              <div className="mt-1 text-sm text-mist/60">{t.blurb}</div>
              <div className="mt-8 border-t border-mist/10 pt-5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Per sqft
                </div>
                <div className="font-display text-xl text-mist">{t.psf}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  All-in
                </div>
                <div className="font-display text-2xl text-gradient-gold">{t.total}</div>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-mist/20 px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:bg-gold hover:text-emerald-black hover:border-gold"
              >
                Reserve interest →
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl glass p-6">
            <h3 className="font-display text-xl text-mist">What is included</h3>
            <ul className="mt-4 space-y-2 text-sm text-mist/70">
              <li>— Registered title to your plot</li>
              <li>— Fully developed roads, lit boulevards</li>
              <li>— Underground utilities, drainage</li>
              <li>— Perimeter wall &amp; gated security</li>
              <li>— BDA-approved layout, clear title</li>
            </ul>
          </div>
          <div className="rounded-2xl glass p-6">
            <h3 className="font-display text-xl text-mist">What is separate</h3>
            <ul className="mt-4 space-y-2 text-sm text-mist/70">
              <li>— Your home construction (your design, your pace)</li>
              <li>— Annual clubhouse membership (TBC)</li>
              <li>— Monthly maintenance (TBC)</li>
              <li>— Stamp duty &amp; registration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
