import { ArrowRight } from "lucide-react";
import { about } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-cream py-20 md:py-32">
      <svg aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[40rem] w-[40rem] text-forest opacity-[0.06]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M200 390C120 300 90 180 200 10c110 170 80 290 0 380ZM200 390V10" />
        <path d="M200 120l56-44M200 180l76-50M200 240l80-48M200 300l64-36M200 120l-56-44M200 180l-76-50M200 240l-80-48M200 300l-64-36" />
      </svg>

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <Parallax speed={0.05}>
            <Reveal variant="mask">
              <PhotoFrame photo={about.photo} tone="moss" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] w-[84%] rounded-t-[999px] rounded-b-[2.5rem]" />
            </Reveal>
          </Parallax>
          <Parallax speed={-0.1} className="absolute -bottom-8 right-0 w-[42%]">
            <Reveal variant="zoom" delay={500}>
              <PhotoFrame photo={about.photoDetail} tone="oat" sizes="16rem" className="aspect-square w-full rounded-[2rem] ring-[10px] ring-cream" />
            </Reveal>
          </Parallax>
        </div>

        <Reveal stagger delay={150} className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-forest/60">{about.eyebrow}</p>
          <h2 className="mt-4 text-4xl text-forest md:text-[3.4rem]">{about.title}</h2>
          <div className="mt-8 border-l-2 border-lime pl-6">
            <p className="eyebrow text-forest/60">{about.missionLabel}</p>
            <p className="mt-3 font-display text-2xl leading-snug text-forest">{about.text}</p>
            <p className="mt-4 text-lg text-muted">{about.missionCommitment}</p>
          </div>
          <p className="mt-8 text-forest">
            <span className="font-display text-xl">{about.signature.name}</span>
            <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-forest/60">{about.signature.line}</span>
          </p>
          <div>
            <Button href={about.cta.href} variant="forest" className="mt-9">
              {about.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
