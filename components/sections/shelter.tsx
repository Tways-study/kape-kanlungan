"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const pills = [
  "Free-flowing greenery",
  "Window bar seating",
  "Warm cove lighting",
  "Made with care",
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Shelter() {
  const shouldReduceMotion = useReducedMotion();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-20, 20]
  );

  return (
    <section
      id="shelter"
      aria-labelledby="shelter-heading"
      className="px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 md:gap-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="relative"
        >
          <div
            ref={imgWrapRef}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-24px_rgba(62,42,30,0.35)]"
          >
            <motion.div className="absolute -inset-6" style={{ y: parallaxY }}>
              <Image
                src="/images/shelter-main.jpg"
                alt="Cane-back stools along the window bar at Kapé Kanlungan, framed by hanging plants and sheer curtains"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="absolute -bottom-8 -right-4 w-36 rotate-[-7deg] overflow-hidden rounded-md border-4 border-cream-hi shadow-xl md:-right-8 md:w-44">
            <Image
              src="/images/shelter-accent.jpg"
              alt="A polaroid-style snapshot of the café's seating area"
              width={220}
              height={155}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ delay: 0.1 }}
        >
          <p className="eyebrow mb-4">Kanlungan — a shelter</p>
          <h2 id="shelter-heading" className="text-4xl text-bark md:text-5xl">
            More than coffee. A place to{" "}
            <em className="italic text-green-deep">stay awhile.</em>
          </h2>

          <div className="mt-6 space-y-4 font-body text-base text-ink/80">
            <p>
              Kanlungan means shelter — and that&apos;s exactly what this
              corner of Sibalom is built to be. Cane-backed stools, trailing
              vines, and a window bar looking out over the street invite you
              to slow down.
            </p>
            <p>
              Every detail, from the warm cove lighting to the quiet hum of
              the espresso machine, is made to hold you a little longer than
              you planned to stay.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {pills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-line bg-cream-hi px-4 py-2 font-body text-sm text-ink/80"
              >
                {pill}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
