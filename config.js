/**
 * config.js — ARQUIVO GERADO AUTOMATICAMENTE, NÃO EDITE À MÃO
 * ---------------------------------------------------------
 * Gerado por scripts/generate-config.js a partir das variáveis
 * de ambiente CHECKOUT_URL e ENTRY_PRICE_BRL.
 *
 * Para trocar o link de compra ou o preço:
 *   - No Render: vá em Settings > Environment, atualize CHECKOUT_URL
 *     (e/ou ENTRY_PRICE_BRL) e faça um novo deploy.
 *   - Localmente: edite o arquivo .env e rode
 *     "node scripts/generate-config.js" de novo.
 *
 * Qualquer edição manual feita direto aqui será perdida no próximo build.
 */
window.SITE_CONFIG = {
  // Link único usado em todos os CTAs do site (header, hero, cards,
  // seção do grupo, resultados, FAQ, CTA final, footer e barra mobile).
  checkoutUrl: "https://t.me/rendaextradaclarinha_bot",

  // Preço de referência exibido no site, em reais.
  entryPriceBRL: "25"
};

(function applySiteConfig() {
  function apply() {
    var cfg = window.SITE_CONFIG || {};
    if (cfg.checkoutUrl) {
      document.querySelectorAll('[data-cta="telegram"]').forEach(function (el) {
        el.setAttribute("href", cfg.checkoutUrl);
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
