import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { HOME, categoriesSection, nutri, site, social, stores, type Store } from "@/config/site";
import { mapsLink, storeGeo, storePath, storeTitle, whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button, PendingButton } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

/**
 * ROTA /lojas/[cidade] — uma página por unidade (SEO local).
 * Conteúdo vem de `stores` em src/config/site.ts. Nova loja lá = nova página aqui + no sitemap.
 */
type Props = { params: Promise<{ cidade: string }> };

const findStore = (slug: string) => stores.find((s) => s.slug === slug);

/** Gera as páginas no build. Cidade fora da lista = 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return stores.map((store) => ({ cidade: store.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = findStore((await params).cidade);
  if (!store) return {};
  const title = `Produtos naturais em ${store.city} — ${store.state}`;
  const description = `Loja de produtos naturais, grãos, suplementos e alimentos saudáveis em ${store.city} - ${store.state}. ${store.address}.${store.phoneDisplay ? ` WhatsApp ${store.phoneDisplay}.` : ""}`;
  return {
    title,
    description,
    alternates: { canonical: storePath(store) },
    openGraph: { title: `${site.name} · ${store.city}`, description, url: storePath(store) },
  };
}

/** Dados estruturados (Google): loja física com endereço, horário, telefone e mapa. */
function storeJsonLd(store: Store) {
  const url = `${site.url}${storePath(store)}`;
  const parts = store.address.split(" · ");
  const cep = parts.find((p) => p.startsWith("CEP"))?.replace(/^CEP\s*/, "");
  const geo = storeGeo(store);
  const image = store.photo.src?.startsWith("/") ? `${site.url}${store.photo.src}` : store.photo.src;
  return {
    "@context": "https://schema.org",
    "@type": "HealthFoodStore",
    "@id": `${url}#loja`,
    name: `${site.name} — ${store.city}`,
    url,
    image,
    description: store.intro,
    telephone: store.whatsapp ? `+${store.whatsapp}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: parts[0],
      addressLocality: store.city,
      addressRegion: store.state,
      postalCode: cep,
      addressCountry: "BR",
    },
    geo: geo ? { "@type": "GeoCoordinates", ...geo } : undefined,
    hasMap: mapsLink(store),
    openingHours: store.openingHours,
    areaServed: { "@type": "City", name: `${store.city} - ${store.state}` },
    parentOrganization: { "@type": "Organization", name: site.name, url: site.url },
    sameAs: Object.values(social).filter(Boolean),
  };
}

function breadcrumbJsonLd(store: Store) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${site.url}${HOME}` },
      { "@type": "ListItem", position: 2, name: "Lojas", item: `${site.url}${HOME}#lojas` },
      { "@type": "ListItem", position: 3, name: store.city, item: `${site.url}${storePath(store)}` },
    ],
  };
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 py-4">
      <span className="mt-0.5 text-forest/60">{icon}</span>
      <div>
        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
        <dd className={`mt-0.5 whitespace-pre-line ${value ? "text-ink" : "text-forest/40"}`}>{value || "A confirmar"}</dd>
      </div>
    </div>
  );
}

export default async function StorePage({ params }: Props) {
  const store = findStore((await params).cidade);
  if (!store) notFound();

  const wa = whatsappLink(store);
  const others = stores.filter((s) => s.id !== store.id);
  const jsonLd = [storeJsonLd(store), breadcrumbJsonLd(store)];

  return (
    <article className="bg-cream pb-24 pt-40 md:pt-48">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <nav aria-label="Você está em" className="text-sm text-muted">
            <Link href={HOME} className="hover:text-forest">
              Início
            </Link>
            <span aria-hidden> / </span>
            <Link href={`${HOME}#lojas`} className="hover:text-forest">
              Lojas
            </Link>
            <span aria-hidden> / </span>
            <span className="text-forest">{store.city}</span>
          </nav>

          <p className="eyebrow mt-8 text-forest/60">
            Unidade {store.city} · {store.state}
          </p>
          <h1 className="mt-4 text-5xl text-forest md:text-6xl">
            Produtos naturais em <em className="font-light">{store.city}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{store.intro}</p>

          <dl className="mt-8 max-w-xl divide-y divide-forest/10 border-y border-forest/10">
            <Info icon={<MapPin className="size-5" aria-hidden />} label="Endereço" value={store.address ? `${store.address} · ${store.city} — ${store.state}` : ""} />
            <Info icon={<Clock className="size-5" aria-hidden />} label="Horário" value={store.hours} />
            <Info icon={<Phone className="size-5" aria-hidden />} label="Telefone / WhatsApp" value={store.phoneDisplay} />
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={`Falar com a loja: ${storeTitle(store)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 text-[0.95rem] font-semibold text-cream transition duration-200 hover:bg-deep active:scale-[0.97]">
                <WhatsAppIcon className="size-4" />
                Falar com a loja
              </a>
            ) : (
              <PendingButton>
                <WhatsAppIcon className="size-4" />
                WhatsApp em breve
              </PendingButton>
            )}
            <Button href={mapsLink(store)} variant="outline-dark" external>
              <Navigation className="size-4" aria-hidden />
              Como chegar
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <PhotoFrame photo={store.photo} tone="moss" priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2.5rem]" />
        </div>
      </div>

      <section aria-labelledby="produtos" className="container-site mt-24">
        <h2 id="produtos" className="text-3xl text-forest md:text-4xl">
          O que você encontra na loja de {store.city}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {categoriesSection.productLines.map((line) => (
            <li key={line} className="rounded-full bg-forest/5 px-4 py-2 text-sm font-semibold text-forest ring-1 ring-forest/10">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          Uma marca fundada pela nutricionista {nutri.name} ({nutri.crn}): produtos selecionados com critério e orientação para escolhas mais conscientes.
        </p>
      </section>

      <section aria-labelledby="outras" className="container-site mt-20">
        <h2 id="outras" className="eyebrow text-forest/60">
          Outras unidades no Maranhão
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.id}>
              <Link href={storePath(s)} className="group flex items-center justify-between gap-4 rounded-[1.75rem] bg-forest/5 p-6 ring-1 ring-forest/10 transition hover:bg-forest/10">
                <span>
                  <span className="block font-display text-2xl text-forest">{s.city}</span>
                  <span className="mt-1 block text-sm text-muted">{s.address}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-forest/50 transition group-hover:translate-x-1 group-hover:text-forest" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
