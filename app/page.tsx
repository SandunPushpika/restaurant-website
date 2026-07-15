import { AboutTeaser } from "@/components/home/about-teaser";
import { GalleryTeaser } from "@/components/home/gallery-teaser";
import { Hero } from "@/components/home/hero";
import { MenuHighlights } from "@/components/home/menu-highlights";
import { TestimonialsTeaser } from "@/components/home/testimonials-teaser";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <MenuHighlights />
      <GalleryTeaser />
      <TestimonialsTeaser />
      <CTABanner
        title="Reserve Your Table Tonight"
        subtitle="Seats are limited each evening — book ahead to secure your place by the hearth."
      />
    </>
  );
}
