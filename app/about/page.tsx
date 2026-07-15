import type { Metadata } from "next";

import { StorySection } from "@/components/about/story-section";
import { TeamSection } from "@/components/about/team-section";
import { ValuesSection } from "@/components/about/values-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, philosophy, and team behind Ember & Oak's live-fire dining room in Copenhagen.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Ember & Oak"
        subtitle="Modern European cuisine, shaped by fire, season, and the Copenhagen waterfront."
        image="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Warm hearth-lit dining room at Ember & Oak"
      />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <CTABanner
        title="Come Taste Our Story"
        subtitle="Join us at the hearth for an evening of seasonal, fire-driven cooking."
      />
    </>
  );
}
