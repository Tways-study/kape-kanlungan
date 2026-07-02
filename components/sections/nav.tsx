"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticLink } from "@/components/ui/magnetic-link";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#shelter", label: "Our Shelter" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [focusedHref, setFocusedHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveHref(`#${topMost.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentHref = focusedHref ?? activeHref;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10"
      >
        <a
          href="#top"
          className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
        >
          <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-line md:h-10 md:w-10">
            <Image
              src="/images/logo-icon-circle.jpg"
              alt="Kapé Kanlungan logo"
              fill
              sizes="40px"
              className="object-cover"
              preload={true}
            />
          </span>
          <span className="font-display text-lg text-bark md:text-xl">
            Kapé Kanlungan
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = currentHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onFocus={() => setFocusedHref(link.href)}
                onBlur={() => setFocusedHref(null)}
                className="relative font-body text-sm text-ink transition-colors hover:text-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-green"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <MagneticLink>
          <Button
            render={<a href="#menu" />}
            nativeButton={false}
            className="!h-auto rounded-full !bg-bark px-5 py-2.5 font-body text-sm text-cream-hi hover:!bg-bark/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
          >
            Order Now
          </Button>
        </MagneticLink>
      </nav>
    </header>
  );
}
