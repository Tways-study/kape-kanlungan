"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";

type MenuItem = { name: string; price: string };
type Category = { number: string; title: string; sub: string; items: MenuItem[] };

const categories: Category[] = [
  {
    number: "01",
    title: "Coffee",
    sub: "Single-origin beans, brewed your way",
    items: [
      { name: "Perfect Flat White", price: "₱115" },
      { name: "V60 with Cinnamon", price: "₱130" },
      { name: "Kanlungan Signature", price: "₱180" },
      { name: "Espresso", price: "₱90" },
    ],
  },
  {
    number: "02",
    title: "Frappe & Cold",
    sub: "Blended cold, always sweet",
    items: [
      { name: "Strawberry Frappe", price: "₱155" },
      { name: "Matcha Blueberry Latte", price: "₱175" },
      { name: "Blueberry Latte", price: "₱175" },
      { name: "Oreo Frappe", price: "₱145" },
    ],
  },
  {
    number: "03",
    title: "Refresh & Eats",
    sub: "Lemonades, shakes, and native bites",
    items: [
      { name: "Summer Blue Lemonade", price: "₱120" },
      { name: "Strawberry Shake", price: "₱150" },
      { name: "Native Breakfast", price: "₱170" },
      { name: "Coffee & Suman", price: "₱140" },
    ],
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const TILT_DEGREES = 3;

function CategoryCard({
  cat,
  index,
  isInert,
}: {
  cat: Category;
  index: number;
  isInert: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isInert) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawRotateY.set((px - 0.5) * TILT_DEGREES * 2);
    rawRotateX.set(-(py - 0.5) * TILT_DEGREES * 2);
    ref.current?.style.setProperty("--mx", `${px * 100}%`);
    ref.current?.style.setProperty("--my", `${py * 100}%`);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 800,
        rotateX: isInert ? 0 : rotateX,
        rotateY: isInert ? 0 : rotateY,
      }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-cream p-8 transition-[border-color,box-shadow] duration-300 hover:border-green hover:shadow-[0_20px_40px_-24px_rgba(62,42,30,0.3)]"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
        aria-hidden
      />
      {!isInert && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--amber) 18%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
      )}
      <p className="font-display text-2xl text-green">{cat.number}</p>
      <h3 className="mt-2 font-display text-2xl text-bark">{cat.title}</h3>
      <p className="mt-1 font-body text-sm text-ink/65">{cat.sub}</p>

      <ul className="mt-6 space-y-3">
        {cat.items.map((it) => (
          <li
            key={it.name}
            className="group/row flex items-baseline gap-2 border-b border-dashed border-line pb-3 font-body text-sm text-ink transition-transform duration-200 last:border-none last:pb-0 hover:translate-x-1"
          >
            <span className="transition-colors duration-200 group-hover/row:text-bark">
              {it.name}
            </span>
            <span className="flex-1 border-b border-dotted border-line/0" />
            <span className="font-display text-base text-clay transition-colors duration-200 group-hover/row:text-clay/70">
              {it.price}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Menu() {
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();

  const isInert = Boolean(shouldReduceMotion) || isCoarsePointer;

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="border-y border-line bg-cream-hi px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="mb-16 max-w-xl"
        >
          <p className="eyebrow mb-4">The Menu</p>
          <h2 className="text-4xl text-bark md:text-5xl">
            Brewed slow, served warm.
          </h2>
          <p className="mt-4 font-body text-base text-ink/75">
            Single-origin beans and native breakfasts, made to order in the
            heart of Sibalom.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.number} cat={cat} index={i} isInert={isInert} />
          ))}
        </div>

        <p className="mt-10 font-body text-xs text-ink/45">
          Menu items and prices are subject to change — please confirm with
          the shop before ordering.
        </p>
      </div>
    </section>
  );
}
