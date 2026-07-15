import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { LocationMap } from "@/components/contact/location-map";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ember & Oak — questions, private dining, and press enquiries welcome.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Questions, private dining enquiries, or press — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1541542684-4a70b5ee7e19?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Table set by the window at Ember & Oak"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <ContactInfo />
      </section>
      <LocationMap />
    </>
  );
}
