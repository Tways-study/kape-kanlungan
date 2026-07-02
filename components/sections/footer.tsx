import Image from "next/image";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "#menu", label: "Menu" },
      { href: "#shelter", label: "Our Shelter" },
      { href: "#visit", label: "Visit" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://instagram.com/kapekanlungan", label: "@kapekanlungan" },
      { href: "tel:+639171139844", label: "0917 113 9844" },
    ],
  },
  {
    title: "Hours",
    links: [{ href: "#visit", label: "Open daily · 8AM – 10PM" }],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bark px-5 py-16 text-cream-hi md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 opacity-[0.16] mix-blend-multiply md:h-96 md:w-96"
      >
        <Image src="/images/logo-full.jpg" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-1 ring-cream-hi/20">
                <Image
                  src="/images/logo-icon-circle.jpg"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-xl">Kapé Kanlungan</span>
            </div>
            <p className="mt-4 max-w-[28ch] font-body text-sm italic text-cream-hi/70">
              Your daily shelter in every sip.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 !text-amber-soft">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-cream-hi/80 transition-colors hover:text-amber-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-cream-hi/10 pt-6 font-body text-xs text-cream-hi/50">
          © 2026 Kapé Kanlungan · Sibalom, Antique · 5713
        </div>
      </div>
    </footer>
  );
}
