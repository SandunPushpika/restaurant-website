import Link from "next/link";
import { Share2, Camera, Mail, MapPin, Phone } from "lucide-react";

import { Newsletter } from "@/components/shared/newsletter";
import { mainNavLinks } from "@/constants/navigation";
import { openingHours, siteConfig, socialLinks } from "@/constants/site";

const socialIcons: Record<string, typeof Share2 | typeof Camera> = {
  Instagram: Camera,
  Facebook: Share2,
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl">{siteConfig.name}</span>
          <p className="text-sm text-background/70">{siteConfig.tagline}</p>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-background/30 transition-colors hover:border-accent hover:text-accent"
                >
                  {Icon ? <Icon className="size-4" /> : null}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Navigate</h3>
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-background/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Visit</h3>
          <div className="flex items-start gap-2 text-sm text-background/70">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-background/70">
            <Phone className="size-4 shrink-0" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-background/70">
            <Mail className="size-4 shrink-0" />
            <span>{siteConfig.email}</span>
          </div>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-background/70">
            {openingHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span>{entry.days}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Stay in touch</h3>
          <p className="text-sm text-background/70">
            Seasonal menus, events, and private dining news.
          </p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-background/20 px-6 py-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
