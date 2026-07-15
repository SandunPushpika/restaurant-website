import { galleryImages } from "@/constants/gallery";
import { menuCategories } from "@/constants/menu";
import { testimonials } from "@/constants/testimonials";
import type { GalleryPreviewImage, MenuHighlight } from "@/types";

const allMenuItems = menuCategories.flatMap((category) => category.items);

const featuredDishIds = [
  "hearth-scallops",
  "smoked-heirloom-beetroot",
  "oak-fired-ribeye",
];

export const featuredDishes: MenuHighlight[] = featuredDishIds
  .map((id) => allMenuItems.find((item) => item.id === id))
  .filter((item): item is MenuHighlight => Boolean(item));

const featuredGalleryIds = [
  "gallery-interior-1",
  "gallery-interior-2",
  "gallery-food-1",
  "gallery-events-1",
  "gallery-events-2",
  "gallery-interior-3",
];

export const galleryPreviewImages: GalleryPreviewImage[] = featuredGalleryIds
  .map((id) => galleryImages.find((image) => image.id === id))
  .filter((image): image is (typeof galleryImages)[number] => Boolean(image))
  .map(({ id, src, alt }) => ({ id, src, alt }));

export const featuredTestimonials = testimonials.slice(0, 3);
