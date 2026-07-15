"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  title,
  subtitle,
  ctaLabel = "Reserve a Table",
  ctaHref = "/reservations",
}: CTABannerProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="bg-primary px-6 py-20 text-center text-primary-foreground"
    >
      <h2 className="font-display text-section">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{subtitle}</p>
      ) : null}
      <Button asChild variant="gold-outline" size="lg" className="mt-8">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </motion.section>
  );
}
