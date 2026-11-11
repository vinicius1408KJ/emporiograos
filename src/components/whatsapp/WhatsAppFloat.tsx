"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { site, stores } from "@/config/site";
import { storeTitle, whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { useWhatsApp } from "./WhatsAppProvider";

/**
 * Botão flutuante + seletor de unidade.
 * O WhatsApp NUNCA abre direto: o visitante escolhe a loja primeiro.
 * Fecha no X, ao clicar fora e com Esc.
 */
export function WhatsAppFloat() {
  const { isOpen, close, toggle } = useWhatsApp();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [isOpen, close]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[90] animate-fade bg-deep/55 backdrop-blur-[2px]" onClick={close} aria-hidden />
      )}

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[100] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        {isOpen && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-title"
            className="w-[min(24rem,calc(100vw-2rem))] origin-bottom-right animate-rise overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_30px_80px_-20px_rgba(2,43,11,0.55)] ring-1 ring-forest/10"
          >
            <div className="flex items-start justify-between gap-4 bg-forest px-6 pb-5 pt-6 text-cream">
              <div>
                <p className="eyebrow text-lime">WhatsApp</p>
                <h2 id="wa-title" className="mt-2 text-2xl">
                  Com qual unidade você quer falar?
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                data-autofocus
                aria-label="Fechar"
                className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full transition hover:bg-cream/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="p-3">
              {stores.map((store) => {
                const href = whatsappLink(store);
                const label = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-forest transition group-hover:bg-lime group-hover:text-deep">
                      <WhatsAppIcon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">{site.name}</span>
                      <span className="block font-display text-xl leading-tight text-forest">{store.shortName}</span>
                    </span>
                  </>
                );
                return (
                  <li key={store.id}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        aria-label={`Abrir WhatsApp: ${storeTitle(store)}`}
                        className="group flex min-h-16 items-center gap-4 rounded-2xl px-3 py-2.5 transition hover:bg-white"
                      >
                        {label}
                        <ArrowUpRight className="size-5 text-forest/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest" />
                      </a>
                    ) : (
                      <div aria-disabled="true" className="flex min-h-16 items-center gap-4 rounded-2xl px-3 py-2.5 opacity-60">
                        {label}
                        <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                          Em breve
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar seletor de unidades" : "Falar pelo WhatsApp — escolher unidade"}
          className="group relative grid size-14 place-items-center rounded-full bg-lime text-deep shadow-[0_14px_36px_-10px_rgba(2,43,11,0.6)] transition duration-200 ease-soft hover:scale-105 active:scale-95 md:size-16"
        >
          {!isOpen && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-lime/40 [animation-duration:2.8s]" />}
          {isOpen ? <X className="relative size-6" /> : <WhatsAppIcon className="relative size-7" />}
        </button>
      </div>
    </>
  );
}
