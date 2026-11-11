"use client";

import { useEffect } from "react";

/**
 * Ao abrir ou recarregar o site, sempre começa no topo (hero).
 * - Desliga a restauração de rolagem do navegador (que voltava para o meio da página).
 * - Remove o #seção da URL no carregamento, para o navegador não pular até ela.
 * Fica no layout raiz, então roda só no carregamento real da página: os cliques
 * no menu (Sobre, Lojas, Contato...) continuam levando para a seção normalmente.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
