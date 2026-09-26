import { plans, formatBRL, type Plan } from "@/content/plans";
import { plansSection } from "@/content/home";
import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadButton } from "@/components/ui/LeadButton";
import { ArrowIcon } from "@/components/ui/Button";

/**
 * Planos: comparação calma. Colunas sem caixas, separadas por fios; o plano
 * recomendado é o único "objeto" da seção — um bloco escuro que avança um
 * pouco acima e abaixo das outras colunas. O grid se adapta à quantidade de planos.
 */
export function Plans() {
  const columns = plans.filter((p) => p.variant === "column");
  const rows = plans.filter((p) => p.variant === "row");

  return (
    <section id="planos" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            index={plansSection.index}
            eyebrow={plansSection.eyebrow}
            title={plansSection.title}
            className="max-w-4xl"
          />
          <p data-reveal className="max-w-[24rem] text-[1.0625rem] leading-relaxed text-muted lg:pb-3">
            {plansSection.intro}
          </p>
        </div>

        <div
          className="mt-[clamp(4rem,9vw,7rem)] mx-auto grid max-w-xl gap-6 lg:max-w-none lg:gap-0 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ "--cols": columns.length } as React.CSSProperties}
        >
          {columns.map((plan, i) => (
            <PlanColumn key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {rows.map((plan) => (
          <PlanRow key={plan.id} plan={plan} />
        ))}

        <p className="eyebrow mt-10 text-muted">{plansSection.footnote}</p>
      </div>
    </section>
  );
}

function PlanColumn({ plan, index }: { plan: Plan; index: number }) {
  const hl = !!plan.highlight;

  return (
    <article
      data-reveal
      style={{ "--d": index } as React.CSSProperties}
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex flex-col px-6 py-10 md:px-8 lg:px-9",
        hl
          ? "on-dark rounded-[1.75rem] bg-deep text-paper lg:-my-8 lg:py-18"
          : "rounded-[1.75rem] bg-card/60 ring-1 ring-inset ring-ink/[0.06] lg:rounded-none lg:bg-transparent lg:ring-0 lg:first:border-l-0 lg:border-l lg:border-ink/10",
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <h3 id={`plan-${plan.id}`} className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
          {plan.name}
        </h3>
        {plan.badge && (
          <span className="eyebrow flex items-center gap-2 rounded-full border border-paper/20 px-3 py-2 text-paper/85">
            <span aria-hidden className="size-1.5 rounded-full bg-gold" />
            {plan.badge}
          </span>
        )}
      </header>
      <p className={cn("mt-4 min-h-[3.2em] font-serif text-xl italic leading-snug", hl ? "text-paper/80" : "text-muted")}>
        {plan.tagline}
      </p>

      <div className="mt-10">
        {plan.monthly !== null ? (
          <p className="flex items-start gap-1.5" aria-label={`R$ ${formatBRL(plan.monthly)} por mês`}>
            <span aria-hidden className={cn("mt-2 text-base font-medium", hl ? "text-paper/70" : "text-muted")}>R$</span>
            <span aria-hidden className="text-[clamp(3.6rem,5.2vw,4.75rem)] font-semibold leading-[0.85] tracking-[-0.055em] tabular-nums">
              {formatBRL(plan.monthly)}
            </span>
            <span aria-hidden className={cn("self-end pb-1 text-base", hl ? "text-paper/70" : "text-muted")}>/mês</span>
          </p>
        ) : (
          <p className="text-5xl font-semibold tracking-[-0.05em]">Sob consulta</p>
        )}
        <p className={cn("eyebrow mt-4", hl ? "text-paper/60" : "text-muted")}>{plan.setup}</p>
      </div>

      <LeadButton
        intent={{ plan: plan.id }}
        href={plan.cta.href}
        variant={hl ? "light" : "outline"}
        className="mt-9 w-full"
      >
        {plan.cta.label}
      </LeadButton>

      <div className={cn("mt-10 border-t pt-8", hl ? "border-paper/12" : "border-ink/10")}>
        {plan.includesFrom && (
          <p className={cn("mb-6 text-[15px] font-medium", hl ? "text-paper" : "text-ink")}>
            Tudo do {plan.includesFrom}, e mais:
          </p>
        )}
        <ul className="space-y-5">
          {plan.features.map((f) => (
            <li key={f.title} className="grid grid-cols-[1rem_1fr] gap-3">
              <span aria-hidden className={cn("mt-[0.55em] size-1.5 rounded-full", hl ? "bg-gold" : "bg-support")} />
              <span className="text-[15px] leading-snug">
                <span className="font-medium">{f.title}</span>
                {f.detail && <span className={cn("mt-1 block", hl ? "text-paper/65" : "text-muted")}>{f.detail}</span>}
                {f.note && (
                  <span className={cn("mt-1.5 block text-[13px] italic", hl ? "text-paper/55" : "text-muted/85")}>
                    ({f.note})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PlanRow({ plan }: { plan: Plan }) {
  return (
    <a
      href={plan.cta.href ?? "#contato"}
      data-reveal
      className="group mt-12 grid items-center gap-6 border-y border-ink/10 py-10 transition-colors duration-500 ease-out-expo hover:bg-surface-soft/60 md:grid-cols-12 md:px-4 lg:mt-20"
    >
      <div className="md:col-span-4">
        <h3 className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">{plan.name}</h3>
        <p className="mt-3 font-serif text-xl italic text-muted">{plan.tagline}</p>
      </div>
      <ul className="flex flex-wrap gap-2 md:col-span-5">
        {plan.features.map((f) => (
          <li key={f.title} className="eyebrow rounded-full border border-ink/12 px-3 py-2 text-muted">
            {f.title}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
        <span className="text-right">
          <span className="block text-xl font-semibold tracking-[-0.03em]">Sob consulta</span>
          <span className="eyebrow mt-1 block text-muted">{plan.setup}</span>
        </span>
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-paper transition-transform duration-500 ease-out-expo group-hover:scale-110">
          <ArrowIcon className="rotate-90 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
          <span className="sr-only">{plan.cta.label}</span>
        </span>
      </div>
    </a>
  );
}
