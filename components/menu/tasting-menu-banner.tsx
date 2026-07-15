"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/animations";

const tastingOptions = [
  {
    id: "five-course",
    name: "5-Course Tasting",
    price: "895 DKK",
    description: "Chef's selection across starters, mains, and dessert.",
  },
  {
    id: "seven-course",
    name: "7-Course Tasting",
    price: "1150 DKK",
    description: "The full journey, including two additional chef surprises.",
  },
  {
    id: "wine-pairing-addon",
    name: "Wine Pairing Add-On",
    price: "+ 650 DKK",
    description: "A glass built for every course, chosen by our sommelier.",
  },
];

export function TastingMenuBanner() {
  return (
    <section className="bg-primary px-6 py-16 text-primary-foreground">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3"
      >
        {tastingOptions.map((option) => (
          <motion.div
            key={option.id}
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-display text-2xl">{option.price}</span>
            <span className="text-sm font-medium uppercase tracking-wide text-accent">
              {option.name}
            </span>
            <p className="text-sm text-primary-foreground/80">
              {option.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
