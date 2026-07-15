import type { Metadata } from "next";

import { ReservationForm } from "@/components/reservations/reservation-form";
import { ReservationInfo } from "@/components/reservations/reservation-info";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at Ember & Oak — modern European fine dining in Copenhagen.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book Ahead"
        title="Reserve a Table"
        subtitle="Seats are limited each evening — request your table and we'll confirm shortly."
        image="https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Table set for fine dining at Ember & Oak"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-3">
        <div className="md:col-span-2">
          <ReservationForm />
        </div>
        <ReservationInfo />
      </section>
    </>
  );
}
