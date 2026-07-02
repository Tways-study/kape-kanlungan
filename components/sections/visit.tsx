"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, AtSign, ArrowRight } from "lucide-react";
import { MagneticLink } from "@/components/ui/magnetic-link";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=Kap%C3%A9+Kanlungan+Sibalom+Antique";

export function Visit() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="relative overflow-hidden bg-green-deep px-5 py-24 text-cream-hi md:px-10 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #fff 0px, #fff 1px, transparent 1px, transparent 34px)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
        >
          <p className="eyebrow mb-4 !text-amber-soft">Visit</p>
          <h2 id="visit-heading" className="text-4xl md:text-5xl">
            Find your <em className="italic">shelter</em> in Sibalom.
          </h2>

          <ul className="mt-8 space-y-4 font-body text-base">
            <li className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-amber-soft" aria-hidden />
              <span>District 1, Sibalom, Antique, 5713</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-amber-soft" aria-hidden />
              <a
                href="tel:+639171139844"
                className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-soft"
              >
                0917 113 9844
              </a>
            </li>
            <li className="flex items-center gap-3">
              <AtSign className="size-5 shrink-0 text-amber-soft" aria-hidden />
              <span>@kapekanlungan</span>
            </li>
          </ul>

          <MagneticLink className="mt-9">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 font-body text-sm font-medium text-bark transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-soft"
            >
              Get directions <ArrowRight className="size-4" aria-hidden />
            </a>
          </MagneticLink>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-cream-hi/15 bg-cream-hi/10 p-10 text-center backdrop-blur-sm md:p-12"
        >
          <p className="eyebrow mb-3 !text-amber-soft">Open daily</p>
          <p className="font-display text-3xl font-semibold text-amber-soft md:text-4xl">
            8:00 AM — 10:00 PM
          </p>
          <p className="mt-4 font-body text-sm text-cream-hi/75">
            Swing by any time — the coffee&apos;s always warm and
            there&apos;s always a seat by the window.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
