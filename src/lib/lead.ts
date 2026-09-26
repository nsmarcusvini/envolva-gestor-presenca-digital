/**
 * Ponto ÚNICO de envio do formulário de diagnóstico.
 *
 * Hoje: modo "preview" (só interface — mostra o sucesso sem enviar para lugar nenhum).
 * Quando a ferramenta for escolhida, troque `leadDestination` por uma das opções:
 *
 *   // Google Forms com respostas pré-preenchidas (pegue os ids "entry.XXXX" no link de pré-preenchimento):
 *   { mode: "redirect", url: "https://docs.google.com/forms/d/e/SEU_ID/viewform",
 *     params: (l) => ({ "entry.111": l.nome, "entry.222": l.empresa, "entry.333": l.whatsapp }) }
 *
 *   // Typeform com hidden fields:
 *   { mode: "redirect", url: "https://SEU.typeform.com/to/FORM_ID",
 *     params: (l) => ({ nome: l.nome, empresa: l.empresa, whatsapp: l.whatsapp }) }
 *
 *   // Webhook (Zapier, Make, n8n, API própria) recebendo JSON:
 *   { mode: "webhook", url: "https://hooks.exemplo.com/lead" }
 */

export type Lead = {
  nome: string;
  empresa: string;
  whatsapp: string;
  presenca: string;
  segmento: string;
  plano: string;
  desafios: string[];
  dor: string;
};

type LeadDestination =
  | { mode: "preview" }
  | { mode: "redirect"; url: string; params: (lead: Lead) => Record<string, string> }
  | { mode: "webhook"; url: string };

export const leadDestination: LeadDestination = { mode: "preview" };

export type SubmitResult = { ok: true; redirected?: boolean } | { ok: false };

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  try {
    switch (leadDestination.mode) {
      case "preview":
        await new Promise((r) => setTimeout(r, 900));
        return { ok: true };

      case "redirect": {
        const query = new URLSearchParams(leadDestination.params(lead)).toString();
        window.location.assign(`${leadDestination.url}?${query}`);
        return { ok: true, redirected: true };
      }

      case "webhook": {
        const res = await fetch(leadDestination.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, origem: "landing", enviadoEm: new Date().toISOString() }),
        });
        return res.ok ? { ok: true } : { ok: false };
      }
    }
  } catch {
    return { ok: false };
  }
}
