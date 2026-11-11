"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  /** Largura de cada item (classes de basis), ex.: "basis-1/2 lg:basis-1/5" */
  itemClass: string;
  /** Tempo entre avanços automáticos, em ms */
  interval?: number;
  className?: string;
};

/**
 * Carrossel horizontal que avança sozinho.
 * - Pausa com mouse em cima, foco do teclado ou toque.
 * - Setas discretas + arrastar com o dedo (scroll-snap nativo).
 * - Com "reduzir movimento" ativado, não anda sozinho.
 */
export function AutoCarousel({ children, label, itemClass, interval = 2800, className = "" }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);

  const move = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    if (dir === 1 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 4) el.scrollTo({ left: max, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  /* Só anda sozinho quando está (quase todo) na tela. No Safari do iPhone, mover um
   * carrossel com snap fora da tela faz a PÁGINA rolar até ele — o site "pulava" para cá. */
  const visible = useRef(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (visible.current && !paused.current && !document.hidden) move(1);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, move]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);
  const arrow =
    "absolute top-[38%] z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-[0_8px_24px_-10px_rgba(2,43,11,0.45)] ring-1 ring-forest/10 backdrop-blur transition hover:bg-lime hover:text-deep active:scale-95";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      className={`relative ${className}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={pause}
      onTouchEnd={() => window.setTimeout(resume, 4000)}
    >
      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
        {Children.map(children, (child) => (
          <li className={`shrink-0 snap-start ${itemClass}`}>{child}</li>
        ))}
      </ul>
      <button type="button" onClick={() => move(-1)} aria-label="Anterior" className={`${arrow} left-0 xl:-left-14`}>
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button type="button" onClick={() => move(1)} aria-label="Próximo" className={`${arrow} right-0 xl:-right-14`}>
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}
