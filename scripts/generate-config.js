#!/usr/bin/env node
/**
 * scripts/generate-config.js
 * ---------------------------------------------------------
 * Gera o arquivo config.js a partir de variáveis de ambiente,
 * para que o link de compra (e o preço) possam ser trocados
 * sem precisar editar a página nem o código.
 *
 * Uso no deploy (Render):
 *   Este script roda automaticamente como "Build Command"
 *   (já configurado em render.yaml). Basta definir a variável
 *   CHECKOUT_URL em Render > Settings > Environment e clicar
 *   em "Manual Deploy" (ou fazer um novo push).
 *
 * Uso local:
 *   1. cp .env.example .env
 *   2. edite o .env com o link real de compra
 *   3. node scripts/generate-config.js
 *   4. abra index.html normalmente
 */

const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const envPath = path.join(rootDir, ".env");

// Carrega o .env manualmente (sem dependências externas tipo "dotenv").
// Só usa o valor do .env se a variável ainda não vier definida pelo
// ambiente real (ex: painel do Render), que sempre tem prioridade.
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

// Valores padrão só entram em ação se a variável de ambiente não existir.
const CHECKOUT_URL = process.env.CHECKOUT_URL || "http://t.me/ClarinhaSenk";
const ENTRY_PRICE_BRL = process.env.ENTRY_PRICE_BRL || "25";

const output = `/**
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
  checkoutUrl: ${JSON.stringify(CHECKOUT_URL)},

  // Preço de referência exibido no site, em reais.
  entryPriceBRL: ${JSON.stringify(ENTRY_PRICE_BRL)}
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
`;

fs.writeFileSync(path.join(rootDir, "config.js"), output);
console.log("config.js gerado com sucesso.");
console.log("CHECKOUT_URL =", CHECKOUT_URL);
console.log("ENTRY_PRICE_BRL =", ENTRY_PRICE_BRL);
