"use client";

import { useRef, useState } from "react";
import { payment } from "@/content/payment";
import { Emphasis } from "@/lib/text";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/components/motion/hooks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadButton } from "@/components/ui/LeadButton";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pagamento facilitado: o diferencial. Em dois tempos:
 * 1) medidor de posse — rolar = as parcelas vão sendo pagas e o percentual do
 *    software que é da empresa sobe até 100% (a última parcela é o ponto dourado);
 * 2) "alugar ou ter": comparação em que a coluna da Envolva é o bloco escuro.
 */
export function Payment() {
  const meterRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useScrollProgress(meterRef, { mode: "through", onChange: setP });

  const { meter, compare } = payment;
  const n = meter.installments;
  const paid = Math.round(p * n);
  const owned = Math.round((paid / n) * 100);
  const done = paid === n;

  return (
    <section id="pagamento" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader index={payment.index} eyebrow={payment.eyebrow} title={payment.title} className="max-w-4xl" />
          <p data-reveal className="max-w-[24rem] text-[1.0625rem] leading-relaxed text-muted lg:pb-3">
            {payment.intro}
          </p>
        </div>

        {/* Medidor de posse */}
        <div ref={meterRef} className="mt-[clamp(4rem,9vw,7rem)] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <p className="sr-only">{meter.srText}</p>
          <div aria-hidden className="lg:col-span-5">
            <p className="eyebrow text-muted">{meter.label}</p>
            <p className="mt-5 font-serif text-[clamp(6rem,15vw,12.5rem)] italic leading-[0.8] tracking-[-0.03em] text-primary tabular-nums">
              {owned}
              <span className="text-ink/25">%</span>
            </p>
            <p className="mt-7 flex min-h-[1.5em] items-center gap-3 text-xl font-medium tracking-[-0.02em]">
              <span
                className={cn(
                  "relative size-2 shrink-0 rounded-full transition-colors duration-500",
                  done ? "dot-pulse bg-gold" : "bg-ink/20",
                )}
              />
              {done ? meter.done : `${meter.installment} ${pad(Math.max(paid, 1))} de ${pad(n)}`}
            </p>
          </div>

          <div aria-hidden className="lg:col-span-7">
            <div className="grid gap-1.5 md:gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {Array.from({ length: n }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-20 rounded-full transition-[background-color,transform] duration-500 ease-out-expo md:h-28",
                    i < paid ? (i === n - 1 ? "bg-gold" : "bg-primary") : "scale-y-[0.82] bg-ink/[0.07]",
                  )}
                />
              ))}
            </div>
            <div className="eyebrow mt-5 flex justify-between text-muted">
              <span>{meter.start}</span>
              <span>{meter.end}</span>
            </div>
          </div>
        </div>

        {/* Alugar ou ter */}
        <div className="mt-[clamp(5rem,11vw,9rem)] grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h3
            data-reveal
            className="max-w-[14ch] text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.04em] lg:col-span-4"
          >
            <Emphasis text={compare.title} />
          </h3>

          <div role="table" aria-label={compare.title.replace(/\*/g, "")} className="lg:col-span-8">
            <div role="row" className="grid grid-cols-2 md:grid-cols-[9rem_1fr_1fr]">
              <span role="columnheader" className="hidden md:block" />
              <span role="columnheader" className="eyebrow px-4 pb-5 text-muted md:px-6">
                {compare.rent}
              </span>
              <span
                role="columnheader"
                className="eyebrow flex items-center gap-2 rounded-t-[1.5rem] bg-deep px-4 pb-5 pt-6 text-paper md:px-6"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                {compare.own}
              </span>
            </div>

            {compare.rows.map((row, i) => {
              const last = i === compare.rows.length - 1;
              return (
                <div
                  key={row.label}
                  role="row"
                  data-reveal
                  style={{ "--d": i } as React.CSSProperties}
                  className="grid grid-cols-2 md:grid-cols-[9rem_1fr_1fr]"
                >
                  <span
                    role="rowheader"
                    className="eyebrow border-t border-ink/10 px-4 pb-2 pt-5 text-muted md:px-0 md:py-7"
                  >
                    {row.label}
                  </span>
                  {/* mobile: mantém a coluna escura contínua ao lado do rótulo */}
                  <span aria-hidden className="bg-deep md:hidden" />
                  <span
                    role="cell"
                    className="px-4 pb-6 text-lg leading-snug text-muted md:border-t md:border-ink/10 md:px-6 md:py-7 md:text-xl"
                  >
                    {row.rent}
                  </span>
                  <span
                    role="cell"
                    className={cn(
                      "on-dark bg-deep px-4 pb-6 text-lg font-medium leading-snug text-paper md:px-6 md:py-7 md:text-xl",
                      "md:border-t md:border-paper/10",
                      last && "rounded-b-[1.5rem] pb-8 md:pb-9",
                    )}
                  >
                    {row.own}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[34rem] text-muted">{payment.footnote}</p>
          <LeadButton intent={{ payment: "parcelado" }} className="w-full shrink-0 md:w-auto">
            {payment.cta}
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
