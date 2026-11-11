import { ArrowDownRight, ArrowRight } from "lucide-react";
import { hero } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

/**
 * Hero full blend: a fotografia ocupa a seção inteira e se funde ao
 * verde profundo no lado do texto. O header fica transparente por cima.
 */
export function Hero() {
  return (
    <section className="relative isolate h-full overflow-hidden bg-deep text-cream">
      <PhotoFrame photo={hero.photo} tone="deep" priority sizes="100vw" className="!absolute inset-0 -z-20" imageClass="object-[70%_center]" />

      {/* Fusão da foto com o verde da marca (garante contraste do texto) */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-deep/95 via-deep/75 to-deep/55 lg:bg-gradient-to-r lg:from-deep lg:from-25% lg:via-deep/80 lg:via-50% lg:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-deep/80 to-transparent" />

      {/* Traço orgânico discreto */}
      <svg aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-[30rem] w-[30rem] text-lime opacity-[0.09]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M200 390C120 300 90 180 200 10c110 170 80 290 0 380ZM200 390V10" />
        <path d="M200 120l56-44M200 180l76-50M200 240l80-48M200 300l64-36M200 120l-56-44M200 180l-76-50M200 240l-80-48M200 300l-64-36" />
      </svg>

      <div className="container-site flex h-full min-h-[min(46rem,100svh)] items-center pb-20 pt-40 lg:min-h-[52rem] lg:pb-28 lg:pt-48">
        <div className="max-w-xl">
          <p className="eyebrow flex animate-rise items-center gap-3 text-lime">
            <span aria-hidden className="h-px w-10 bg-lime" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 animate-rise text-[clamp(2.9rem,9.5vw,5.6rem)] [animation-delay:80ms]">
            {hero.title.replace("alimentação?", "")}
            <em className="font-light text-lime">alimentação?</em>
          </h1>
          <p className="mt-6 max-w-md animate-rise text-lg text-cream/85 [animation-delay:160ms]">{hero.text}</p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Button href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline-light" className="backdrop-blur-sm">
              {hero.secondaryCta.label}
              <ArrowDownRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
