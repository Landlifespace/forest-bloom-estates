import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const corridors = [
  { d: "10–12%", l: "Annual appreciation, North Bengaluru corridor" },
  { d: "189%", l: "5-year appreciation in North Bangalore" },
  { d: "4.5L+", l: "Professionals living within 25 km" },
  { d: "<5", l: "Large-format land parcels left in this corridor" },
];

const hubs = [
  { name: "PRR / Business Corridor ", dist: "Adjoining", t: "2027" },
  { name: "Amazon HQ", dist: "13 km", t: "Tech Hub" },
  { name: "Manyata Tech Park", dist: "16 km", t: "Tech Hub" },
  { name: "Air Force Station Yelahanka", dist: "22 km", t: "Defence" },
  { name: "BIAL Airport", dist: "25 km", t: "Operational" },
  { name: "KIADB Aerospace SEZ", dist: "30 km", t: "Aerospace" },
  { name: "Foxconn iPhone Campus", dist: "31 km", t: "Manufacturing" },
];

export function Location() {
  return (
    <section id="location" className="relative py-32 md:py-40">
      <div className="absolute inset-x-0 top-0 divider-leaf" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="The Location"
          title={
            <>
              Live where the city is growing.{" "}
              <span className="italic text-gradient-gold">Before everyone else gets here.</span>
            </>
          }
          intro="The 90-metre PRR Road will permanently change your commute — and your address. Buy at today's prices in tomorrow's neighbourhood."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {corridors.map((c, i) => (
            <motion.div
              key={c.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="font-display text-4xl text-gradient-gold">{c.d}</div>
              <div className="mt-3 text-xs leading-relaxed text-mist/60">{c.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-strong">
              <iframe
                title="Mavallipura location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1689.5886750488442!2d77.5361667!3d13.1261389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA3JzM0LjEiTiA3N8KwMzInMTAuMiJF!5e1!3m2!1sen!2sin!4v1778174619130!5m2!1sen!2sin"
                className="absolute inset-0 h-full w-full grayscale-[%] contrast-110"
                style={{
                  filter:
                    "invert(0.92) hue-rotate(180deg) saturate(0.) brightness(0.95) contrast(0.95)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-mist/10" />
              <div className="pointer-events-none absolute left-6 top-6 rounded-full glass px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                Mavallipura · Yelahanka
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl text-mist">Connectivity at a glance</h3>
            <p className="mt-2 text-sm text-mist/60">
              3.5–4.5 lakh+ professionals live, work, and grow within reach of this site.
            </p>
            <div className="mt-6 divide-y divide-mist/10 overflow-hidden rounded-2xl glass">
              {hubs.map((h) => (
                <div key={h.name} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <div className="text-sm text-mist">{h.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {h.t}
                    </div>
                  </div>
                  <div className="font-display text-lg text-gold-soft">{h.dist}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
