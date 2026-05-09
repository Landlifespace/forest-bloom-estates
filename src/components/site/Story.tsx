import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import natureImg from "@/assets/nature.jpg";

const principles = [
  {
    n: "01",
    t: "Biophilia as architecture",
    d: "4.5 Acre of the site is preserved as living green space. We plan the boulevard around the trees, not the other way around.",
  },
  {
    n: "02",
    t: "Sanctuary, not a complex",
    d: "Vaastu-aligned plots, layered canopies, and quiet, walkable corridors that feel like a private resort, every day.",
  },
  {
    n: "03",
    t: "Built without compromise",
    d: "Underground utilities, full-width boulevards, and a 25,000 sqft clubhouse — the infrastructure of a forever home.",
  },
];

export function Story() {
  return (
    <section id="story" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="The Project"
              title={
                <>
                  A signature plotted community at the heart of{" "}
                  <span className="italic text-gradient-bloom">North Bengaluru&rsquo;s</span> growth story.
                </>
              }
              intro="Through the Woods is a 29-acre  estate of premium villa plots — designed as a sanctuary, not a subdivision. A flagship clubhouse, layered green corridors, and a hundred quiet luxuries gathered behind one address."
            />

            <div className="mt-14 space-y-px overflow-hidden rounded-2xl glass">
              {principles.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex gap-6 p-7 transition-colors hover:bg-mist/[0.03]"
                >
                  <div className="font-display text-2xl text-gold/70">{p.n}</div>
                  <div>
                    <h3 className="font-display text-xl text-mist">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist/60">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
              <img
                src={natureImg}
                alt="Tropical forest pathway"
                width={1600}
                height={1100}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-display text-3xl text-mist">Builders of sanctuaries.</div>
                <p className="mt-2 text-sm text-mist/70">Not just homes.</p>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full glass-strong p-4 text-center md:flex md:flex-col md:items-center md:justify-center">
              <div className="font-display text-2xl text-gold">RERA</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-mist/60">In process</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
