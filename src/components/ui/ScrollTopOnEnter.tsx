"use client";

import { useEffect } from "react";

/**
 * Ao entrar na página inicial (ex.: botão "Acessar o site" na página de links),
 * vai direto para o topo (hero), sem animação. Se o link tiver #seção
 * (ex.: /inicial#lojas, vindo de outra página), respeita e não mexe.
 */
export function ScrollTopOnEnter() {
  useEffect(() => {
    if (location.hash) return;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, []);
  return null;
}
