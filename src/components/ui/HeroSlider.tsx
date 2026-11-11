"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  /** Tempo de cada slide na tela, em ms */
  interval?: number;
};

/**
 * Alterna os heros com fade, no mesmo espaço (empilhados via grid).
 * - Pausa com mouse em cima, foco do teclado ou toque; pausa com a aba oculta.
 * - Com "reduzir movimento" ativado, não troca sozinho.
 */
export function HeroSlider({ children, label, interval = 7000 }: Props) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const go = useCallback((i: number) => setActive((i + total) % total), [total]);

  useEffect(() => {
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) setActive((a) => (a + 1) % total);
    }, interval);
    return () => window.clearInterval(id);
    // reinicia a contagem sempre que o slide muda (inclusive por clique)
  }, [interval, total, active]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);
  const arrow =
    "hidden size-10 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/25 backdrop-blur transition hover:bg-lime hover:text-deep active:scale-95 md:grid";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      className="relative grid grid-cols-1 overflow-hidden bg-deep"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={pause}
      onTouchEnd={() => window.setTimeout(resume, 4000)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} de ${total}`}
          aria-hidden={i !== active}
          inert={i !== active}
          className={`min-w-0 [grid-area:1/1] transition-opacity ease-soft ${i === active ? "z-10 opacity-100 duration-700 delay-300" : "pointer-events-none z-0 opacity-0 duration-300"}`}
        >
          {slide}
        </div>
      ))}

      {total > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2.5">
            <button type="button" onClick={() => go(active - 1)} aria-label="Slide anterior" className={`${arrow} mr-2`}>
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-lime" : "w-2.5 bg-cream/40 hover:bg-cream/70"}`}
              />
            ))}
            <button type="button" onClick={() => go(active + 1)} aria-label="Próximo slide" className={`${arrow} ml-2`}>
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
