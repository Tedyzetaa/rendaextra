# Renda Extra com Clarinha — site refatorado

## Estrutura
```
rendafixa/
├── index.html      # página única
├── config.js       # ponto único de configuração (link do CTA)
├── render.yaml      # config de deploy no Render (site estático)
└── img/
    ├── topo.jpg                 # banner do topo (hero)
    ├── prova-pagamento-pix.jpg  # print real de recebimento
    └── livro-capa-01..08.jpg    # capas usadas nos cards de livros
```

## Trocar o link do CTA (grupo / checkout)
Edite **uma única linha** em `config.js`:

```js
window.SITE_CONFIG = {
  telegramGroupUrl: "https://t.me/SEU_LINK_AQUI",
  ...
};
```

Todos os 13 botões "Entrar no grupo" do site (header, hero, cards, seção
do grupo, resultados, FAQ, CTA final, footer e barra fixa mobile) são
atualizados automaticamente — nenhum outro arquivo precisa ser tocado.

> Importante: se o link levar a algo pago, ajuste também os textos que
> hoje dizem "100% gratuito" / "sem taxa de entrada" espalhados pela
> página (hero, seção do grupo, FAQ), para não haver contradição entre
> o que o site promete e o que o link realmente faz.

## Deploy no Render
1. Suba esta pasta para um repositório Git (GitHub/GitLab).
2. No Render, clique em **New > Blueprint** e aponte para o repositório
   — o `render.yaml` já configura o serviço como **Static Site**,
   sem build step (é HTML puro).
3. Alternativamente, sem Blueprint: **New > Static Site**, defina
   *Build Command* em branco e *Publish Directory* como `./`.

## Notas
- Os prints das seções "Prova de pagamento" e "Resultados" são
  ilustrativos — troque `img/prova-pagamento-pix.jpg` pelos seus
  comprovantes reais antes de publicar, como já indicado no texto da página.
- Todas as imagens foram comprimidas para carregamento rápido
  (~440 KB no total, vindas de ~10 MB nos arquivos originais).
