"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { testimonials } from "@/constants/testimonials";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-muted-foreground"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialGrid() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.figure
            key={testimonial.id}
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl bg-card p-8 text-card-foreground shadow-sm"
          >
            <Quote className="size-6 text-accent" aria-hidden="true" />
            <blockquote className="flex-1 text-sm text-muted-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            {testimonial.rating ? (
              <StarRating rating={testimonial.rating} />
            ) : null}
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
    </section>
  );
}
