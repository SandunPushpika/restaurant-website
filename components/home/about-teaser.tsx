"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

export function AboutTeaser() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="relative h-80 overflow-hidden rounded-2xl md:h-[28rem]"
      >
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop"
          alt="Chef plating a dish in the Ember & Oak kitchen"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="flex flex-col items-start gap-8">
        <SectionHeading
          align="left"
          eyebrow="Our Story"
          title="Where fire meets craft"
          subtitle="Founded on the belief that live-fire cooking and precise technique belong on the same plate, Ember & Oak brings modern European cuisine to Copenhagen's historic waterfront. Every dish begins with the hearth."
        />
        <Button asChild variant="primary" size="lg">
          <Link href="/about">Discover Our Story</Link>
        </Button>
      </div>
    </section>
  );
}
