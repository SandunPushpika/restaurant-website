"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { teamMembers } from "@/constants/about";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function TeamSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16">
        <SectionHeading eyebrow="Behind the Hearth" title="Meet the Team" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid w-full gap-8 md:grid-cols-2"
        >
          {teamMembers.map((member) => (
            <motion.article
              key={member.id}
              variants={fadeUp}
              className="flex flex-col gap-6 rounded-2xl bg-card p-6 text-card-foreground shadow-sm sm:flex-row sm:items-start"
            >
              <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-40">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 10rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl text-foreground">
                  {member.name}
                </h3>
                <span className="text-sm font-medium uppercase tracking-wide text-accent">
                  {member.role}
                </span>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
