"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
        alt="The dining room at Ember & Oak, softly lit with warm hearth light"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/50 to-[#1a1a1a]/85" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-[0.3em] text-accent"
        >
          {siteConfig.tagline}
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="font-display text-hero max-w-4xl text-[#F8F4ED]"
        >
          {siteConfig.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-lg text-[#F8F4ED]/85"
        >
          Chef-driven seasonal tasting menus and curated wine pairings, in a
          warm, hearth-lit setting on Nyhavn Kaj.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-4 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
          <Button asChild variant="gold-outline" size="lg">
            <Link href="/menu">View Menu</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#F8F4ED]/80"
      >
        <ChevronDown className="size-6 animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
