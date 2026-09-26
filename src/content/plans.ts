/**
 * Planos. Para adicionar/remover um plano basta editar este array:
 * - planos com `variant: "column"` viram colunas comparáveis (o grid se ajusta à quantidade);
 * - planos com `variant: "row"` aparecem em linha larga abaixo das colunas (ex.: Sob medida);
 * - `highlight: true` destaca o plano recomendado (use em apenas um).
 *
 * Regra de negócio: a implantação NUNCA tem valor fixo — é sempre "sob consulta".
 */

export type PlanId = "presente" | "conectado" | "envolvido" | "sob-medida";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Mensalidade em reais. `null` = sob consulta. */
  monthly: number | null;
  setup: string;
  highlight?: boolean;
  badge?: string;
  variant: "column" | "row";
  /** Nome do plano anterior cujos itens estão inclusos ("Tudo do X, e mais:"). */
  includesFrom?: string;
  /** `note` aparece entre parênteses logo abaixo do detalhe (ex.: SITE_NOTE). */
  features: { title: string; detail: string; note?: string }[];
  cta: { label: string; href?: string };
};

export const SETUP_LABEL = "Implantação sob consulta";

/** Regra de negócio: todo item que envolve site é avaliado sob consulta. */
export const SITE_NOTE = "avaliar sob consulta pois exige criação/refatoração";

export const plans: Plan[] = [
  {
    id: "presente",
    name: "Presente",
    tagline: "Para ser encontrado por quem já está procurando você.",
    monthly: 397,
    setup: SETUP_LABEL,
    variant: "column",
    features: [
      { title: "Google", detail: "Perfil da Empresa configurado e otimizado: horários, fotos, categorias e respostas às avaliações." },
      { title: "Análise do Google", detail: "Relatório mensal com buscas, visualizações, ligações, rotas e cliques no site." },
      { title: "Site", detail: "Site de página única, profissional, com WhatsApp integrado.", note: SITE_NOTE },
      { title: "Manutenção do site", detail: "Atualização de textos, fotos e informações sempre que precisar.", note: SITE_NOTE },
    ],
    cta: { label: "Quero o Presente" },
  },
  {
    id: "conectado",
    name: "Conectado",
    tagline: "Para aparecer com constância no Google, no site e no Instagram.",
    monthly: 997,
    setup: SETUP_LABEL,
    highlight: true,
    badge: "Recomendado",
    variant: "column",
    includesFrom: "Presente",
    features: [
      { title: "Instagram", detail: "12 publicações por mês: 8 posts e 4 carrosséis, com criativos e legendas." },
      { title: "Calendário editorial", detail: "Planejamento mensal, aprovado por você antes de publicar." },
      { title: "Análise do site", detail: "Visitas, de onde vem o público e cliques no WhatsApp.", note: SITE_NOTE },
      { title: "Análise do Instagram", detail: "Alcance, seguidores e engajamento." },
    ],
    cta: { label: "Quero o Conectado" },
  },
  {
    id: "envolvido",
    name: "Envolvido",
    tagline: "Para ter tudo funcionando junto, sem você precisar pensar nisso.",
    monthly: 1797,
    setup: SETUP_LABEL,
    variant: "column",
    includesFrom: "Conectado",
    features: [
      { title: "Instagram ampliado", detail: "20 publicações por mês: 12 posts e 8 carrosséis." },
      { title: "Site completo", detail: "Várias páginas, com melhorias contínuas de SEO, velocidade e novas seções.", note: SITE_NOTE },
      { title: "Análise integrada", detail: "Google, site e Instagram lidos juntos, com recomendações práticas." },
      { title: "Automação mensal", detail: "1 automação nova por mês: WhatsApp, formulários, planilhas ou agendamento." },
      { title: "Acompanhamento contínuo", detail: "Atendimento prioritário e ajustes ao longo do mês." },
    ],
    cta: { label: "Quero o Envolvido" },
  },
  {
    id: "sob-medida",
    name: "Sob medida",
    tagline: "Para resolver uma dor específica do seu negócio.",
    monthly: null,
    setup: "Proposta personalizada",
    variant: "row",
    features: [
      { title: "Diagnóstico da necessidade", detail: "" },
      { title: "Proposta personalizada", detail: "" },
      { title: "Automação, integração ou projeto pontual", detail: "" },
    ],
    cta: { label: "Entender o Sob medida", href: "#sob-medida" },
  },
];

export const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);
