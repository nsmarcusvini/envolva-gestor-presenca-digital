import type { PaymentPref } from "./payment";

/** Textos e opções do formulário de avaliação. */
export const leadForm = {
  index: "09",
  eyebrow: "Avaliação",
  title: "Vamos envolver *seu negócio*?",
  sub: "Conte como sua empresa funciona hoje. A Envolva AI avalia, monta um orçamento sob medida e apresenta as formas de pagamento — inclusive parcelado até o software ser seu.",
  duration: "Leva menos de 2 minutos.",
  whatsappAlt: "Prefere conversar agora?",
  whatsappAltCta: "Chamar no WhatsApp",

  groups: {
    you: "Sobre você",
    business: "Sobre a empresa",
    needs: "O que precisa resolver",
  },

  fields: {
    nome: { label: "Seu nome", placeholder: "Como podemos te chamar?", error: "Conta pra gente o seu nome." },
    empresa: { label: "Empresa", placeholder: "Nome da empresa", error: "Qual é o nome da empresa?" },
    whatsapp: { label: "WhatsApp", placeholder: "(11) 90000-0000", error: "Confere o WhatsApp — com DDD." },
    presenca: { label: "Site ou Instagram", placeholder: "seusite.com.br ou @suaempresa", hint: "Opcional" },
    segmento: { label: "Segmento", placeholder: "Selecione" },
    pagamento: { label: "Como prefere pagar?", hint: "Você decide depois de ver o orçamento" },
    desafios: { label: "O que você quer resolver?", hint: "Pode marcar mais de um" },
    dor: {
      label: "Como esse processo funciona hoje?",
      placeholder: "Ex.: os pedidos chegam pelo WhatsApp, vão para uma planilha e sempre algo se perde…",
      hint: "Opcional — mas quanto mais detalhe, mais preciso o orçamento.",
    },
  },

  segments: [
    "Comércio e varejo",
    "Serviços",
    "Indústria",
    "Alimentação",
    "Saúde e bem-estar",
    "Educação",
    "Logística e transporte",
    "Outro",
  ],

  paymentOptions: [
    { value: "parcelado", label: "Parcelado até ser meu" },
    { value: "a-vista", label: "À vista" },
    { value: "indefinido", label: "Quero entender as opções" },
  ] as { value: PaymentPref; label: string }[],

  challenges: [
    "Gestão e controles",
    "Automação de tarefas",
    "Integração entre sistemas",
    "App ou portal",
    "Relatórios e painéis",
    "Ainda não sei",
  ],

  consent: "Ao enviar, você concorda com a",
  consentLink: { label: "Política de privacidade", href: "/privacidade" },
  submit: "Enviar e solicitar avaliação",
  submitting: "Enviando…",
  genericError: "Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.",

  success: {
    title: (firstName: string) => `Recebido, ${firstName}.`,
    body: (company: string) =>
      `A Envolva AI vai avaliar o cenário ${company ? `de ${company}` : "da sua empresa"} e falar com você pelo WhatsApp para montar o orçamento.`,
    again: "Enviar outra resposta",
  },
};
