const items = [
  "V60 with Cinnamon",
  "Native Breakfast",
  "Matcha Blueberry Latte",
  "Fruit Shakes",
  "Signature Kanlungan Blends",
];

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-line bg-cream py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center">
            {items.map((label, i) => (
              <span
                key={`${rep}-${i}`}
                className="flex items-center gap-6 px-6 font-display text-sm italic text-ink/60"
              >
                {label}
                <span className="text-amber/70 not-italic" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
