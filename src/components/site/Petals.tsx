import { useMemo } from "react";

/** Floating bougainvillea petals drifting down */
export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 14 + Math.random() * 12,
        size: 6 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.45,
        rotate: Math.random() * 360,
        hue: Math.random() > 0.5 ? "var(--bougainvillea)" : "var(--bougainvillea-soft)",
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-10 animate-drift"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            background: p.hue,
            clipPath:
              "polygon(50% 0%, 80% 25%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 20% 25%)",
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}
