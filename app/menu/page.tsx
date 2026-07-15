import type { Metadata } from "next";

import { MenuTabs } from "@/components/menu/menu-tabs";
import { TastingMenuBanner } from "@/components/menu/tasting-menu-banner";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Seasonal, fire-driven dishes from Ember & Oak's kitchen — starters, mains, desserts, and wine pairings.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the Kitchen"
        title="Our Menu"
        subtitle="A seasonal menu rewritten weekly, built around live-fire cooking and Nordic ingredients."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Chef finishing a dish tableside at Ember & Oak"
      />
      <TastingMenuBanner />
      <MenuTabs />
      <CTABanner
        title="Ready to Taste the Season?"
        subtitle="Reserve a table and let our kitchen bring the menu to you."
      />
    </>
  );
}
