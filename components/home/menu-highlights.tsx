"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/shared/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { featuredDishes } from "@/constants/home";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function MenuHighlights() {
  return (
    <section className="bg-muted px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16">
        <SectionHeading
          eyebrow="From the Kitchen"
          title="Signature Dishes"
          subtitle="A glimpse of our chef's seasonal tasting menu, rooted in Nordic ingredients and open-fire technique."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid w-full gap-8 md:grid-cols-3"
        >
          {featuredDishes.map((dish) => (
            <motion.article
              key={dish.id}
              variants={fadeUp}
              className="flex flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                {dish.badge ? (
                  <Badge
                    variant={dish.badge}
                    className="absolute left-4 top-4"
                  >
                    {dish.badge.replace("-", " ")}
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-foreground">
                    {dish.name}
                  </h3>
                  <span className="whitespace-nowrap font-display text-lg text-accent">
                    {dish.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dish.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Button asChild variant="gold-outline" size="lg">
          <Link href="/menu">View Full Menu</Link>
        </Button>
      </div>
    </section>
  );
}
