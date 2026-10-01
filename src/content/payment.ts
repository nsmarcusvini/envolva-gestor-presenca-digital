/**
 * Pagamento facilitado — o diferencial da Envolva AI.
 *
 * Regra de negócio: não existem planos nem preços fixos. Todo projeto passa por
 * avaliação e recebe orçamento próprio; o cliente escolhe pagar à vista ou parcelado.
 * Parcelado: ao quitar a última parcela, o software passa a ser da empresa.
 */

export type PaymentPref = "a-vista" | "parcelado" | "indefinido";

export const payment = {
  index: "04",
  eyebrow: "Pagamento facilitado",
  title: "Você parcela. *No fim, o software é seu.*",
  intro:
    "Sem planos de prateleira e sem mensalidade eterna. A gente avalia o seu caso, monta o orçamento e você escolhe: à vista ou em parcelas. Quitada a última, o software é 100% da sua empresa.",

  meter: {
    label: "Quanto do software já é seu",
    installment: "Parcela",
    done: "Quitado. O software é da sua empresa.",
    start: "Primeira parcela",
    end: "Última parcela",
    // Apenas ilustrativo: o número real de parcelas é definido em cada orçamento.
    installments: 12,
    srText:
      "A cada parcela paga, uma parte maior do software passa a ser da sua empresa. Na última, ele é 100% seu.",
  },

  compare: {
    title: "Alugar um sistema ou *ter o seu*?",
    rent: "Sistema alugado",
    own: "Envolva AI",
    rows: [
      { label: "Feito para", rent: "Qualquer empresa", own: "O seu processo" },
      { label: "Pagamento", rent: "Mensalidade sem fim", own: "Parcelas com data para acabar" },
      { label: "Ao final", rent: "Continua do fornecedor", own: "É da sua empresa" },
      { label: "Mudanças", rent: "Quando o fornecedor quiser", own: "Quando o seu negócio pedir" },
    ],
  },

  footnote: "Valor, número de parcelas e condições são definidos no orçamento, conforme o escopo de cada projeto.",
  cta: "Quero minha avaliação",
};
