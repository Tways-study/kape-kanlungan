"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { MagneticLink } from "@/components/ui/magnetic-link";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const featuredDrinks = [
  { name: "Perfect Flat White", price: "₱115" },
  { name: "V60 with Cinnamon", price: "₱130" },
  { name: "Kanlungan Signature", price: "₱180" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [drinkIndex, setDrinkIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-20, 20]
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDrinkIndex((i) => (i + 1) % featuredDrinks.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  const drink = featuredDrinks[drinkIndex];

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="cove-glow relative overflow-hidden px-5 pt-32 pb-20 md:px-10 md:pt-44 md:pb-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-10"
      >
        <div>
          <motion.p variants={item} className="eyebrow mb-6 flex items-center gap-2">
            <span className="text-amber">●</span> Specialty Coffee · Sibalom, Antique
          </motion.p>

          <motion.h1
            variants={item}
            className="text-[clamp(3.2rem,3rem+4vw,6.6rem)] text-bark"
          >
            Your daily <em className="italic">shelter</em>
            <br />
            <span className="text-green-deep">in every sip.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[33ch] font-body text-lg text-ink/80"
          >
            A quiet refuge of wood, greenery, and slow afternoons — where
            every cup is brewed with care in the heart of Sibalom.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <MagneticLink>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-green-deep px-7 py-3.5 font-body text-sm font-medium text-cream-hi transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
              >
                Explore the menu <span aria-hidden>→</span>
              </a>
            </MagneticLink>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 rounded-full border border-bark/30 px-7 py-3.5 font-body text-sm font-medium text-bark transition-colors hover:bg-bark/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
            >
              Find us
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div
            ref={imgWrapRef}
            className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_30px_60px_-20px_rgba(62,42,30,0.35)]"
            style={{ borderRadius: "280px 280px 26px 26px" }}
          >
            <motion.div className="absolute -inset-6" style={{ y: parallaxY }}>
              <Image
                src="/images/hero-arch.jpg"
                alt="The lit arch niche inside Kapé Kanlungan, a warm nook with a framed latte-art photo"
                fill
                preload={true}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #000 0px, #000 1px, transparent 1px, transparent 14px)",
              }}
              aria-hidden
            />
          </div>

          <div
            className="absolute -bottom-6 left-6 overflow-hidden rounded-2xl border border-line bg-cream-hi/95 px-5 py-4 shadow-lg backdrop-blur-sm md:left-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            tabIndex={0}
            role="group"
            aria-label="Featured drink, rotates automatically — hover or focus to pause"
          >
            <p className="eyebrow mb-1 text-[0.62rem]">Featured</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={drinkIndex}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <p className="font-display text-base text-bark">{drink.name}</p>
                <p className="font-display text-lg text-clay">{drink.price}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
