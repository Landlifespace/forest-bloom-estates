import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import masterplan from "@/assets/masterplan.jpg";

const features = [
  "Biophilic spine boulevard",
  "Perimeter road — every plot has frontage",
  "Iconic gate plaza",
  "Green corridors between clusters",
  "Statutory 10% park, 5% common",
  "Vaastu-aligned plot orientation",
];

export function MasterPlan() {
  return (
    <section id="masterplan" className="relative py-16 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Master Plan"
          align="center"
          title={
            <>
              Every plot has a story.{" "}
              <span className="italic text-gradient-gold">Find yours.</span>
            </>
          }
          intro="29 contiguous acres in BDA jurisdiction. A flagship clubhouse at the centre, a perimeter of full-width boulevards, and quiet plot clusters webbed by green corridors."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
          className="mt-12 md:mt-16 overflow-hidden rounded-3xl shadow-soft"
        >
          <div className="relative">
            <img
              src={masterplan}
              alt="Mavallipura master plan aerial"
              loading="lazy"
              width={1600}
              height={1100}
              className="w-full object-cover min-h-[280px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
              <div className="grid items-end gap-3 md:gap-8 md:grid-cols-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                    Total land
                  </div>
                  <div className="font-display text-[clamp(2rem,9vw,2.25rem)] text-mist">29 acres</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                    Approving authority
                  </div>
                  <div className="font-display text-lg md:text-2xl text-mist">BDA · GBA North</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                    Plot range
                  </div>
                  <div className="font-display text-lg md:text-2xl text-mist">600 – 4,000+ sqft</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-xl glass px-5 py-4">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-xs text-gold">
                ✓
              </span>
              <span className="text-sm text-mist/80">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
