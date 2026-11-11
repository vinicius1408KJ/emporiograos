import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { stores, storesSection, type Store } from "@/config/site";
import { mapsLink, storeTitle, whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button, PendingButton } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 py-3">
      <span className="mt-0.5 text-forest/60">{icon}</span>
      <div>
        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
        <dd className={`whitespace-pre-line ${value ? "text-ink" : "text-forest/40"}`}>{value || "A confirmar"}</dd>
      </div>
    </div>
  );
}

function StoreCard({ store, index }: { store: Store; index: number }) {
  const wa = whatsappLink(store);
  const tones = ["oat", "mint", "sand"] as const;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream text-ink">
      <PhotoFrame photo={store.photo} tone={tones[index % 3]} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/5] w-full" />
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="eyebrow text-forest/50">
          Unidade {String(index + 1).padStart(2, "0")} · {store.state}
        </p>
        <h3 className="mt-2 text-3xl text-forest">{store.city}</h3>

        <dl className="mt-4 flex-1 divide-y divide-forest/10">
          <Row icon={<MapPin className="size-5" aria-hidden />} label="Endereço" value={store.address} />
          <Row icon={<Clock className="size-5" aria-hidden />} label="Horário" value={store.hours} />
          <Row icon={<Phone className="size-5" aria-hidden />} label="Telefone / WhatsApp" value={store.phoneDisplay} />
        </dl>

        <div className="mt-6 flex flex-wrap gap-3 *:flex-1 *:whitespace-nowrap">
          <Button href={mapsLink(store)} variant="outline-dark" external>
            <Navigation className="size-4" aria-hidden />
            Como chegar
          </Button>
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
        </div>
      </div>
    </article>
  );
}

export function Stores() {
  return (
    <section id="lojas" className="bg-forest py-20 text-cream md:py-32">
      <div className="container-site">
        <Reveal stagger className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-lime">{storesSection.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-6xl">{storesSection.title}</h2>
          </div>
          <p className="text-lg text-cream/70 md:col-span-4 md:pb-2">{storesSection.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {stores.map((store, i) => (
            <li key={store.id}>
              <Reveal delay={i * 150} className="h-full">
                <StoreCard store={store} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
