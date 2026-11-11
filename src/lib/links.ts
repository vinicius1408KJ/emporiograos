import { site, type Store } from "@/config/site";

/** Link do WhatsApp da unidade. Retorna null enquanto o número não for informado. */
export function whatsappLink(store: Store): string | null {
  const digits = store.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(site.whatsappMessage)}`;
}

/** Link "Como chegar". Usa o link oficial se houver; senão, busca por nome + cidade. */
export function mapsLink(store: Store): string {
  if (store.mapsUrl) return store.mapsUrl;
  const query = [site.name, store.address, `${store.city} - ${store.state}`].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const storeTitle = (store: Store) => `${site.name} — ${store.shortName}`;
