import type { Metadata } from "next";

import { CTABanner } from "@/components/shared/cta-banner";
import { PageHeader } from "@/components/shared/page-header";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What guests are saying about Ember & Oak's live-fire tasting menu in Copenhagen.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guest Notes"
        title="Testimonials"
        subtitle="Kind words from the guests who've joined us at the hearth."
        image="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop"
        imageAlt="A plated tasting course at Ember & Oak"
      />
      <TestimonialGrid />
      <CTABanner
        title="Join Our Guests"
        subtitle="Reserve a table and see what the conversation is about."
      />
    </>
  );
}
