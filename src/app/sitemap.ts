import type { MetadataRoute } from "next";
import { HOME, site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page(HOME, 1),
    page("/", 0.8),
    page("/sobre", 0.6),
    page("/politica-de-privacidade", 0.2),
  ];
}
