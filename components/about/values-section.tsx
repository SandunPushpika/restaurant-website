"use client";

import { Flame, Heart, Leaf, Wine, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { values } from "@/constants/about";
import { fadeUp, staggerContainer } from "@/lib/animations";

const valueIcons: Record<string, LucideIcon> = {
  flame: Flame,
  leaf: Leaf,
  wine: Wine,
  "heart-handshake": Heart,
};

export function ValuesSection() {
  return (
    <section className="bg-muted px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16">
        <SectionHeading
          eyebrow="What We Believe"
          title="Our Philosophy"
          subtitle="Four ideas guide every decision in the kitchen and the dining room."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = valueIcons[value.icon];
            return (
              <motion.div
                key={value.id}
                variants={fadeUp}
                className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center text-card-foreground shadow-sm"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
