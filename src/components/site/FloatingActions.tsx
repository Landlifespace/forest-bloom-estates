import { useEffect, useState } from "react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating column */}
      <div
        className={`fixed right-5 bottom-5 z-40 hidden flex-col gap-3 transition-all duration-500 md:flex ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <a
          href="https://wa.me/919591804455"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
          className="grid h-13 w-13 h-12 w-12 place-items-center rounded-full bg-bloom text-white shadow-glow transition-transform hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.59-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.881.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.881-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.982z"/></svg>
        </a>
        <a
          href="tel:+919591804455"
          aria-label="Call"
          className="grid h-12 w-12 place-items-center rounded-full bg-gold text-emerald-black shadow-gold transition-transform hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.58l2.2-2.21a1 1 0 00.25-1A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1 17 17 0 0017 17 1 1 0 001-1v-3.5a1 1 0 00-1-1z"/></svg>
        </a>
        <a
          href="#contact"
          aria-label="Site visit"
          className="grid h-12 w-12 place-items-center rounded-full glass-strong text-mist transition-transform hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
        </a>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-mist/10 glass-strong md:hidden">
        <a href="tel:+919591804455" className="py-3 text-center text-[11px] uppercase tracking-[0.2em] text-mist">Call</a>
        <a href="https://wa.me/919591804455" target="_blank" rel="noopener" className="py-3 text-center text-[11px] uppercase tracking-[0.2em] text-bougainvillea-soft">WhatsApp</a>
        <a href="#contact" className="bg-gold py-3 text-center text-[11px] uppercase tracking-[0.2em] text-emerald-black">Visit</a>
      </div>
    </>
  );
}
