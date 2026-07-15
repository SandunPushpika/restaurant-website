"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Lightbox } from "@/components/gallery/lightbox";
import { galleryCategories, galleryImages } from "@/constants/gallery";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    React.useState<(typeof galleryCategories)[number]["id"]>("all");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    null
  );

  const filteredImages: GalleryImage[] =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeCategory);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        <div
          role="tablist"
          aria-label="Gallery categories"
          className="flex flex-wrap justify-center gap-3"
        >
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={category.id === activeCategory}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedIndex(null);
              }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                category.id === activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filteredImages.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              variants={fadeUp}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View larger image: ${image.alt}`}
              className="group relative h-40 overflow-hidden rounded-xl sm:h-48 md:h-56"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {selectedIndex !== null ? (
        <Lightbox
          images={filteredImages}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onIndexChange={setSelectedIndex}
        />
      ) : null}
    </section>
  );
}
