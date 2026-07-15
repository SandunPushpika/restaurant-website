export interface NavLink {
  label: string;
  href: string;
}

export interface OpeningHoursEntry {
  days: string;
  hours: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface MenuHighlight {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: "popular" | "vegetarian" | "vegan" | "gluten-free";
}

export interface GalleryPreviewImage {
  id: string;
  src: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

export interface ValueProp {
  id: string;
  icon: "flame" | "leaf" | "wine" | "heart-handshake";
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuHighlight[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "food" | "events";
}
