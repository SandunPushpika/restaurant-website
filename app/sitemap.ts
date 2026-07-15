import type { MetadataRoute } from "next";

import { siteConfig } from "@/constants/site";

const routes = [
  "",
  "/about",
  "/menu",
  "/gallery",
  "/reservations",
  "/contact",
  "/testimonials",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
