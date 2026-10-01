import type { PaymentPref } from "@/content/payment";

/**
 * Qualquer CTA da página pode "pré-preencher" o formulário:
 * requestLead({ payment: "parcelado" }) → rola até #contato e marca a forma de pagamento.
 */
export type LeadIntent = { payment?: PaymentPref; focus?: "dor" };

export const LEAD_INTENT_EVENT = "envolva:lead-intent";

export function requestLead(intent: LeadIntent) {
  window.dispatchEvent(new CustomEvent<LeadIntent>(LEAD_INTENT_EVENT, { detail: intent }));
}
