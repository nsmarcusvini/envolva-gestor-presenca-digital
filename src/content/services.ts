/** Soluções exibidas na órbita da seção "A solução". Até 8 itens funcionam bem na órbita. */
export type Service = {
  id: string;
  name: string;
  description: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "sistemas",
    name: "Sistemas",
    description: "Gestão do jeito que a sua empresa opera: pedidos, estoque, clientes, ordens de serviço.",
    includes: ["Gestão", "Cadastros", "Controles"],
  },
  {
    id: "automacao",
    name: "Automação",
    description: "A tarefa repetida sai da mão da equipe e passa a acontecer sozinha.",
    includes: ["WhatsApp", "E-mails", "Planilhas", "Rotinas"],
  },
  {
    id: "integracoes",
    name: "Integrações",
    description: "Os sistemas que você já usa conversando entre si. A informação entra uma vez só.",
    includes: ["ERP", "Loja virtual", "APIs", "Nota fiscal"],
  },
  {
    id: "apps",
    name: "Apps e portais",
    description: "Área do cliente, app para a equipe de campo, agendamento online — no celular ou no navegador.",
    includes: ["Web", "Mobile", "Área do cliente"],
  },
  {
    id: "paineis",
    name: "Painéis",
    description: "Os números do negócio em uma tela, atualizados sozinhos, prontos para decidir.",
    includes: ["Indicadores", "Relatórios", "Tempo real"],
  },
  {
    id: "sites",
    name: "Sites",
    description: "Sites e plataformas conectados ao resto da operação, não uma vitrine isolada.",
    includes: ["Institucional", "E-commerce", "Captação"],
  },
];
