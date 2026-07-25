/**
 * config.js — ponto único de configuração do site
 * ---------------------------------------------------------
 * Para trocar o link de CTA (grupo do Telegram / checkout),
 * edite APENAS a linha abaixo. Todo botão marcado com
 * data-cta="telegram" no HTML será atualizado automaticamente.
 */
window.SITE_CONFIG = {
  // Link único usado em todos os CTAs do site (header, hero, cards,
  // seção do grupo, resultados, FAQ, CTA final, footer e barra mobile).
  telegramGroupUrl: "https://t.me/+IFV_XvKdUKwyMDZh",

  // Preço de referência exibido no site (0 = gratuito, como hoje).
  // Mantenha sincronizado com o que está prometido no texto da página:
  // se isso mudar para um valor > 0, revise também as seções que
  // afirmam "100% gratuito" para não gerar informação conflitante.
  entryPriceBRL: 0
};

(function applySiteConfig() {
  function apply() {
    var cfg = window.SITE_CONFIG || {};
    if (cfg.telegramGroupUrl) {
      document.querySelectorAll('[data-cta="telegram"]').forEach(function (el) {
        el.setAttribute("href", cfg.telegramGroupUrl);
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
