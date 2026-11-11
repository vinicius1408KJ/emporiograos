import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { nutri } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Seção da nutricionista: foto fixa à esquerda (acompanha a leitura no desktop),
 * conteúdo em blocos bem definidos à direita.
 */
export function Nutri() {
  const [first, ...rest] = nutri.name.split(" ");
  const [lead, ...bio] = nutri.bio;

  // "+20 anos de formação" vira selo sobre a foto; o resto vira lista de especializações
  const highlight = nutri.credentials.map((c) => c.match(/^\+(\d+)\s+(.+)$/)).find(Boolean);
  const specialties = nutri.credentials.filter((c) => !/^\+\d+/.test(c));

  return (
    <section id="nutri" className="relative bg-mint py-20 md:py-28">
      <div className="container-site">
        <Reveal className="flex items-center gap-4 border-b border-forest/15 pb-5 text-forest">
          <p className="eyebrow">{nutri.eyebrow}</p>
          <span aria-hidden className="h-px flex-1 bg-forest/15" />
          <p className="eyebrow text-forest/50">Saúde &amp; bem-estar</p>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Foto */}
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <PhotoFrame
                photo={nutri.photo}
                tone="sand"
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/5] w-full rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(6,59,20,0.45)] lg:rounded-tr-[8rem]"
              />
              {highlight && (
                <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-[1.5rem] bg-forest px-5 py-4 text-cream shadow-xl sm:left-8">
                  <span className="font-display text-4xl leading-none text-lime">+{highlight[1]}</span>
                  <span className="max-w-[7rem] text-sm leading-tight text-cream/85">{highlight[2]}</span>
                </div>
              )}
              {nutri.crn && (
                <span className="absolute right-5 top-5 rounded-full bg-cream/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest backdrop-blur">
                  {nutri.crn}
                </span>
              )}
            </div>
          </Reveal>

          {/* Conteúdo */}
          <div className="pt-4 lg:col-span-7 lg:pt-6">
            <Reveal delay={100}>
              <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-forest/60">
                <span aria-hidden className="size-2 rounded-full bg-lime" />
                {nutri.role}
              </p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,5.75rem)] leading-[0.95] text-forest">
                {first} <em className="font-light">{rest.join(" ")}</em>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <figure className="relative mt-9 rounded-[2rem] bg-white/70 p-7 ring-1 ring-forest/10 md:p-9">
                <Quote aria-hidden className="absolute -top-4 left-7 size-9 rounded-full bg-lime p-2 text-deep" />
                <blockquote className="font-display text-[1.6rem] leading-snug text-forest md:text-[1.9rem]">{nutri.message}</blockquote>
              </figure>
            </Reveal>

            {nutri.bio.length > 0 ? (
              <Reveal delay={220} className="mt-10 max-w-2xl">
                <p className="font-display text-2xl leading-snug text-forest">{lead}</p>
                <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-muted">
                  {bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ) : (
              <p className="mt-10 text-forest/45">Biografia em breve.</p>
            )}

            {specialties.length > 0 && (
              <Reveal delay={260} className="mt-10 border-t border-forest/15 pt-8">
                <p className="eyebrow text-forest/50">Especializações</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {specialties.map((c) => (
                    <li key={c} className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 text-[0.95rem] font-medium text-forest ring-1 ring-forest/10">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {nutri.signature && (
              <Reveal delay={300} className="mt-10 flex items-center gap-4">
                <Image src="/images/marca/simbolo.svg" alt="" width={376} height={351} className="h-12 w-auto shrink-0" />
                <p className="font-display text-xl leading-snug text-forest md:text-2xl">{nutri.signature}</p>
              </Reveal>
            )}

            {nutri.cta.href && (
              <Reveal delay={340}>
                <Button href={nutri.cta.href} variant="forest" external className="mt-9">
                  {nutri.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
