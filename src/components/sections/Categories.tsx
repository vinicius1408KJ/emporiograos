import {
  ArrowRight,
  Cherry,
  ChefHat,
  Cookie,
  Dumbbell,
  Flower2,
  HeartPulse,
  Leaf,
  Nut,
  Pill,
  Sparkles,
  Sprout,
  Wheat,
  WheatOff,
  type LucideIcon,
} from "lucide-react";
import { categories, categoriesSection, type Category } from "@/config/site";
import { AutoCarousel } from "@/components/ui/AutoCarousel";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

const tints: Record<Category["tint"], string> = {
  mint: "bg-[#d9efd6]",
  sand: "bg-[#efe3c8]",
  honey: "bg-[#f6e2a8]",
  sage: "bg-[#dfe6c4]",
};

/** Formas orgânicas (nunca um círculo perfeito) atrás de cada foto. */
const blobs = [
  "rounded-[58%_42%_55%_45%/48%_56%_44%_52%]",
  "rounded-[44%_56%_47%_53%/55%_45%_55%_45%]",
  "rounded-[52%_48%_42%_58%/45%_52%_48%_55%]",
];

function CategoryItem({ category, index }: { category: Category; index: number }) {
  return (
    <article className="group px-3 text-center md:px-5">
      <div className="relative mx-auto aspect-square w-full max-w-56">
        <span
          aria-hidden
          className={`absolute inset-0 ${tints[category.tint]} ${blobs[index % blobs.length]} transition-transform duration-700 ease-soft group-hover:rotate-[24deg] group-hover:scale-105`}
        />
        <PhotoFrame
          photo={category.photo}
          tone="sand"
          sizes="(min-width: 1024px) 14rem, 42vw"
          className="!absolute inset-[7%] rounded-full shadow-[0_18px_40px_-22px_rgba(2,43,11,0.55)] ring-4 ring-white/70 transition-transform duration-500 ease-soft group-hover:-translate-y-1.5"
        />
      </div>
      <h3 className="mx-auto mt-6 max-w-48 text-xl leading-snug text-forest md:text-[1.35rem]">{category.name}</h3>
    </article>
  );
}

/** Ícone de cada linha de produto (nome igual ao de categoriesSection.productLines). */
const lineIcons: Record<string, LucideIcon> = {
  "Chás": Leaf,
  "Sementes": Sprout,
  "Oleaginosas": Nut,
  "Grãos": Wheat,
  "Temperos naturais": ChefHat,
  "Frutas desidratadas": Cherry,
  "Produtos naturais": Flower2,
  "Produtos funcionais": HeartPulse,
  "Produtos integrais": Cookie,
  "Sem glúten e sem lactose": WheatOff,
  "Suplementos alimentares": Dumbbell,
  "Vitaminas e minerais": Pill,
  "E muito mais...": Sparkles,
};

/** Uma volta da faixa: renderizada duas vezes para o loop ficar contínuo. */
function LinesRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 ${hidden ? "motion-reduce:hidden" : ""}`}>
      {categoriesSection.productLines.map((name) => {
        const Icon = lineIcons[name] ?? Leaf;
        return (
          // padding (e não gap) para o deslocamento de -50% fechar exato
          <li key={name} className="shrink-0 px-2 py-2">
            <span className="flex items-center gap-3 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-6 text-[0.95rem] font-semibold text-forest shadow-[0_10px_30px_-22px_rgba(2,43,11,0.6)] ring-1 ring-forest/10 transition duration-300 ease-soft hover:-translate-y-0.5 hover:ring-lime md:text-base">
              <span className="grid size-10 place-items-center rounded-full bg-mint text-forest">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Categories() {
  return (
    <section id="categorias" className="bg-cream py-20 md:py-28">
      <div className="container-site">
        <Reveal stagger className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl italic text-lime [-webkit-text-stroke:0.4px_var(--color-forest)]">{categoriesSection.eyebrow}</p>
          <h2 className="mt-3 text-4xl text-forest md:text-5xl">{categoriesSection.title}</h2>
          <p className="mt-4 text-lg text-muted">{categoriesSection.subtitle}</p>
        </Reveal>

        <Reveal variant="zoom" delay={250} className="mt-12 md:mt-16">
          <AutoCarousel label="Categorias de produtos" itemClass="basis-1/2 sm:basis-1/3 lg:basis-1/4" className="-mx-3 md:-mx-5">
            {categories.map((cat, i) => (
              <CategoryItem key={cat.id} category={cat} index={i} />
            ))}
          </AutoCarousel>
        </Reveal>

        <Reveal variant="left" delay={350} className="mt-10 md:mt-12">
          <div
            role="region"
            aria-label="Linhas de produtos"
            className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:no-scrollbar motion-reduce:overflow-x-auto"
          >
            <div
              className="flex w-max animate-marquee [animation-direction:reverse] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: "45s" }}
            >
              <LinesRow />
              <LinesRow hidden />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-12 text-center md:mt-14">
          <Button href={categoriesSection.cta.href} variant="forest">
            {categoriesSection.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
