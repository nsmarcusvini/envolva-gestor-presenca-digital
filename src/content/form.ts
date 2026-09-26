import type { PlanId } from "./plans";

/** Textos e opções do formulário de diagnóstico. */
export const leadForm = {
  index: "09",
  eyebrow: "Diagnóstico",
  title: "Vamos envolver *seu negócio*?",
  sub: "Conte um pouco sobre sua empresa. A Envolva AI entende o cenário e mostra como sua presença digital pode evoluir.",
  duration: "Leva menos de 2 minutos.",
  whatsappAlt: "Prefere conversar agora?",
  whatsappAltCta: "Chamar no WhatsApp",

  groups: {
    you: "Sobre você",
    business: "Sobre o negócio",
    needs: "O que precisa de atenção",
  },

  fields: {
    nome: { label: "Seu nome", placeholder: "Como podemos te chamar?", error: "Conta pra gente o seu nome." },
    empresa: { label: "Empresa", placeholder: "Nome do negócio", error: "Qual é o nome da empresa?" },
    whatsapp: { label: "WhatsApp", placeholder: "(11) 90000-0000", error: "Confere o WhatsApp — com DDD." },
    presenca: { label: "Instagram ou site", placeholder: "@seunegocio ou seusite.com.br", hint: "Opcional" },
    segmento: { label: "Segmento", placeholder: "Selecione" },
    plano: { label: "Plano de interesse" },
    desafios: { label: "O que mais precisa de atenção hoje?", hint: "Pode marcar mais de um" },
    dor: {
      label: "Existe alguma dor específica no seu negócio que você gostaria de resolver?",
      placeholder: "Ex.: perco tempo respondendo as mesmas perguntas no WhatsApp…",
      hint: "Opcional — mas é aqui que nasce o Sob medida.",
    },
  },

  segments: [
    "Alimentação",
    "Beleza e estética",
    "Saúde e bem-estar",
    "Comércio e varejo",
    "Serviços",
    "Educação",
    "Outro",
  ],

  planOptions: [
    { value: "presente", label: "Presente" },
    { value: "conectado", label: "Conectado" },
    { value: "envolvido", label: "Envolvido" },
    { value: "sob-medida", label: "Sob medida" },
    { value: "indefinido", label: "Ainda não sei" },
  ] as { value: PlanId | "indefinido"; label: string }[],

  challenges: ["Google", "Site", "Instagram", "Conteúdo", "Automação", "Tudo isso"],

  consent: "Ao enviar, você concorda com a",
  consentLink: { label: "Política de privacidade", href: "/privacidade" },
  submit: "Enviar e solicitar diagnóstico",
  submitting: "Enviando…",
  genericError: "Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.",

  success: {
    title: (firstName: string) => `Recebido, ${firstName}.`,
    body: (company: string) =>
      `A Envolva AI vai analisar o cenário ${company ? `de ${company}` : "do seu negócio"} e falar com você pelo WhatsApp.`,
    again: "Enviar outra resposta",
  },
};
