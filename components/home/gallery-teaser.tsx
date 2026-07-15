"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { galleryPreviewImages } from "@/constants/home";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function GalleryTeaser() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16">
        <SectionHeading
          eyebrow="A Look Inside"
          title="The Room, The Craft, The Table"
          subtitle="A glimpse of the space, the dishes, and the moments that make an evening at Ember & Oak."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid w-full grid-cols-2 gap-4 md:grid-cols-3"
        >
          {galleryPreviewImages.map((image) => (
            <motion.div
              key={image.id}
              variants={fadeUp}
              className="relative h-48 overflow-hidden rounded-xl md:h-64"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        <Button asChild variant="gold-outline" size="lg">
          <Link href="/gallery">View Gallery</Link>
        </Button>
      </div>
    </section>
  );
}
