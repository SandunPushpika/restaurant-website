"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: PageHeaderProps) {
  return (
    <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden pt-16">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/55 to-[#1a1a1a]/80" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 flex flex-col items-center gap-4 px-6 text-center"
      >
        {eyebrow ? (
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-display text-section max-w-3xl text-[#F8F4ED]">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-xl text-lg text-[#F8F4ED]/85">{subtitle}</p>
        ) : null}
      </motion.div>
    </section>
  );
}
