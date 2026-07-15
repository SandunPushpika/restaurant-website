import type { TeamMember, ValueProp } from "@/types";

export const values: ValueProp[] = [
  {
    id: "fire-craft",
    icon: "flame",
    title: "Fire & Craft",
    description:
      "Our open hearth is the heart of the kitchen — every dish passes through live fire before it reaches the table.",
  },
  {
    id: "nordic-roots",
    icon: "leaf",
    title: "Nordic Roots",
    description:
      "We work with foragers and small growers across Zealand, letting the Danish seasons set the menu, not the calendar.",
  },
  {
    id: "curated-pairings",
    icon: "wine",
    title: "Curated Pairings",
    description:
      "Our cellar favors small European producers, with a pairing built course-by-course alongside the tasting menu.",
  },
  {
    id: "warm-hospitality",
    icon: "heart-handshake",
    title: "Warm Hospitality",
    description:
      "A room that feels like a friend's hearth-lit dining table, with service that is attentive without being formal.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "chef-anders",
    name: "Anders Holm",
    role: "Executive Chef & Founder",
    bio: "Trained in Copenhagen and the Basque Country, Anders opened Ember & Oak to marry Nordic ingredients with the theatre of live-fire cooking. His tasting menu changes weekly with what foragers and fishermen bring to the back door.",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sommelier-freja",
    name: "Freja Nielsen",
    role: "Head Sommelier",
    bio: "Freja built the Ember & Oak cellar around small, low-intervention producers, and designs each evening's pairing to move with the tasting menu course by course.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
  },
];
