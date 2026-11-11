import type { MetadataRoute } from "next";
import { HOME, site, stores } from "@/config/site";
import { storePath } from "@/lib/links";

/** Endereço absoluto: fotos locais (/images/...) ganham o domínio; URLs externas ficam como estão. */
const absolute = (src: string) => (src.startsWith("/") ? `${site.url}${src}` : src);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, images?: string[]): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
    ...(images?.length ? { images } : {}),
  });

  return [
    page(HOME, 1),
    /* Uma página por cidade: São Raimundo das Mangabeiras, Riachão e Fortaleza dos Nogueiras */
    ...stores.map((store) => page(storePath(store), 0.9, store.photo.src ? [absolute(store.photo.src)] : undefined)),
    page("/", 0.8),
    page("/sobre", 0.6),
    page("/politica-de-privacidade", 0.2),
  ];
}
