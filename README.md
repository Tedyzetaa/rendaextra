# Renda Extra com Clarinha — site refatorado

## Estrutura
```
rendaextra/
├── index.html            # página única
├── config.js             # GERADO automaticamente (não editar à mão)
├── scripts/
│   └── generate-config.js  # gera config.js a partir das env vars
├── .env.example           # modelo do arquivo .env
├── render.yaml             # config de deploy no Render (site estático)
└── img/
    ├── topo.jpg                 # banner do topo (hero)
    ├── prova-pagamento-pix.jpg  # print real de recebimento
    └── livro-capa-01..08.jpg    # capas usadas nos cards de livros
```

## Preço atual
O acesso ao grupo custa **R$25** (pagamento único). Isso já está
refletido em todos os textos da página (hero, seção do grupo, FAQ,
CTA final, barra mobile etc.).

## Trocar o link de compra (variável de ambiente)
O link para onde os botões "Entrar"/"Comprar" apontam **não fica mais
fixo na página** — ele vem de uma variável de ambiente chamada
`CHECKOUT_URL`, lida pelo script `scripts/generate-config.js`, que
gera o `config.js` automaticamente.

### No Render (produção)
1. No painel do serviço, vá em **Settings > Environment**.
2. Defina/edite a variável `CHECKOUT_URL` com o link real de compra
   (bot, checkout, grupo pago, etc.).
3. Opcional: `ENTRY_PRICE_BRL` (hoje `25`) caso queira reaproveitar
   esse valor em outro lugar do site futuramente.
4. Salve e faça um **Manual Deploy** (ou dê push no repositório) — o
   `render.yaml` já roda `node scripts/generate-config.js` como
   *Build Command* antes de publicar.

### Localmente (para testar antes de subir)
```bash
cp .env.example .env
# edite o .env e coloque o link real em CHECKOUT_URL
node scripts/generate-config.js
# abra o index.html normalmente — todos os 13 botões já vão apontar
# para o novo link
```

> `config.js` é **gerado automaticamente** — não edite esse arquivo
> direto, suas alterações serão sobrescritas no próximo build. Se
> quiser mudar o link sem usar env var (ex: para testes rápidos),
> edite `scripts/generate-config.js` (valor padrão) ou rode o script
> passando a variável na linha de comando:
> `CHECKOUT_URL="https://..." node scripts/generate-config.js`.

Todos os 13 botões "Entrar"/"Comprar" do site (header, hero, cards,
seção do grupo, resultados, FAQ, CTA final, footer e barra fixa
mobile) usam `data-cta="telegram"` e são atualizados automaticamente
— nenhum outro arquivo precisa ser tocado.

## Deploy no Render
1. Suba esta pasta para um repositório Git (GitHub/GitLab).
2. No Render, clique em **New > Blueprint** e aponte para o
   repositório — o `render.yaml` já configura o serviço como
   **Static Site**, com o build command que gera o `config.js`.
3. Configure a variável `CHECKOUT_URL` em Settings > Environment antes
   do primeiro deploy (ela está marcada como `sync: false`, ou seja,
   não vai junto no `render.yaml`/repositório).
4. Alternativamente, sem Blueprint: **New > Static Site**, defina
   *Build Command* como `node scripts/generate-config.js` e
   *Publish Directory* como `./`.

## Notas
- Os prints das seções "Prova de pagamento" e "Resultados" são
  ilustrativos — troque `img/prova-pagamento-pix.jpg` pelos seus
  comprovantes reais antes de publicar, como já indicado no texto da
  página.
- Todas as imagens foram comprimidas para carregamento rápido
  (~440 KB no total, vindas de ~10 MB nos arquivos originais).
- O arquivo `.env` nunca deve ser commitado (já está no `.gitignore`).
