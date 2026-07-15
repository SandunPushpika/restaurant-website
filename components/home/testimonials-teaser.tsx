"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { featuredTestimonials } from "@/constants/home";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function TestimonialsTeaser() {
  return (
    <section className="bg-muted px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16">
        <SectionHeading
          eyebrow="Guest Notes"
          title="What Our Guests Are Saying"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid w-full gap-8 md:grid-cols-3"
        >
          {featuredTestimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl bg-card p-8 text-card-foreground shadow-sm"
            >
              <Quote className="size-6 text-accent" aria-hidden="true" />
              <blockquote className="flex-1 text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="font-display text-base text-foreground">
                {testimonial.author}
                {testimonial.role ? (
                  <span className="block font-sans text-xs font-normal uppercase tracking-wide text-muted-foreground">
                    {testimonial.role}
                  </span>
                ) : null}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <Button asChild variant="gold-outline" size="lg">
          <Link href="/testimonials">Read More Reviews</Link>
        </Button>
      </div>
    </section>
  );
}
