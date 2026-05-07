import { motion } from "framer-motion";
import heroForest from "@/assets/hero-forest.jpg";
import { Petals } from "./Petals";

const stats = [
  { v: "29", l: "Acres" },
  { v: "100*", l: "Amenities" },
  { v: "25,000", l: "sqft Clubhouse" },
  { v: "Oct ’26", l: "Launch" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img
          src={heroForest}
          alt="Mavallipura forest at sunset"
          width={1920}
          height={1280}
          className="h-full w-full object-cover scale-105"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-black/60 via-emerald-black/40 to-emerald-black" />
      <div className="absolute inset-0 -z-10 vignette" />
      <div className="absolute inset-0 -z-10 grain opacity-[0.07]" />

      <Petals count={18} />


      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 flex items-center gap-3 rounded-full glass px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-gold-soft"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          North Bengaluru · Pre-Launch
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] text-mist"
        >
          A defined lifestyle,<br />
          <span className="italic text-gradient-gold">rooted in the forest.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-mist/70 md:text-lg"
        >
          A limited collection of premium villa plots in a nature-first  community —
          designed for the family that wants a home built on their terms, in Bengaluru&rsquo;s
          fastest-growing corridor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-emerald-black shadow-gold transition-all hover:scale-105"
          >
            Book a Site Visit
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-3 rounded-full border border-mist/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-mist transition-colors hover:bg-mist/5"
          >
            Discover Mavallipura
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl glass md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.l} className="px-6 py-6 text-center">
              <div className="font-display text-3xl text-mist md:text-4xl">{s.v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-mist/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
