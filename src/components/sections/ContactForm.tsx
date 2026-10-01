"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { leadForm } from "@/content/form";
import { site } from "@/content/site";
import { Emphasis, SplitWords, plain } from "@/lib/text";
import { submitLead, type Lead } from "@/lib/lead";
import { LEAD_INTENT_EVENT, type LeadIntent } from "@/lib/intent";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Button, TextLink } from "@/components/ui/Button";
import { ChipGroup, SelectField, TextField, TextareaField } from "@/components/ui/Field";

type Errors = Partial<Record<"nome" | "empresa" | "whatsapp", string>>;

const emptyLead: Lead = {
  nome: "",
  empresa: "",
  whatsapp: "",
  presenca: "",
  segmento: "",
  pagamento: "",
  desafios: [],
  dor: "",
};

/** (11) 94367-6301 enquanto digita. */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(lead: Lead): Errors {
  const f = leadForm.fields;
  const e: Errors = {};
  if (lead.nome.trim().length < 2) e.nome = f.nome.error;
  if (lead.empresa.trim().length < 2) e.empresa = f.empresa.error;
  const digits = lead.whatsapp.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) e.whatsapp = f.whatsapp.error;
  return e;
}

export function ContactForm() {
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentLead, setSentLead] = useState<Lead | null>(null);
  const dorRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const f = leadForm.fields;

  const set = <K extends keyof Lead>(key: K, value: Lead[K]) => {
    setLead((l) => ({ ...l, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // CTAs da página pré-preenchem o formulário (pagamento, foco no campo de dor).
  useEffect(() => {
    const apply = (intent: LeadIntent) => {
      if (intent.payment) setLead((l) => ({ ...l, pagamento: intent.payment! }));
      if (intent.focus === "dor") setTimeout(() => dorRef.current?.focus({ preventScroll: true }), 900);
    };
    const onIntent = (e: Event) => apply((e as CustomEvent<LeadIntent>).detail);
    window.addEventListener(LEAD_INTENT_EVENT, onIntent);

    const pagamento = new URLSearchParams(window.location.search).get("pagamento");
    if (pagamento && leadForm.paymentOptions.some((o) => o.value === pagamento)) setLead((l) => ({ ...l, pagamento }));

    return () => window.removeEventListener(LEAD_INTENT_EVENT, onIntent);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(lead);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Errors)[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setStatus("sending");
    const res = await submitLead(lead);
    if (res.ok) {
      setSentLead(lead);
      setStatus("success");
      setLead(emptyLead);
    } else setStatus("error");
  }

  return (
    <section id="contato" data-theme="dark" className="on-dark section-y relative bg-deep text-paper">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Chamada */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index={leadForm.index} className="text-paper/70">
              {leadForm.eyebrow}
            </Eyebrow>
            <h2
              data-reveal="split"
              aria-label={plain(leadForm.title)}
              className="display mt-7 max-w-[12ch] text-[clamp(2.8rem,6.4vw,6rem)]"
            >
              <span aria-hidden>
                <SplitWords text={leadForm.title} />
              </span>
            </h2>
            <p data-reveal style={{ "--d": 3 } as React.CSSProperties} className="mt-8 max-w-[26rem] text-lg leading-relaxed text-paper/70">
              {leadForm.sub}
            </p>
            <p data-reveal style={{ "--d": 4 } as React.CSSProperties} className="eyebrow mt-8 flex items-center gap-3 text-paper/55">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {leadForm.duration}
            </p>
            <p data-reveal style={{ "--d": 5 } as React.CSSProperties} className="mt-12 text-paper/70">
              {leadForm.whatsappAlt}{" "}
              <TextLink href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer" arrow className="font-medium text-paper">
                {leadForm.whatsappAltCta}
              </TextLink>
            </p>
          </div>
        </div>

        {/* Formulário / sucesso */}
        <div className="lg:col-span-6 lg:col-start-7">
          {status === "success" && sentLead ? (
            <Success lead={sentLead} headingRef={successRef} onAgain={() => setStatus("idle")} />
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-14" aria-describedby="form-duracao">
              <span id="form-duracao" className="sr-only">
                {leadForm.duration}
              </span>

              <Group n="01" title={leadForm.groups.you}>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <TextField
                    id="nome"
                    label={f.nome.label}
                    placeholder={f.nome.placeholder}
                    autoComplete="given-name"
                    required
                    value={lead.nome}
                    onChange={(e) => set("nome", e.target.value)}
                    error={errors.nome}
                  />
                  <TextField
                    id="whatsapp"
                    label={f.whatsapp.label}
                    placeholder={f.whatsapp.placeholder}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                    value={lead.whatsapp}
                    onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
                    error={errors.whatsapp}
                  />
                </div>
              </Group>

              <Group n="02" title={leadForm.groups.business}>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <TextField
                    id="empresa"
                    label={f.empresa.label}
                    placeholder={f.empresa.placeholder}
                    autoComplete="organization"
                    required
                    value={lead.empresa}
                    onChange={(e) => set("empresa", e.target.value)}
                    error={errors.empresa}
                  />
                  <TextField
                    id="presenca"
                    label={f.presenca.label}
                    hint={f.presenca.hint}
                    placeholder={f.presenca.placeholder}
                    autoComplete="url"
                    value={lead.presenca}
                    onChange={(e) => set("presenca", e.target.value)}
                  />
                  <SelectField
                    id="segmento"
                    label={f.segmento.label}
                    placeholder={f.segmento.placeholder}
                    options={leadForm.segments}
                    value={lead.segmento}
                    onChange={(e) => set("segmento", e.target.value)}
                    className="sm:col-span-2"
                  />
                </div>
              </Group>

              <Group n="03" title={leadForm.groups.needs}>
                <div className="space-y-10">
                  <ChipGroup
                    name="pagamento"
                    legend={f.pagamento.label}
                    hint={f.pagamento.hint}
                    type="radio"
                    options={leadForm.paymentOptions}
                    value={lead.pagamento ? [lead.pagamento] : []}
                    onChange={(v) => set("pagamento", v[0] ?? "")}
                  />
                  <ChipGroup
                    name="desafios"
                    legend={f.desafios.label}
                    hint={f.desafios.hint}
                    type="checkbox"
                    options={leadForm.challenges.map((c) => ({ value: c, label: c }))}
                    value={lead.desafios}
                    onChange={(v) => set("desafios", v)}
                  />
                  <TextareaField
                    ref={dorRef}
                    id="dor"
                    label={f.dor.label}
                    hint={f.dor.hint}
                    placeholder={f.dor.placeholder}
                    value={lead.dor}
                    onChange={(e) => set("dor", e.target.value)}
                  />
                </div>
              </Group>

              <div className="flex flex-col gap-6 border-t border-paper/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[18rem] text-sm text-paper/55">
                  {leadForm.consent}{" "}
                  <a href={leadForm.consentLink.href} className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                    {leadForm.consentLink.label}
                  </a>
                  .
                </p>
                <Button type="submit" variant="light" disabled={status === "sending"} className="w-full sm:w-auto">
                  {status === "sending" ? leadForm.submitting : leadForm.submit}
                </Button>
              </div>
              <p role="alert" className="min-h-6 text-sm text-error-soft">
                {status === "error" ? leadForm.genericError : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Group({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-8 flex items-baseline gap-4 text-xl font-medium tracking-[-0.02em]">
        <span className="eyebrow text-gold">{n}</span>
        {title}
      </p>
      {children}
    </div>
  );
}

function Success({
  lead,
  headingRef,
  onAgain,
}: {
  lead: Lead;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onAgain: () => void;
}) {
  const firstName = lead.nome.trim().split(/\s+/)[0] ?? "";
  return (
    <div role="status" className="flex min-h-[32rem] flex-col justify-center">
      {/* o ponto da marca se abre em órbita */}
      <div aria-hidden className="relative size-28">
        <span className="success-ring absolute inset-0 rounded-full border border-paper/25" />
        <span className="success-ring absolute inset-5 rounded-full border border-paper/15 [animation-delay:120ms]" />
        <span className="dot-pulse absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-12 text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] outline-none"
      >
        <Emphasis text={leadForm.success.title(firstName)} />
      </h3>
      <p className="mt-6 max-w-[28rem] text-lg leading-relaxed text-paper/70">{leadForm.success.body(lead.empresa.trim())}</p>
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Button href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer" variant="light">
          {leadForm.whatsappAltCta}
        </Button>
        <button type="button" onClick={onAgain} className="eyebrow text-paper/60 underline-offset-4 hover:text-paper hover:underline">
          {leadForm.success.again}
        </button>
      </div>
    </div>
  );
}
