"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/shared/badge";
import { menuCategories } from "@/constants/menu";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function MenuTabs() {
  const [activeId, setActiveId] = React.useState(menuCategories[0].id);
  const activeCategory =
    menuCategories.find((category) => category.id === activeId) ??
    menuCategories[0];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex flex-wrap justify-center gap-3"
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={category.id === activeId}
              onClick={() => setActiveId(category.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                category.id === activeId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="flex w-full flex-col gap-8"
          >
            {activeCategory.description ? (
              <p className="text-center text-muted-foreground">
                {activeCategory.description}
              </p>
            ) : null}

            <div className="grid gap-8 md:grid-cols-2">
              {activeCategory.items.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  className="flex gap-4 overflow-hidden rounded-2xl bg-card p-4 text-card-foreground shadow-sm"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="6rem"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg text-foreground">
                        {item.name}
                      </h3>
                      <span className="whitespace-nowrap font-display text-base text-accent">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    {item.badge ? (
                      <Badge variant={item.badge} className="w-fit">
                        {item.badge.replace("-", " ")}
                      </Badge>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
