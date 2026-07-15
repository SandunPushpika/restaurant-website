import { siteConfig } from "@/constants/site";

export function LocationMap() {
  const query = encodeURIComponent(
    `${siteConfig.address.line1}, ${siteConfig.address.line2}`
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24">
      <div className="h-96 w-full overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`Map showing the location of ${siteConfig.name}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
