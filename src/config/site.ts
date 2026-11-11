/**
 * ─────────────────────────────────────────────────────────────
 *  EMPÓRIO GRÃOS & FOLHAS — CONFIGURAÇÃO CENTRAL
 * ─────────────────────────────────────────────────────────────
 *  Tudo que é informação comercial ou conteúdo editável mora aqui.
 *  Nenhum componente guarda telefone, endereço, link ou texto de marca.
 *
 *  REGRA DOS PLACEHOLDERS
 *  - Campo vazio ("") = informação ainda não enviada pela empresa.
 *    O site mostra "A confirmar" e desativa o botão correspondente.
 *  - Foto sem `src` = o site mostra um quadro identificado "Foto · ...".
 *    Para trocar: coloque o arquivo em /public/images e preencha o `src`.
 *  - As fotos com endereço images.unsplash.com são DEMONSTRATIVAS
 *    (banco Unsplash, uso comercial liberado). Troque pelas fotos oficiais.
 *
 *  Futuro CMS/Supabase: basta trocar estes objetos por uma função que
 *  busca os mesmos formatos (os tipos abaixo já servem de contrato).
 */

export type Photo = {
  /** Caminho em /public (ex.: "/images/hero.jpg") ou URL liberada no next.config */
  src?: string;
  alt: string;
  /** Texto do quadro enquanto a foto oficial não chega */
  slot: string;
  /** Ponto de foco no recorte (object-position), ex.: "50% 40%". Padrão: centro. */
  position?: string;
};

export type Store = {
  id: string;
  /** Nome curto usado no seletor de WhatsApp */
  shortName: string;
  city: string;
  state: string;
  address: string;
  hours: string;
  /** Telefone para exibição, ex.: "(99) 99999-9999" */
  phoneDisplay: string;
  /** Só números com DDI+DDD, ex.: "5599999999999" */
  whatsapp: string;
  /** Link exato do Google Maps (opcional). Sem ele, o site busca por nome + cidade. */
  mapsUrl: string;
  photo: Photo;
};

export type Category = { id: string; name: string; photo: Photo; tint: "mint" | "sand" | "honey" | "sage" };
/** onDark: logo clara (branca/cinza) que precisa de fundo escuro para aparecer */
/** bg: logo com fundo próprio (quadrada/colorida) — o cartão assume essa cor e a imagem ocupa a altura toda */
export type Brand = { name: string; logo?: string; width?: number; height?: number; onDark?: boolean; bg?: string };
/* ───────────── MARCA ───────────── */

export const site = {
  name: "Empório Grãos & Folhas",
  shortName: "Grãos & Folhas",
  url: "https://emporiograos.com.br",
  tagline: "Produtos naturais, grãos, suplementos e alimentos saudáveis.",
  description:
    "Rede de lojas de produtos naturais, grãos, suplementos e alimentos funcionais no sul do Maranhão. Três unidades: São Raimundo das Mangabeiras, Riachão e Fortaleza dos Nogueiras.",
  /**
   * Logos oficiais (extraídas do PDF da marca, versões para fundo escuro).
   * horizontal: cabeçalho e rodapé · vertical: página de links (/).
   */
  logo: {
    horizontal: { src: "/images/marca/logo-horizontal.svg", width: 661, height: 193 },
    vertical: { src: "/images/marca/logo-vertical.svg", width: 659, height: 401 },
  },
  /** Mensagem que já vem escrita quando o cliente abre o WhatsApp */
  whatsappMessage: "Olá! Vim pelo site do Empório Grãos & Folhas.",
  utilityBar: "São Raimundo das Mangabeiras · Riachão · Fortaleza dos Nogueiras — MA",
} as const;

/* ───────────── REDES SOCIAIS ─────────────
 * Preencha com o link completo. Vazio = o ícone não aparece. */
export const social = {
  instagram: "https://www.instagram.com/emporiograosefolhas/",
  facebook: "",
  tiktok: "",
} as const;

/* ───────────── NAVEGAÇÃO ───────────── */
export const HOME = "/inicial";

export const nav = [
  { label: "Sobre nós", href: `${HOME}#sobre` },
  { label: "Nossa Nutri", href: `${HOME}#nutri` },
  { label: "Lojas", href: `${HOME}#lojas` },
  { label: "Marcas", href: `${HOME}#marcas` },
  { label: "Contato", href: `${HOME}#contato` },
] as const;

/* ───────────── LOJAS ───────────── */
/** Horário padrão das unidades. Cada linha (\n) aparece em uma linha no card.
 * Se uma loja tiver horário diferente, troque STORE_HOURS pelo texto dela. */
const STORE_HOURS = "Segunda a sexta: 08h às 12h e 14h às 18h\nSábado: 08h às 12h";

export const stores: Store[] = [
  {
    id: "mangabeiras",
    shortName: "Mangabeiras",
    city: "São Raimundo das Mangabeiras",
    state: "MA",
    address: "Praça do Mercado, 21 · Centro · CEP 65840-000",
    hours: STORE_HOURS,
    phoneDisplay: "(99) 98466-4698",
    whatsapp: "5599984664698",
    mapsUrl: "",
    photo: { src: "/images/lojas/mangabeiras.jpg", alt: "Fachada da unidade de São Raimundo das Mangabeiras", slot: "Foto · Loja Mangabeiras", position: "50% 58%" },
  },
  {
    id: "riachao",
    shortName: "Riachão",
    city: "Riachão",
    state: "MA",
    address: "Rua Alfredo Assis, 28 · Centro · CEP 65990-000",
    hours: STORE_HOURS,
    phoneDisplay: "(99) 98478-7729",
    whatsapp: "5599984787729",
    mapsUrl: "https://www.google.com/maps?q=-7.363465309143066,-46.621925354003906&z=17&hl=pt-BR",
    photo: { src: "/images/lojas/riachao.jpg", alt: "Fachada da unidade de Riachão", slot: "Foto · Loja Riachão" },
  },
  {
    id: "fortaleza-dos-nogueiras",
    shortName: "Fortaleza dos Nogueiras",
    city: "Fortaleza dos Nogueiras",
    state: "MA",
    address: "Rua José Sarney, loja 01 · Centro · CEP 65805-000",
    hours: STORE_HOURS,
    phoneDisplay: "(99) 98454-4385",
    whatsapp: "5599984544385",
    mapsUrl: "https://www.google.com/maps?q=-6.965831756591797,-46.17271041870117&z=17&hl=pt-BR",
    photo: { src: "/images/lojas/fortaleza-dos-nogueiras.jpg", alt: "Fachada da unidade de Fortaleza dos Nogueiras", slot: "Foto · Loja Fortaleza dos Nogueiras" },
  },
];

/** Monta o endereço de uma foto demonstrativa do Unsplash. */
const demo = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ───────────── HERO ───────────── */
export const hero = {
  eyebrow: "Empório de produtos naturais",
  title: "Qual seu estilo de alimentação?",
  text: "Descubra um universo de sabores, qualidade e bem-estar. Tudo para acompanhar suas escolhas e transformar sua rotina.",
  primaryCta: { label: "Conheça nossas lojas", href: `${HOME}#lojas` },
  secondaryCta: { label: "Explore nossos produtos", href: `${HOME}#categorias` },
  photo: { src: demo("1543158181-1274e5362710", 2400), alt: "Castanhas, nozes, pistaches e frutas secas", slot: "Foto · Hero principal" } as Photo,
};

/* ───────────── CATEGORIAS ───────────── */
export const categoriesSection = {
  eyebrow: "Nossos produtos",
  title: "Qual seu estilo de alimentação?",
  subtitle: "Oferecemos uma linha completa de produtos naturais para quem busca equilíbrio e bem-estar!",
  cta: { label: "Conheça nossos produtos", href: `${HOME}#lojas` },
  /** Segunda fileira (faixa que rola sozinha). Para trocar o ícone, veja Categories.tsx. */
  productLines: [
    "Chás",
    "Sementes",
    "Oleaginosas",
    "Grãos",
    "Temperos naturais",
    "Frutas desidratadas",
    "Produtos naturais",
    "Produtos funcionais",
    "Produtos integrais",
    "Sem glúten e sem lactose",
    "Suplementos alimentares",
    "Vitaminas e minerais",
    "E muito mais...",
  ],
};

export const categories: Category[] = [
  { id: "funcionais", name: "Produtos Funcionais", tint: "sand", photo: { src: demo("1587049352851-8d4e89133924", 640), alt: "Pote de mel", slot: "Foto · Funcionais e apícolas" } },
  { id: "graos", name: "Grãos", tint: "sage", photo: { src: demo("1542990253-a781e04c0082", 640), alt: "Grãos e feijões variados", slot: "Foto · Grãos e cereais" } },
  { id: "suplementos", name: "Suplementos Alimentares", tint: "mint", photo: { src: demo("1693996045899-7cf0ac0229c7", 640), alt: "Pote de suplemento em pó com medidor", slot: "Foto · Suplementos" } },
  { id: "diet", name: "Sem Glúten e Sem Lactose", tint: "sand", photo: { src: demo("1686182689848-283fdd34e72f", 640), alt: "Tigela de granola sobre mesa de madeira", slot: "Foto · Diet e sem glúten" } },
];

/* ───────────── MARCAS ─────────────
 * Nova marca: salve a logo em public/images/marcas e adicione
 * { name: "Nome", logo: "/images/marcas/nome.svg", width, height } (tamanho original da imagem).
 * Logo branca/clara? acrescente onDark: true. A faixa rola sozinha e se ajusta à quantidade. */
export const brandsSection = {
  title: "Marcas que fazem parte da nossa história",
  subtitle: "Trabalhamos com as principais marcas do mercado.",
};

export const brands: Brand[] = [
  { name: "Vitafor", logo: "/images/marcas/vitafor.png", width: 201, height: 62, onDark: true },
  { name: "Equaliv", logo: "/images/marcas/equaliv.svg", width: 1920, height: 1080 },
  { name: "True", logo: "/images/marcas/true.svg", width: 200, height: 74 },
  { name: "Adaptogen", logo: "/images/marcas/adaptogen.svg", width: 242, height: 33 },
  { name: "Shark Pro", logo: "/images/marcas/shark-pro.png", width: 329, height: 197 },
  { name: "Nutrata", logo: "/images/marcas/nutrata.png", width: 221, height: 38, onDark: true },
  { name: "Flora Nativa do Brasil", logo: "/images/marcas/flora-nativa.png", width: 200, height: 150, bg: "#f6f1c9" },
  { name: "União Vegetal", logo: "/images/marcas/uniao-vegetal.png", width: 1080, height: 597 },
  { name: "Moderação", logo: "/images/marcas/moderacao.png", width: 400, height: 400 },
  { name: "Veganutris", logo: "/images/marcas/veganutris.png", width: 918, height: 308 },
  { name: "Puro & Leve", logo: "/images/marcas/puro-e-leve.png", width: 250, height: 250 },
];

/* ───────────── SOBRE ───────────── */
export const about = {
  eyebrow: "Sobre nós",
  title: "Muito além de uma loja, um conceito de vida saudável.",
  /** Missão oficial (também usada como descrição da página /sobre no Google) */
  missionLabel: "Nossa missão",
  text: "Inspirar escolhas mais saudáveis e promover qualidade de vida, oferecendo produtos selecionados com excelência, ética e responsabilidade.",
  missionCommitment: "Nosso compromisso é transformar cada atendimento em uma experiência de cuidado, confiança e bem-estar.",
  signature: { name: "Grãos & Folhas", line: "Sua loja saudável completa." },
  cta: { label: "Conheça nossa história", href: "/sobre" },
  /** Parágrafos da página /sobre. Vazio = aviso de "história em breve". */
  story: [] as string[],
  photo: { src: demo("1705475388190-775066fd69a5", 1400), alt: "Grãos e cereais variados em bandejas", slot: "Foto · Interior da loja" } as Photo,
  photoDetail: { src: demo("1543208541-0961a29a8c3d", 700), alt: "Sementes variadas", slot: "Foto · Produtos" } as Photo,
};

/* ───────────── NOSSA NUTRI ─────────────
 * Nada aqui é inventado: bio, formação e CRN só aparecem quando preenchidos. */
export const nutri = {
  eyebrow: "Nossa Nutri",
  name: "Wilmara Cavalcanti",
  role: "Nutricionista · Fundadora",
  crn: "CRN 1930",
  bio: [
    "Na Grãos & Folhas, cuidar da sua saúde é o nosso propósito.",
    "Fundada pela nutricionista Wilmara Cavalcanti, com mais de 20 anos de formação e especialização em Nutrição Clínica, Funcional, Esportiva e Fitoterápica, nossa marca nasceu do compromisso de unir conhecimento, qualidade e bem-estar.",
    "Nosso diferencial está em oferecer não apenas produtos criteriosamente selecionados, mas também orientação nutricional especializada, promovendo escolhas mais conscientes, responsáveis e seguras, respeitando as necessidades individuais de cada cliente.",
    "Aqui, a ciência orienta, a qualidade é compromisso e o cuidado faz parte da nossa essência.",
  ],
  /** Fecho em destaque, logo abaixo da bio */
  signature: "Grãos & Folhas: sua loja saudável completa.",
  credentials: ["+20 anos de formação", "Nutrição Clínica", "Nutrição Funcional", "Nutrição Esportiva", "Fitoterapia"],
  /** Frase em destaque da seção */
  message: "Uma loja criada por quem entende de nutrição e acredita que cuidar de pessoas vai muito além de vender produtos.",
  /** Botão de contato/orientação. href vazio = botão não aparece. */
  cta: { label: "Falar com a Nutri", href: "" },
  photo: { src: "/images/nutri/wilmara-cavalcanti.jpg", alt: "Retrato de Wilmara Cavalcanti, nutricionista e fundadora da Grãos & Folhas", slot: "Foto · Retrato Wilmara Cavalcanti", position: "50% 20%" } as Photo,
};

/* ───────────── LOJAS (seção) ───────────── */
export const storesSection = {
  eyebrow: "Nossas lojas",
  title: "Uma experiência de bem-estar perto de você.",
  subtitle: "Três unidades no sul do Maranhão. Escolha a mais próxima e fale direto com a equipe.",
};

/* ───────────── FOOTER ───────────── */
export const footer = {
  about: "Produtos naturais, grãos, suplementos e alimentos saudáveis, com atendimento de quem conhece o que vende.",
  links: [
    { label: "Sobre nós", href: `${HOME}#sobre` },
    { label: "Nossa Nutri", href: `${HOME}#nutri` },
    { label: "Nossas lojas", href: `${HOME}#lojas` },
      { label: "Marcas", href: `${HOME}#marcas` },
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
  ],
};
