"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * up    → sobe e aparece (padrão)
 * left  → entra vindo da esquerda
 * right → entra vindo da direita
 * zoom  → cresce de leve e desfoca → foca
 * mask  → a imagem é "descoberta" de baixo para cima, com zoom saindo
 */
export type RevealVariant = "up" | "left" | "right" | "zoom" | "mask";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  /** Anima cada filho direto em sequência, em vez do bloco inteiro de uma vez. */
  stagger?: boolean;
};

/** Anima a entrada do conteúdo uma única vez, quando ele aparece na tela. */
export function Reveal({ children, delay = 0, className = "", variant = "up", stagger = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={stagger ? undefined : variant}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
