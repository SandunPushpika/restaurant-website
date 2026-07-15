import type { MenuCategory } from "@/types";

export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    description: "Small plates to open the evening.",
    items: [
      {
        id: "hearth-scallops",
        name: "Hearth-Seared Scallops",
        description: "Brown butter, charred leek ash, and Nordic caviar.",
        price: "245 DKK",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
        badge: "popular",
      },
      {
        id: "smoked-heirloom-beetroot",
        name: "Smoked Heirloom Beetroot",
        description: "Whipped goat curd, toasted rye crumble, and dill oil.",
        price: "185 DKK",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
        badge: "vegetarian",
      },
      {
        id: "tartare",
        name: "Aged Beef Tartare",
        description: "Smoked egg yolk, pickled shallot, and rye crisp.",
        price: "215 DKK",
        image:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "celeriac-veloute",
        name: "Roasted Celeriac Velouté",
        description: "Brown butter hazelnuts, apple, and thyme oil.",
        price: "165 DKK",
        image:
          "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1200&auto=format&fit=crop",
        badge: "vegan",
      },
    ],
  },
  {
    id: "mains",
    name: "Mains",
    description: "From the hearth to the table.",
    items: [
      {
        id: "oak-fired-ribeye",
        name: "Oak-Fired Ribeye",
        description:
          "45-day dry-aged beef, bone marrow jus, and roasted shallot.",
        price: "395 DKK",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
        badge: "popular",
      },
      {
        id: "whole-roasted-turbot",
        name: "Whole Roasted Turbot",
        description: "Brown butter, capers, and charred lemon.",
        price: "355 DKK",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
        badge: "gluten-free",
      },
      {
        id: "hearth-roasted-cauliflower",
        name: "Hearth-Roasted Cauliflower",
        description: "Almond purée, brown butter raisins, and sage.",
        price: "255 DKK",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
        badge: "vegan",
      },
      {
        id: "duck-breast",
        name: "Smoked Duck Breast",
        description: "Charred plum, red cabbage, and juniper jus.",
        price: "335 DKK",
        image:
          "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "A sweet close to the tasting.",
    items: [
      {
        id: "burnt-honey-parfait",
        name: "Burnt Honey Parfait",
        description: "Toasted oats, brown butter caramel, and sea salt.",
        price: "135 DKK",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        badge: "popular",
      },
      {
        id: "dark-chocolate-tart",
        name: "Dark Chocolate & Ember Tart",
        description: "Smoked cream, hazelnut praline, and cocoa nib.",
        price: "145 DKK",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
        badge: "vegetarian",
      },
      {
        id: "poached-pear",
        name: "Spiced Poached Pear",
        description: "Elderflower sorbet, toasted almond, and rye crumble.",
        price: "125 DKK",
        image:
          "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=1200&auto=format&fit=crop",
        badge: "vegan",
      },
    ],
  },
  {
    id: "to-drink",
    name: "To Drink",
    description: "Wines, pairings, and something for the table.",
    items: [
      {
        id: "tasting-pairing",
        name: "5-Course Wine Pairing",
        description: "Built course-by-course by our sommelier.",
        price: "650 DKK",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
        badge: "popular",
      },
      {
        id: "natural-white",
        name: "Danish Natural White, by the glass",
        description: "Skin-contact, low-intervention, from Zealand.",
        price: "115 DKK",
        image:
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "burgundy-red",
        name: "Burgundy Pinot Noir, by the glass",
        description: "Light-bodied, red fruit, and soft tannin.",
        price: "135 DKK",
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "botanical-cordial",
        name: "House Botanical Cordial",
        description: "Non-alcoholic, foraged herbs, and citrus.",
        price: "75 DKK",
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
        badge: "vegan",
      },
    ],
  },
];
