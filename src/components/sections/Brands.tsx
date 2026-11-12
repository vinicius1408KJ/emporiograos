import { brands, brandsSection, type Brand } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

function BrandCard({ brand }: { brand: Brand }) {
  const surface = brand.onDark
    ? "border-forest bg-forest hover:shadow-[0_18px_40px_-22px_rgba(2,43,11,0.7)]"
    : "border-oat/70 bg-white hover:border-forest/25 hover:shadow-[0_18px_40px_-26px_rgba(2,43,11,0.5)]";

  // bg + onDark: cor própria no cartão, mas logo com respiro (não ocupa a altura toda)
  const fullBleed = brand.bg && !brand.onDark;

  return (
    <div
      className={`relative grid h-28 place-items-center overflow-hidden rounded-2xl border transition duration-300 ease-soft hover:-translate-y-1 md:h-32 ${fullBleed ? (brand.bg?.toLowerCase() === "#ffffff" ? "border-oat/70" : "border-transparent") : brand.bg ? "border-transparent px-6 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)]" : `px-6 ${surface}`}`}
      style={brand.bg ? { backgroundColor: brand.bg } : undefined}
    >
      {brand.logo && fullBleed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.logo} alt={brand.name} width={brand.width} height={brand.height} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full object-contain" />
      ) : brand.logo ? (
        // <img> simples: aceita SVG e PNG mantendo a proporção original
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo}
          alt={brand.name}
          width={brand.width ?? 160}
          height={brand.height ?? 64}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto max-h-16 w-auto max-w-full object-contain md:max-h-[4.5rem]"
        />
      ) : (
        <span className="text-center text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-forest/40">
          {brand.name}
        </span>
      )}
    </div>
  );
}

/** Uma volta da lista: a faixa é renderizada duas vezes para o loop ficar contínuo. */
function BrandRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 ${hidden ? "motion-reduce:hidden" : ""}`}>
      {brands.map((b) => (
        // padding (e não gap) para o deslocamento de -50% fechar exato
        <li key={b.name} className="w-44 shrink-0 px-2.5 py-2 md:w-56 md:px-3">
          <BrandCard brand={b} />
        </li>
      ))}
    </ul>
  );
}

export function Brands() {
  // ~4s por marca: a velocidade fica igual com 8 ou 30 logos
  const duration = `${Math.max(brands.length * 4, 20)}s`;

  return (
    <section id="marcas" className="bg-white py-20 md:py-28">
      <div className="container-site">
        <Reveal stagger className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-forest/60">Marcas parceiras</p>
          <h2 className="mt-4 text-4xl text-forest md:text-5xl">{brandsSection.title}</h2>
          <p className="mt-4 text-lg text-muted">{brandsSection.subtitle}</p>
        </Reveal>
      </div>

      <Reveal variant="right" delay={250} className="mt-12 md:mt-14">
        <div
          role="region"
          aria-label="Marcas parceiras"
          className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:no-scrollbar motion-reduce:overflow-x-auto"
        >
          <div
            className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: duration }}
          >
            <BrandRow />
            <BrandRow hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
