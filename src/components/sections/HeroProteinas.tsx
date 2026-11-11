import Image from "next/image";
import { ArrowRight, BicepsFlexed, CircleCheck, Dumbbell, Sprout, Zap } from "lucide-react";
import { HOME } from "@/config/site";
import { Button } from "@/components/ui/Button";

const products = [
  {
    name: "Hit Protein",
    tagline: "Proteína prática, saborosa e de alto valor nutricional!",
    benefits: ["Rica em proteínas", "Auxilia no ganho e manutenção muscular", "Mais saciedade", "Sabor incrível"],
  },
  {
    name: "Tasty Whey",
    tagline: "Whey Protein de alta qualidade para sua rotina!",
    benefits: ["Alto teor de proteínas", "Auxilia na recuperação muscular", "Contribui para a definição corporal", "Sabor e cremosidade incomparáveis"],
  },
];

const pillars = [
  { label: "Desempenho", Icon: Dumbbell },
  { label: "Energia", Icon: Zap },
  { label: "Força", Icon: BicepsFlexed },
  { label: "Recuperação", Icon: Sprout },
];

const alt = "Hit Protein nos sabores chocolate, morango e baunilha e Tasty Whey Original sobre uma mesa rústica com cacau, morangos e aveia";

/**
 * Segundo hero: vitrine de proteínas (Hit Protein + Tasty Whey).
 * - Tablet/computador: foto horizontal, produtos à direita, texto no lado escuro.
 * - Celular: foto vertical presa ao rodapé (produtos embaixo), texto compacto em cima.
 *   Cada aparelho baixa só a sua foto (a outra fica oculta e não é carregada).
 */
export function HeroProteinas() {
  return (
    <section aria-labelledby="hero-proteinas" className="relative isolate h-full overflow-hidden bg-deep text-cream">
      {/* No computador a foto segue a proporção original (menos zoom), presa ao rodapé;
          o topo funde no verde para não aparecer emenda */}
      {/* lg: largura limitada a 52rem (altura do hero) × proporção da foto, para telas largas não ampliarem demais */}
      <div className="absolute inset-0 -z-20 hidden md:block lg:left-auto lg:top-auto lg:aspect-[1376/768] lg:w-[min(100%,93rem)]">
        <Image src="/images/hero-proteinas.png" alt={alt} fill sizes="100vw" className="object-cover object-[75%_center] lg:object-bottom" />
        <div aria-hidden className="absolute inset-x-0 top-0 hidden h-1/4 bg-gradient-to-b from-deep to-transparent lg:block" />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-1/5 bg-gradient-to-r from-deep to-transparent lg:block" />
      </div>
      <Image src="/images/hero-proteinas-mobile.png" alt={alt} width={896} height={1200} sizes="100vw" className="absolute inset-x-0 bottom-0 -z-20 h-auto w-full md:hidden" />

      {/* Celular: escurece só o topo (texto) e deixa os produtos limpos embaixo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-deep from-35% via-deep/60 via-55% to-transparent to-75% md:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-b from-deep/95 via-deep/80 to-deep/60 md:block lg:bg-gradient-to-r lg:from-deep/95 lg:from-20% lg:via-deep/70 lg:via-45% lg:to-transparent lg:to-65%" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-deep/80 to-transparent" />

      <div className="container-site flex h-full min-h-[min(46rem,100svh)] items-start pb-[86vw] pt-36 md:items-center md:pb-24 md:pt-40 lg:min-h-[52rem] lg:pb-28 lg:pt-48">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span aria-hidden className="h-px w-10 bg-lime" />
            Proteínas
          </p>
          <h2 id="hero-proteinas" className="mt-4 text-[clamp(2.2rem,7vw,4.4rem)] md:mt-5">
            Hit Protein <em className="font-light text-lime">&amp;</em> Tasty Whey
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
            {products.map((p) => (
              <article key={p.name} className="rounded-[1.25rem] bg-deep/55 p-4 ring-1 ring-lime/25 backdrop-blur-sm md:rounded-[1.5rem] md:p-5">
                <h3 className="text-lg md:text-2xl">{p.name}</h3>
                <p className="mt-1 text-xs leading-snug text-cream/80 md:mt-1.5 md:text-sm">{p.tagline}</p>
                <ul className="mt-4 hidden space-y-2 md:block">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ul className="mt-5 grid grid-cols-4 gap-1 text-center text-[0.7rem] font-semibold text-cream/90 md:mt-6 md:flex md:flex-wrap md:gap-x-6 md:gap-y-3 md:text-left md:text-sm">
            {pillars.map(({ label, Icon }) => (
              <li key={label} className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2">
                <Icon className="size-5 text-lime" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-6 md:mt-8">
            <Button href={`${HOME}#lojas`} className="w-full sm:w-auto">
              Encontre na loja mais próxima
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
