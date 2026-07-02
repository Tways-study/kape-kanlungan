"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";

const STRENGTH = 0.35;
const MAX_OFFSET = 8;

export function MagneticLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const isInert = shouldReduceMotion || isCoarsePointer;

  function handleMouseMove(e: React.MouseEvent) {
    if (isInert) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * STRENGTH)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * STRENGTH)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isInert ? undefined : { x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
