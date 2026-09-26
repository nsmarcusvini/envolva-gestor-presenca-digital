/** Serviços exibidos na órbita da seção "A solução". Até 8 itens funcionam bem na órbita. */
export type Service = {
  id: string;
  name: string;
  description: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "google",
    name: "Google",
    description: "Perfil da Empresa completo e atualizado. Quem procura, encontra — com o horário certo.",
    includes: ["Perfil da Empresa", "Avaliações", "Análise mensal"],
  },
  {
    id: "site",
    name: "Site",
    description: "Rápido, bonito no celular e com o WhatsApp a um toque. Mantido por nós.",
    includes: ["Criação", "Manutenção", "SEO"],
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Publicações com constância, calendário aprovado por você e leitura do que funciona.",
    includes: ["Calendário", "Publicação", "Análise"],
  },
  {
    id: "conteudo",
    name: "Conteúdo",
    description: "Posts e carrosséis que explicam o que você faz — sem você precisar escrever.",
    includes: ["Posts", "Carrosséis", "Legendas"],
  },
  {
    id: "criativos",
    name: "Criativos",
    description: "Artes no padrão da sua marca, prontas para cada formato.",
    includes: ["Identidade", "Formatos", "Consistência"],
  },
  {
    id: "automacao",
    name: "Automação",
    description: "Pequenas automações que tiram a tarefa repetida do seu dia.",
    includes: ["WhatsApp", "Formulários", "Planilhas", "Agenda"],
  },
];
