import Image from "next/image";
import Link from "next/link";
import { HOME, site } from "@/config/site";

type Props = { variant?: "horizontal" | "vertical"; size?: "md" | "lg"; asLink?: boolean; className?: string };

const heights = {
  horizontal: { md: "h-11 md:h-12", lg: "h-14 md:h-16" },
  vertical: { md: "h-24", lg: "h-32 md:h-36" },
};

/**
 * Logo oficial da marca (versão para fundo escuro).
 * Quando é link, SEMPRE leva para /inicial.
 */
export function Logo({ variant = "horizontal", size = "md", asLink = true, className = "" }: Props) {
  const logo = site.logo[variant];
  const mark = (
    <Image src={logo.src} alt={site.name} width={logo.width} height={logo.height} priority className={`w-auto ${heights[variant][size]}`} />
  );

  if (!asLink) return <div className={className}>{mark}</div>;
  return (
    <Link href={HOME} aria-label={`${site.name} — página inicial`} className={`inline-flex min-h-11 items-center ${className}`}>
      {mark}
    </Link>
  );
}
