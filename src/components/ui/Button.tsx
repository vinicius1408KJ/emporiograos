import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "forest" | "outline-light" | "outline-dark";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition duration-200 ease-soft active:scale-[0.97]";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-deep hover:bg-[#9bdd0f] hover:shadow-[0_10px_30px_-10px_rgba(139,207,0,0.7)]",
  forest: "bg-forest text-cream hover:bg-deep",
  "outline-light": "border border-cream/35 text-cream hover:border-cream hover:bg-cream/10",
  "outline-dark": "border border-forest/25 text-forest hover:border-forest hover:bg-forest/5",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export const buttonClass = (variant: Variant = "lime", className = "") => `${base} ${variants[variant]} ${className}`;

export function Button({ href, children, variant = "lime", external, className = "" }: Props) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** Botão visualmente inativo para informação ainda não enviada. */
export function PendingButton({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      aria-disabled="true"
      className={`${base} cursor-not-allowed border border-dashed ${tone === "dark" ? "border-forest/25 text-forest/45" : "border-cream/25 text-cream/50"} ${className}`}
    >
      {children}
    </span>
  );
}
