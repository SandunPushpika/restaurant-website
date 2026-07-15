import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Ember & Oak — the dining room, the hearth-fired kitchen, and the plates in between.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="A Look Inside"
        title="Gallery"
        subtitle="The room, the craft, and the table — a glimpse of an evening at Ember & Oak."
        image="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Bar and open kitchen at Ember & Oak"
      />
      <GalleryGrid />
      <CTABanner
        title="See It in Person"
        subtitle="Photos only tell half the story — reserve your table to experience the rest."
      />
    </>
  );
}
