import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { HOME, about } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export const metadata: Metadata = {
  title: "Nossa história",
  description: about.text,
  alternates: { canonical: "/sobre" },
};

export default function AboutPage() {
  return (
    <article className="bg-cream pb-24 pt-40 md:pt-48">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-forest/60">Nossa história</p>
          <h1 className="mt-4 text-5xl text-forest md:text-6xl">{about.title}</h1>
          <div className="mt-8 max-w-xl border-l-2 border-lime pl-6">
            <p className="eyebrow text-forest/60">{about.missionLabel}</p>
            <p className="mt-3 font-display text-2xl leading-snug text-forest">{about.text}</p>
            <p className="mt-4 text-lg text-muted">{about.missionCommitment}</p>
          </div>
          {about.story.length > 0 && (
            <div className="mt-8 max-w-xl space-y-5 text-lg text-muted">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          <p className="mt-8 text-forest">
            <span className="font-display text-xl">{about.signature.name}</span>
            <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-forest/60">{about.signature.line}</span>
          </p>
          <Button href={`${HOME}#lojas`} variant="forest" className="mt-10">
            Conheça nossas lojas
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <PhotoFrame photo={about.photo} tone="moss" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2.5rem]" />
        </div>
      </div>
    </article>
  );
}
