import type { Metadata } from "next";
import { HOME, site, social, stores } from "@/config/site";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Categories } from "@/components/sections/Categories";
import { Hero } from "@/components/sections/Hero";
import { Nutri } from "@/components/sections/Nutri";
import { Stores } from "@/components/sections/Stores";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Produtos naturais, grãos e suplementos no Maranhão` },
  description: site.description,
  alternates: { canonical: HOME },
};

/** Dados estruturados: só entra o que é real. Campos vazios ficam de fora. */
function jsonLd() {
  const sameAs = Object.values(social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${site.url}/#org`, name: site.name, url: `${site.url}${HOME}`, ...(sameAs.length && { sameAs }) },
      ...stores.map((s) => ({
        "@type": "HealthFoodStore",
        "@id": `${site.url}/#${s.id}`,
        name: `${site.name} — ${s.shortName}`,
        parentOrganization: { "@id": `${site.url}/#org` },
        url: `${site.url}${HOME}#lojas`,
        address: {
          "@type": "PostalAddress",
          ...(s.address && { streetAddress: s.address }),
          addressLocality: s.city,
          addressRegion: s.state,
          addressCountry: "BR",
        },
        ...(s.whatsapp && { telephone: `+${s.whatsapp.replace(/\D/g, "")}` }),
      })),
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <Hero />
      <Categories />
      <Brands />
      <About />
      <Nutri />
      <Stores />
    </>
  );
}
