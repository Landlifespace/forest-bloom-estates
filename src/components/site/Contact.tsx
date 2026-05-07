import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { SectionTitle } from "./SectionTitle";
import { Petals } from "./Petals";
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  email: z.string().trim().email("Please enter a valid email").max(120),
  budget: z.string().min(1, "Select a budget"),
  size: z.string().min(1, "Select a plot size"),
  message: z.string().trim().max(800).optional(),
});

const budgets = ["₹40L – ₹70L", "₹70L – ₹1 Cr", "₹1 – 1.5 Cr", "₹1.5 – 2.5 Cr", "₹2.5 Cr+"];
const sizes = ["600 – 1,000 sqft", "1,000 – 1,500 sqft", "1,500 – 2,400 sqft", "2,400 sqft+", "Show me all"];

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-black via-forest-deep/40 to-emerald-black" />
      <Petals count={10} />

  

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Book Your Site Visit"
          align="center"
          title={
            <>
              Don&rsquo;t wait for the price to rise.{" "}
              <span className="italic text-gradient-bloom">Walk the land first.</span>
            </>
          }
          intro="Tell us a little about you. Our team will personally call within 24 hours to schedule your visit and share the brochure on WhatsApp."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl glass-strong p-7 md:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-2xl text-gold">
                    ✦
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-mist">Thank you.</h3>
                  <p className="mt-3 text-sm text-mist/70">
                    Our team will call you within 24 hours to schedule your site visit.
                    The brochure and master plan are on their way to your WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Full name" error={errors.name} />
                    <Field name="phone" label="Phone number" type="tel" error={errors.phone} />
                  </div>
                  <Field name="email" label="Email" type="email" error={errors.email} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select name="budget" label="Budget range" options={budgets} error={errors.budget} />
                    <Select name="size" label="Preferred plot size" options={sizes} error={errors.size} />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.25em] text-mist/60">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={800}
                      className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                      placeholder="Anything you want us to know."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-emerald-black shadow-gold transition-transform hover:scale-[1.02]"
                  >
                    Book My Site Visit →
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact details + map */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl glass p-7">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                The Sales Lounge
              </div>
              <div className="mt-4 font-display text-2xl text-mist">
                Land &amp; Life Space Pvt Ltd
              </div>
              <div className="mt-2 text-sm text-mist/70">
                Mavallipura · <br />
                Yelahanka. North Bengaluru
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="tel:+919999999999"
                  className="rounded-xl border border-mist/15 px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:bg-gold hover:text-emerald-black hover:border-gold"
                >
                  Call Sales
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener"
                  className="rounded-xl bg-bloom px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-white"
                >
                  WhatsApp
                </a>
              </div>
              <div className="mt-5 space-y-2 text-sm text-mist/70">
                <div>📞 +91 95918 04455</div>
                <div>✉ sales@landlifespace.in</div>
                <div>🌐 www.landlifespace.in</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl glass">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Mavallipura,Bengaluru&output=embed"
                className="h-64 w-full"
                style={{
                  filter:
                    "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.95) contrast(0.95)",
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.25em] text-mist/60">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={120}
        className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
        placeholder={label}
      />
      {error && <div className="mt-1 text-xs text-bougainvillea">{error}</div>}
    </div>
  );
}

function Select({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.25em] text-mist/60">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-mist/15 bg-mist/[0.04] px-4 py-3 text-sm text-mist focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
      >
        <option value="" disabled className="bg-emerald-black">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-emerald-black">
            {o}
          </option>
        ))}
      </select>
      {error && <div className="mt-1 text-xs text-bougainvillea">{error}</div>}
    </div>
  );
}
