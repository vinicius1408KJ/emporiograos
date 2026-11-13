import { ArrowRight, MapPin, Navigation } from "lucide-react";
import type { Metadata } from "next";
import { HOME, site, stores } from "@/config/site";
import { mapsLink, storeTitle, whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { activeSocial } from "@/components/ui/SocialLinks";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Links e unidades` },
  description: `Acesse o site, fale com a unidade mais próxima pelo WhatsApp e veja como chegar. ${site.utilityBar}`,
  alternates: { canonical: "/" },
};

/**
 * ROTA "/" — Página de acesso (link da bio).
 * Independente do site institucional: nada em /inicial aponta de volta para cá.
 */
export default function AccessPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-deep text-cream">
      <svg aria-hidden className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[46rem] w-[46rem] text-lime opacity-[0.08]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M200 390C120 300 90 180 200 10c110 170 80 290 0 380ZM200 390V10" />
        <path d="M200 120l56-44M200 180l76-50M200 240l80-48M200 300l64-36M200 120l-56-44M200 180l-76-50M200 240l-80-48M200 300l-64-36" />
      </svg>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-forest/60 to-transparent" />

      <div className="mx-auto flex min-h-dvh w-full max-w-[30rem] flex-col px-5 pb-10 pt-14 md:pt-20">
        <header className="animate-rise text-center">
          <Logo variant="vertical" asLink={false} size="lg" className="flex justify-center" />
          <h1 className="mt-10 text-4xl md:text-[2.75rem]">
            Que bom ter você <em className="font-light text-lime">por aqui.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-cream/70">Escolha a unidade mais próxima para falar com a gente ou conheça a Grãos e Folhas no site.</p>
        </header>

        <div className="mt-9 animate-rise [animation-delay:100ms]">
          <Button href={HOME} className="w-full !min-h-14 text-base">
            Acessar o site
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        <section aria-labelledby="unidades" className="mt-10">
          <h2 id="unidades" className="eyebrow font-sans text-cream/50">
            Nossas unidades
          </h2>
          <ul className="mt-4 space-y-4">
            {stores.map((store, i) => {
              const wa = whatsappLink(store);
              return (
                <li key={store.id} className="animate-rise rounded-[1.75rem] bg-cream/[0.06] p-5 ring-1 ring-cream/10" style={{ animationDelay: `${180 + i * 80}ms` }}>
                  <h3 className="text-2xl">{store.city}</h3>
                  <p className="mt-1.5 flex items-start gap-2 text-sm text-cream/65">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                    <span>
                      {store.address || <span className="text-cream/40">Endereço a confirmar</span>}
                      {store.address ? ` · ${store.city} — ${store.state}` : ` · ${store.state}`}
                    </span>
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp: ${storeTitle(store)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-deep transition hover:bg-lime active:scale-[0.97]">
                        <WhatsAppIcon className="size-4" />
                        WhatsApp
                      </a>
                    ) : (
                      <span aria-disabled="true" className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-cream/25 px-4 text-sm font-semibold text-cream/50">
                        <WhatsAppIcon className="size-4" />
                        Em breve
                      </span>
                    )}
                    <a href={mapsLink(store)} target="_blank" rel="noopener noreferrer" aria-label={`Como chegar: ${storeTitle(store)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-4 text-sm font-semibold transition hover:border-cream hover:bg-cream/10 active:scale-[0.97]">
                      <Navigation className="size-4" aria-hidden />
                      Como chegar
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="canais" className="mt-10">
          <h2 id="canais" className="eyebrow font-sans text-cream/50">
            Canais oficiais
          </h2>
          {activeSocial.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {activeSocial.map(({ key, label, href, Icon }) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center gap-3 rounded-full px-5 ring-1 ring-cream/15 transition hover:bg-cream/10">
                    <Icon className="size-5 text-lime" />
                    <span className="flex-1 font-semibold">{label}</span>
                    <ArrowRight className="size-4 text-cream/40 transition group-hover:translate-x-1 group-hover:text-cream" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-full border border-dashed border-cream/20 px-5 py-4 text-center text-sm text-cream/45">Instagram e demais canais em breve.</p>
          )}
        </section>

        <footer className="mt-auto pt-12 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {site.name}
        </footer>
      </div>
    </main>
  );
}
