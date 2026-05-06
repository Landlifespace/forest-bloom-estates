import { motion } from "framer-motion";
import bougainvillea from "@/assets/bougainvillea.jpg";

const promises = [
  { v: "20%+", l: "Open green / canopy area" },
  { v: "1,000+", l: "Native trees planted" },
  { v: "100%", l: "Wastewater recycled on-site" },
  { v: "0", l: "Compromises on the forest" },
];

export function Nature() {
  return (
    <section id="nature" className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 -z-10">
        <img
          src={bougainvillea}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-black via-emerald-black/85 to-emerald-black/40" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft/80">
            <span className="h-px w-8 bg-gold/50" />
            Nature & Sustainability
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-mist">
            We don't add trees as decoration.{" "}
            <span className="italic text-gradient-bloom">
              We plan the homes around them.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/70">
            A community is only as alive as the land it sits on. Mavallipura preserves and
            extends a layered forest canopy with bougainvillea-laced corridors, biophilic
            zones, organic composting, and on-site water recycling — so the address grows
            richer with every season.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl glass">
            {promises.map((p) => (
              <div key={p.l} className="px-6 py-6">
                <div className="font-display text-3xl text-gradient-gold">{p.v}</div>
                <div className="mt-2 text-xs leading-relaxed text-mist/60">{p.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative ml-auto max-w-md rounded-3xl glass-strong p-8">
            <blockquote className="font-display text-2xl leading-snug text-mist">
              &ldquo;A home should be a sanctuary,
              <span className="italic text-gradient-bloom"> not a source of stress.</span>&rdquo;
            </blockquote>
            <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
              Land &amp; Life Space — Philosophy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
