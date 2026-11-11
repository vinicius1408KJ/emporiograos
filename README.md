# Empório Grãos & Folhas — site oficial

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Lucide React

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Rotas

| Rota | O que é |
|---|---|
| `/` | Página de acesso (link da bio): site, 3 unidades, WhatsApp, mapas, redes |
| `/inicial` | Site institucional (home) |
| `/sobre` | História da empresa |
| `/politica-de-privacidade` | Modelo — revisar antes de publicar |
| `/sitemap.xml`, `/robots.txt` | SEO |

Logo e "Início" sempre levam para `/inicial`. Nada no site institucional aponta para `/`.

## Onde trocar conteúdo: `src/config/site.ts`

Um arquivo só. Campo vazio = o site mostra "A confirmar" e desativa o botão.

**Checklist do que falta receber da empresa**

- [ ] Logo oficial → `site.logo.src` (arquivo em `/public/images`)
- [ ] Por loja: `address`, `hours`, `phoneDisplay`, `whatsapp` (só números, com 55 + DDD), `mapsUrl`
- [ ] Instagram e outras redes → `social`
- [ ] Fotos oficiais (hero, 7 categorias, sobre, lojas, nutri) → campo `photo.src` de cada item
- [ ] Logos das marcas → `brands` (`{ name, logo, width, height }`)
- [ ] Nutri Mara Cavalcanti: foto, `bio`, `credentials`, `crn`, `cta.href`
- [ ] História oficial → `about.story`
- [ ] Favicon e imagem de compartilhamento oficiais (`src/app/icon.svg`, `src/app/opengraph-image.tsx`)

**Fotos demonstrativas:** hero, categorias e "sobre" usam fotos do Unsplash (uso comercial liberado), carregadas pela internet. São provisórias. Lojas e nutricionista ficam com espaço reservado até chegarem as fotos reais.

**Fotos oficiais:** coloque em `/public/images/...` e preencha `src: "/images/arquivo.jpg"`.
O `next/image` gera AVIF/WebP e tamanhos responsivos sozinho.

## Estrutura

```
src/
  config/site.ts        ← todo o conteúdo e dados comerciais
  lib/links.ts          ← monta links de WhatsApp e Google Maps
  app/                  ← rotas, SEO (sitemap, robots, OG, favicon)
  components/
    ui/                 ← Button, Logo, PhotoFrame, AutoCarousel, Reveal, ícones
    layout/             ← Header (2 barras), Footer, Newsletter
    sections/           ← Hero, Categories, Brands, About, Nutri, Stores
    whatsapp/           ← botão flutuante + seletor de unidade
```
