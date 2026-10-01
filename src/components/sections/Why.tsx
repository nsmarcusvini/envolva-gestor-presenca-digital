import { why } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Diferenciais. Momento: o que a empresa deixa para trás é riscado, um a um,
 * e sobra só o software dela. Depois, os diferenciais concretos em grade editorial (sem cards).
 */
export function Why() {
  return (
    <section id="diferenciais" className="section-y relative">
      <div className="container-x">
        <SectionHeader index={why.index} eyebrow={why.eyebrow} title={why.title} />

        <div className="mt-[clamp(4rem,9vw,7rem)] grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div data-reveal="fade" className="lg:col-span-5">
            <ul
              aria-label={why.replacedLabel}
              className="space-y-2 text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.04em]"
            >
              {why.replaced.map((r, i) => (
                <li key={r}>
                  <span className="strike-item" style={{ "--i": i } as React.CSSProperties}>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center gap-4 text-[clamp(2.2rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.05em] text-primary">
              <span aria-hidden className="h-px w-10 bg-ink/25" />
              {why.replacedBy}
              <span aria-hidden className="size-3 rounded-full bg-gold" />
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {why.items.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--d": i % 2 } as React.CSSProperties}
                className="border-t border-ink/12 pt-6"
              >
                <span className="eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
