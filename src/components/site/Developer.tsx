import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const stats = [
  { v: "30M", l: "sqft delivered across India" },
  { v: "₹1,300 Cr", l: "Top-line revenue (FY 2022)" },
  { v: "16 yrs", l: "Combined leadership experience" },
  { v: "0", l: "Defect delivery — a hard commitment" },
];

const promises = [
  {
    n: "I",
    t: "Biophilia as architecture",
    d: "4.5 Acre of the site is green. We plan around the trees, not against them.",
  },
  {
    n: "II",
    t: "Zero defect delivery",
    d: "Every road, every drain, every duct — inspected before handover. Always.",
  },
  {
    n: "III",
    t: "No hidden information",
    d: "RERA filing, approvals, statuses — disclosed upfront. No surprises at possession.",
  },
  {
    n: "IV",
    t: "Timelines are commitments",
    d: "We say 24 months. We mean 24 months. That's how we earn referrals.",
  },
];

const pedigree = ["Puravankara", "Godrej Properties", "TVS Emerald", "L&T Realty", "Shapoorji Pallonji"];

export function Developer() {
  return (
    <section id="developer" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="The Developer"
          title={
            <>
              Built by people who have done this before —{" "}
              <span className="italic text-gradient-gold">at scale.</span>
            </>
          }
          intro="Land & Life Space is a young company with the track record of an established one. Every senior team member has delivered premium real estate at India's best developers — and left to build something with their name on it."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-7"
            >
              <div className="font-display text-4xl text-gradient-gold">{s.v}</div>
              <div className="mt-3 text-xs leading-relaxed text-mist/60">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {promises.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group flex gap-6 rounded-2xl glass p-7 transition-all hover:border-gold/30"
            >
              <div className="font-display text-3xl text-gold/60">{p.n}</div>
              <div>
                <h3 className="font-display text-xl text-mist">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/60">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl glass p-8 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
            Leadership pedigree
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {pedigree.map((p) => (
              <span key={p} className="font-display text-lg text-mist/70 hover:text-mist">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Legal partner — Gobally Recognised Law Firm
          </div>
        </div>
      </div>
    </section>
  );
}
