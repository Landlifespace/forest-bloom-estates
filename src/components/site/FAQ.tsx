import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const faqs = [
  {
    q: "Is Mavallipura RERA registered?",
    a: "RERA registration is in process. All EOIs collected now are fully non-binding and refundable. We will not accept any booking amount before RERA registration. The RERA number will be displayed prominently on this site at launch.",
  },
  {
    q: "What is the current legal status of the land?",
    a: "Agricultural status with CLU permissible under BDA jurisdiction. Title opinion is 90% complete by Gobally Recognised Law Firm — one of India's leading real estate legal firms. All 13 survey numbers are under MOU, totalling 29 acres 0.25 guntas.",
  },
  {
    q: "When will I get possession of my plot?",
    a: "Possession is expected 24 months from RERA registration date. Realistic RERA registration: Octust 2026. Expected possession: mid-2028. This is a commitment, not an estimate.",
  },
  {
    q: "What sizes are the plots and what is the price?",
    a: "Plots range from approximately 600 sqft to 4,000+ sqft. Pre-launch indicative pricing is ₹6,500–8,500 per sqft. Final pricing and the exact plot matrix will be confirmed at RERA launch.",
  },
  {
    q: "Are the plots Vaastu compliant?",
    a: "Yes. All plot layouts are designed with Vaastu principles. Specific orientation preferences (north-facing, east-facing) can be discussed during plot selection.",
  },
  {
    q: "Is the 90-metre PRR Road confirmed?",
    a: "Yes — the PRR/BBC Road is a 74 km government-approved corridor with 2027 expected completion, passing directly near this site.",
  },
  {
    q: "Is this for self-use or investment?",
    a: "Both. Build your dream home at your own pace inside a premium  community with 100* amenities. North Bengaluru has delivered 35%+ five-year appreciation; Devanahalli showed 189% over five years.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="FAQ"
          align="center"
          title={
            <>
              Considered answers to{" "}
              <span className="italic text-gradient-gold">your considered questions.</span>
            </>
          }
        />

        <div className="mt-16 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl glass transition-colors ${
                  isOpen ? "border-gold/30" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
                >
                  <span className="font-display text-lg text-mist md:text-xl">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-mist/20 text-gold transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-7 pb-7 text-sm leading-relaxed text-mist/70">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
