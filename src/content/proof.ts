/**
 * Prova social. NÃO invente dados: preencha apenas com cases, métricas e depoimentos reais.
 *
 * - Enquanto todas as listas estiverem vazias e `showPlaceholders` for true,
 *   a seção mostra espaços reservados visivelmente marcados.
 * - Com `showPlaceholders: false` e listas vazias, a seção some da página.
 * - Ao preencher qualquer lista, os placeholders daquele tipo somem sozinhos.
 */

export type CaseStudy = {
  client: string;
  segment: string;
  summary: string;
  /** Caminho em /public, ex.: "/cases/padaria-antes-depois.jpg" */
  image?: { src: string; alt: string; width: number; height: number };
  metric?: { value: string; label: string };
};

export type Testimonial = { quote: string; name: string; role: string; company: string };
export type Metric = { value: string; label: string };
export type ClientLogo = { name: string; src: string; width: number; height: number };

export const proof = {
  showPlaceholders: true,
  cases: [] as CaseStudy[],
  metrics: [] as Metric[],
  testimonials: [] as Testimonial[],
  logos: [] as ClientLogo[],
};
