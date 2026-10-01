/**
 * Conteúdo global: marca, contatos, navegação e CTAs.
 * Textos marcados com *asteriscos* são renderizados em serifa itálica (ênfase editorial).
 */

const whatsappNumber = "5511943676301";
const whatsappMessage = "Olá! Quero uma avaliação de software sob medida.";

export const site = {
  name: "Envolva AI",
  slogan: "Envolva o Seu Negócio.",
  description:
    "A Envolva AI cria software sob medida para pequenas e médias empresas — com a opção de pagar em parcelas até o software ser 100% seu.",
  // PENDENTE: domínio oficial. Defina NEXT_PUBLIC_SITE_URL no ambiente (ex.: na Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    whatsapp: {
      display: "+55 11 94367-6301",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    },
    // PENDENTE: confirmar o @ — foi informado como "@envolavaai.en".
    instagram: {
      handle: "@envolavaai.en",
      href: "https://instagram.com/envolavaai.en",
    },
    // PENDENTE: e-mail oficial. Enquanto for null, o item não aparece.
    email: null as string | null,
  },

  nav: [
    { label: "Soluções", href: "#servicos" },
    { label: "Pagamento", href: "#pagamento" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Sob medida", href: "#sob-medida" },
  ],

  cta: {
    primary: { label: "Solicitar avaliação", href: "#contato" },
    secondary: { label: "Como funciona o pagamento", href: "#pagamento" },
  },

  legal: [
    { label: "Política de privacidade", href: "/privacidade" },
    { label: "Termos de uso", href: "/termos" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
