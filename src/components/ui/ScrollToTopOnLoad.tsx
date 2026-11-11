/**
 * Ao abrir ou recarregar o site, sempre começa no topo (hero) — inclusive no celular.
 *
 * Roda como script no <head>, antes da página aparecer, porque no celular o navegador
 * devolve a rolagem antiga DEPOIS que a página termina de carregar (fotos etc.).
 * - Desliga a restauração de rolagem do navegador.
 * - Remove o #seção da URL no carregamento, para o navegador não pular até ela.
 * - Volta ao topo de novo ao terminar de carregar e quando a página sai do cache
 *   (voltar no navegador, reabrir pelo Instagram/WhatsApp).
 * Só age no carregamento real: os cliques no menu (Sobre, Lojas...) continuam indo para a seção.
 */
const script = `(function(){
  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    var top = function(){ window.scrollTo(0, 0); };
    var html = document.documentElement;
    var instant = function(){ var b = html.style.scrollBehavior; html.style.scrollBehavior = "auto"; top(); html.style.scrollBehavior = b; };
    instant();
    document.addEventListener("DOMContentLoaded", instant, { once: true });
    window.addEventListener("load", function(){ instant(); setTimeout(instant, 0); }, { once: true });
    window.addEventListener("pageshow", function(e){ if (e.persisted) instant(); });
  } catch (e) {}
})();`;

export function ScrollToTopOnLoad() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
