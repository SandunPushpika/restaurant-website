import type { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-interior-1",
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1400&auto=format&fit=crop",
    alt: "Candlelit dining room at Ember & Oak",
    category: "interior",
  },
  {
    id: "gallery-interior-2",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1400&auto=format&fit=crop",
    alt: "Bar and open kitchen at Ember & Oak",
    category: "interior",
  },
  {
    id: "gallery-interior-3",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    alt: "Warm hearth-lit dining room",
    category: "interior",
  },
  {
    id: "gallery-interior-4",
    src: "https://images.unsplash.com/photo-1541542684-4a70b5ee7e19?q=80&w=1400&auto=format&fit=crop",
    alt: "Table set for fine dining beside the window",
    category: "interior",
  },
  {
    id: "gallery-food-1",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
    alt: "Plated tasting course",
    category: "food",
  },
  {
    id: "gallery-food-2",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop",
    alt: "Oak-fired ribeye, plated",
    category: "food",
  },
  {
    id: "gallery-food-3",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
    alt: "Hearth-seared scallops, plated",
    category: "food",
  },
  {
    id: "gallery-food-4",
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1400&auto=format&fit=crop",
    alt: "Burnt honey parfait dessert",
    category: "food",
  },
  {
    id: "gallery-food-5",
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1400&auto=format&fit=crop",
    alt: "Smoked heirloom beetroot starter",
    category: "food",
  },
  {
    id: "gallery-events-1",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop",
    alt: "Chef finishing a dish tableside",
    category: "events",
  },
  {
    id: "gallery-events-2",
    src: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=1400&auto=format&fit=crop",
    alt: "Private dining table set for an event",
    category: "events",
  },
  {
    id: "gallery-events-3",
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1400&auto=format&fit=crop",
    alt: "Wine pairing service during a tasting event",
    category: "events",
  },
];

export const galleryCategories = [
  { id: "all" as const, label: "All" },
  { id: "interior" as const, label: "Interior" },
  { id: "food" as const, label: "Food" },
  { id: "events" as const, label: "Events" },
];
