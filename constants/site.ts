import type { OpeningHoursEntry, SocialLink } from "@/types";

export const siteConfig = {
  name: "Ember & Oak",
  tagline: "Modern European fine dining, Copenhagen",
  description:
    "Ember & Oak is a modern European fine-dining restaurant in Copenhagen, offering chef-driven seasonal tasting menus and curated wine pairings in a warm, hearth-lit setting.",
  url: "https://emberandoak.example.com",
  address: {
    line1: "14 Nyhavn Kaj",
    line2: "1051 Copenhagen K, Denmark",
  },
  phone: "+45 33 12 34 56",
  email: "reservations@emberandoak.example.com",
  whatsappNumber: "4533123456",
} as const;

export const openingHours: OpeningHoursEntry[] = [
  { days: "Tuesday – Thursday", hours: "17:30 – 22:00" },
  { days: "Friday – Saturday", hours: "17:30 – 23:00" },
  { days: "Sunday – Monday", hours: "Closed" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/emberandoak" },
  { label: "Facebook", href: "https://facebook.com/emberandoak" },
];
