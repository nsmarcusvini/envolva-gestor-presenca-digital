import type { PlanId } from "@/content/plans";

/**
 * Qualquer CTA da página pode "pré-preencher" o formulário:
 * requestLead({ plan: "conectado" }) → rola até #contato e marca o plano.
 */
export type LeadIntent = { plan?: PlanId; focus?: "dor" };

export const LEAD_INTENT_EVENT = "envolva:lead-intent";

export function requestLead(intent: LeadIntent) {
  window.dispatchEvent(new CustomEvent<LeadIntent>(LEAD_INTENT_EVENT, { detail: intent }));
}
