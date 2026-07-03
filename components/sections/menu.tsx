"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MenuItem = {
  name: string;
  price: string;
  image?: string;
  imagePosition?: string;
};
type Category = { number: string; title: string; sub: string; items: MenuItem[] };

const categories: Category[] = [
  {
    number: "01",
    title: "Coffee",
    sub: "Single-origin beans, brewed your way",
    items: [
      {
        name: "Perfect Flat White",
        price: "₱115",
        image: "/images/menu/flat-white.jpg",
        imagePosition: "80% 55%",
      },
      {
        name: "V60 with Cinnamon",
        price: "₱130",
        image: "/images/menu/v60-cinnamon.jpg",
        imagePosition: "65% 60%",
      },
      { name: "Kanlungan Signature", price: "₱180" },
      { name: "Espresso", price: "₱90" },
    ],
  },
  {
    number: "02",
    title: "Frappe & Cold",
    sub: "Blended cold, always sweet",
    items: [
      {
        name: "Strawberry Frappe",
        price: "₱155",
        image: "/images/menu/strawberry-frappe.jpg",
        imagePosition: "70% 55%",
      },
      {
        name: "Matcha Blueberry Latte",
        price: "₱175",
        image: "/images/menu/matcha-blueberry-latte.jpg",
        imagePosition: "60% 60%",
      },
      {
        name: "Blueberry Latte",
        price: "₱175",
        image: "/images/menu/blueberry-latte.jpg",
        imagePosition: "50% 65%",
      },
      { name: "Oreo Frappe", price: "₱145" },
    ],
  },
  {
    number: "03",
    title: "Refresh & Eats",
    sub: "Lemonades, shakes, and native bites",
    items: [
      {
        name: "Summer Blue Lemonade",
        price: "₱120",
        image: "/images/menu/summer-blue-lemonade.jpg",
        imagePosition: "50% 60%",
      },
      { name: "Strawberry Shake", price: "₱150" },
      { name: "Native Breakfast", price: "₱170" },
      { name: "Coffee & Suman", price: "₱140" },
    ],
  },
];

const featured = categories.flatMap((cat) => cat.items.filter((item) => item.image));

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Menu() {
  const shouldReduceMotion = useReducedMotion();
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    []
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveSlide(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

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
          <h2 id="menu-heading" className="text-4xl text-bark md:text-5xl">
            Brewed slow, served warm.
          </h2>
          <p className="mt-4 font-body text-base text-ink/75">
            Single-origin beans and native breakfasts, made to order in the
            heart of Sibalom.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="mb-20"
        >
          <p className="eyebrow mb-6">Featured Drinks</p>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={shouldReduceMotion ? [] : [autoplayPlugin]}
            setApi={setCarouselApi}
            className="sm:px-12"
          >
            <CarouselContent>
              {featured.map((item, index) => (
                <CarouselItem
                  key={item.name}
                  className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    data-active={index === activeSlide ? "" : undefined}
                    className="overflow-hidden rounded-2xl border border-line bg-cream py-0 shadow-[0_20px_40px_-24px_rgba(62,42,30,0.3)] scale-[0.94] opacity-70 transition-[transform,box-shadow,opacity] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(62,42,30,0.35)] data-active:scale-100 data-active:opacity-100"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={item.image!}
                        alt={`${item.name} at Kapé Kanlungan`}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                        style={{ objectPosition: item.imagePosition ?? "center" }}
                      />
                    </div>
                    <CardContent className="flex items-baseline justify-between gap-3 px-5 py-4">
                      <span className="font-display text-lg text-bark">
                        {item.name}
                      </span>
                      <span className="font-display text-lg text-clay">
                        {item.price}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
        >
          <Tabs defaultValue={categories[0].title}>
            <TabsList className="mb-8 h-auto flex-wrap gap-2 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.title}
                  value={cat.title}
                  className="h-auto flex-none rounded-full border border-line bg-transparent px-4 py-2 text-sm font-body text-ink/70 data-active:border-green data-active:bg-cream data-active:text-bark data-active:shadow-none"
                >
                  {cat.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.title} value={cat.title}>
                <p className="mb-6 font-body text-sm text-ink/65">{cat.sub}</p>
                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-2 border-b border-dashed border-line pb-3 font-body text-sm text-ink"
                    >
                      <span>{item.name}</span>
                      <span className="flex-1 border-b border-dotted border-line/0" />
                      <span className="font-display text-base text-clay">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <p className="mt-10 font-body text-xs text-ink/45">
          Menu items and prices are subject to change — please confirm with
          the shop before ordering.
        </p>
      </div>
    </section>
  );
}
