import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import clubhouse from "@/assets/clubhouse.jpg";

const featured = [
  { t: "25,000 sqft Flagship Clubhouse", d: "The civic heart of the community." },
  { t: "Swimming Pool", d: "Plus a dedicated kids pool, set in tropical landscaping." },
  { t: "Ayurveda Wellness Spa", d: "A retreat for residents with Ayurveda, Unani, Chinese medicine." },
  { t: "24/7 Medical Clinic", d: "An OPD on-site, because care should never wait." },
  { t: "Pre-school & Daycare", d: "Inside the gates — your morning runs short." },
  { t: "1,000+ Trees, 4.5 Acre Greens", d: "Living infrastructure, planned before the roads." },
];

const groups = [
  { c: "Wellness & Health", n: 9, items: ["Spa", "Yoga & meditation", "Gym", "Physiotherapy", "Counseling"] },
  { c: "Sports & Recreation", n: 10, items: ["Tennis", "Cricket", "Badminton", "Squash", "Basketball"] },
  { c: "Smart & Sustainable", n: 15, items: ["Solar power", "Wi-Fi 6 mesh", "Rainwater harvesting", "Composting", "EV stations ×50+"] },
  { c: "Culture & Community", n: 8, items: ["Amphitheater", "Library", "Artist residence", "Cinema", "Co-housing pods"] },
  { c: "Education & Work", n: 7, items: ["Co-working hub", "Innovation lab", "Skill training", "Daycare", "Boardroom"] },
  { c: "Retail & Services", n: 8, items: ["High-street shops", "Supermarket", "Pharmacy", "Salon", "Café"] },
];

export function Amenities() {
  return (
    <section id="amenities" className="relative py-32 md:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-black via-forest-deep/30 to-emerald-black" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="100* Amenities"
              title={
                <>
                  Because you deserve more than a plot.{" "}
                  <span className="italic text-gradient-bloom">A whole life.</span>
                </>
              }
              intro="Most plotted developments give you land and a wall. Mavallipura gives you a lifestyle — your gym, your spa, your weekend, all within walking distance of your front door."
            />
          </div>
          <div className="lg:col-span-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold-soft">
                Competitive context
              </div>
              <div className="mt-3 font-display text-2xl text-mist">
                100* amenities <span className="text-mist/40">vs.</span>{" "}
                <span className="text-mist/60">40–50</span> at the corridor average.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-3xl shadow-soft lg:col-span-7"
          >
            <img
              src={clubhouse}
              alt="Tropical luxury clubhouse"
              loading="lazy"
              width={1600}
              height={1100}
              className="aspect-[16/11] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-black via-emerald-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold">Flagship Clubhouse</div>
              <div className="mt-2 font-display text-3xl text-mist md:text-4xl">
                25,000 sqft of resort, just steps from your plot.
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:col-span-5">
            {featured.slice(0, 3).map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                    ✦
                  </span>
                  <div>
                    <div className="font-display text-lg text-mist">{f.t}</div>
                    <div className="mt-1 text-sm text-mist/60">{f.d}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-gold/30"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl text-mist">{g.c}</h3>
                <span className="text-xs text-gold">{g.n}+</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-mist/60">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-gold/40" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
