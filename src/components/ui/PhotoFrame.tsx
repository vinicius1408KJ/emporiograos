import { ImageIcon } from "lucide-react";
import type { Photo } from "@/config/site";
import { SafeImage } from "./SafeImage";

type Tone = "deep" | "forest" | "moss" | "sand" | "oat" | "mint";

const tones: Record<Tone, { bg: string; fg: string }> = {
  deep: { bg: "bg-[#0a3a17]", fg: "text-cream/70" },
  forest: { bg: "bg-[#14522a]", fg: "text-cream/70" },
  moss: { bg: "bg-[#5d6b3a]", fg: "text-cream/80" },
  sand: { bg: "bg-sand", fg: "text-forest/55" },
  oat: { bg: "bg-oat", fg: "text-forest/65" },
  mint: { bg: "bg-[#cfe6cd]", fg: "text-forest/65" },
};

type Props = {
  photo: Photo;
  tone?: Tone;
  className?: string;
  imageClass?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Quadro de fotografia.
 * - Com `photo.src`: imagem otimizada (next/image).
 * - Sem `photo.src`: espaço reservado e identificado, pronto para receber a foto.
 * O pai define proporção e cantos via `className`.
 */
export function PhotoFrame({ photo, tone = "sand", className = "", imageClass = "", sizes = "100vw", priority }: Props) {
  const t = tones[tone];
  return (
    <div className={`relative isolate overflow-hidden ${t.bg} ${className}`}>
      {photo.src ? (
        <SafeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          className={`object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06] ${imageClass}`}
        />
      ) : (
        <div role="img" aria-label={`${photo.alt} (foto a ser enviada)`} className={`absolute inset-0 grid place-items-center ${t.fg}`}>
          <span className="flex max-w-[86%] flex-col items-center gap-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
            <ImageIcon className="size-6" strokeWidth={1.5} aria-hidden />
            {photo.slot}
          </span>
        </div>
      )}
    </div>
  );
}
