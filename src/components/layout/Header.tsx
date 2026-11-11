"use client";

import { MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HOME, nav, site } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useWhatsApp } from "@/components/whatsapp/WhatsAppProvider";

/**
 * Header em duas barras que funcionam como um único sistema:
 * transparente sobre o hero, verde profundo ao rolar.
 */
export function Header() {
  const pathname = usePathname();
  const { open: openWhatsApp } = useWhatsApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Só a /inicial tem hero escuro atrás do header
  const overHero = pathname === HOME;
  const solid = scrolled || !overHero || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-cream transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-soft ${
        solid ? "bg-deep/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md" : "bg-gradient-to-b from-deep/70 to-transparent"
      }`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-deep">
        Pular para o conteúdo
      </a>

      {/* Barra de utilidade */}
      <div className={`border-b border-cream/10 transition-[max-height,opacity] duration-500 ease-soft ${scrolled || menuOpen ? "max-h-0 overflow-hidden opacity-0 lg:max-h-12 lg:opacity-100" : "max-h-12"}`}>
        <div className="container-site flex h-10 items-center justify-between gap-4 text-[0.78rem] text-cream/80">
          <p className="flex min-w-0 items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-lime" aria-hidden />
            <span className="truncate md:hidden">3 unidades no sul do Maranhão</span>
            <span className="hidden truncate md:inline">{site.utilityBar}</span>
          </p>
          <div className="flex shrink-0 items-center">
            <SocialLinks itemClass="!size-9" className="hidden sm:flex" />
            <button type="button" onClick={openWhatsApp} className="flex h-10 items-center gap-2 pl-3 font-semibold transition hover:text-lime">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-full px-4 py-2.5 text-[0.92rem] font-medium text-cream/85 transition hover:bg-cream/10 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="-mr-2 grid size-12 place-items-center rounded-full transition hover:bg-cream/10 lg:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-deep lg:hidden"
      >
        <nav aria-label="Menu" className="container-site flex min-h-full flex-col pb-28 pt-4">
          <ul className="flex-1">
            {nav.map((item, i) => (
              <li key={item.href} className="animate-rise border-b border-cream/10" style={{ animationDelay: `${i * 40}ms` }}>
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-16 items-center justify-between font-display text-3xl">
                  {item.label}
                  <span aria-hidden className="text-sm text-lime">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SocialLinks className="-ml-3 mt-8" />
        </nav>
      </div>
    </header>
  );
}
