import { Clock, MapPin, Phone } from "lucide-react";

import { openingHours, siteConfig } from "@/constants/site";

export function ReservationInfo() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-muted p-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-foreground">
          <Clock className="size-5 text-accent" aria-hidden="true" />
          <h3 className="font-display text-lg">Opening Hours</h3>
        </div>
        <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
          {openingHours.map((entry) => (
            <li key={entry.days} className="flex justify-between gap-4">
              <span>{entry.days}</span>
              <span>{entry.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-foreground">
          <MapPin className="size-5 text-accent" aria-hidden="true" />
          <h3 className="font-display text-lg">Location</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {siteConfig.address.line1}
          <br />
          {siteConfig.address.line2}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-foreground">
          <Phone className="size-5 text-accent" aria-hidden="true" />
          <h3 className="font-display text-lg">Large Parties</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          For parties larger than 8 guests or private events, please call us
          directly at {siteConfig.phone}.
        </p>
      </div>
    </div>
  );
}
