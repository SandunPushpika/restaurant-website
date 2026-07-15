"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { fadeUp } from "@/lib/animations";

export function StorySection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16">
      <div className="order-2 flex flex-col items-start gap-6 md:order-1">
        <SectionHeading
          align="left"
          eyebrow="Since 2018"
          title="A hearth on Nyhavn Kaj"
        />
        <p className="text-muted-foreground">
          Ember & Oak began as a single wood-fired grill on the Copenhagen
          waterfront and a simple conviction: that the oldest way of cooking —
          over open flame — still has the most to say to a modern plate. What
          started as a supper club for friends became a dining room, then a
          kitchen built entirely around the hearth.
        </p>
        <p className="text-muted-foreground">
          Today, our kitchen team sources from foragers, small growers, and
          day-boat fishermen across Zealand. The menu is rewritten weekly,
          shaped by what arrives at the back door rather than a fixed recipe
          book — modern European technique in service of ingredients at their
          peak.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="relative order-1 h-80 overflow-hidden rounded-2xl md:order-2 md:h-[28rem]"
      >
        <Image
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1400&auto=format&fit=crop"
          alt="The open hearth at the heart of the Ember & Oak kitchen"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
