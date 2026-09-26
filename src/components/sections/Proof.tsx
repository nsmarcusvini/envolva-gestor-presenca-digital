import Image from "next/image";
import { proof, type CaseStudy, type Metric, type Testimonial, type ClientLogo } from "@/content/proof";
import { proofSection } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Resultados / prova. Estrutura pronta para dados reais (ver src/content/proof.ts).
 * Enquanto não houver dados, mostra espaços reservados VISIVELMENTE marcados —
 * nada aqui é inventado.
 */
export function Proof() {
  const { cases, metrics, testimonials, logos, showPlaceholders } = proof;
  const hasData = cases.length + metrics.length + testimonials.length + logos.length > 0;
  if (!hasData && !showPlaceholders) return null;
  const ph = showPlaceholders;

  return (
    <section id="resultados" className="section-y relative border-t border-ink/10">
      <div className="container-x">
        <SectionHeader
          index={proofSection.index}
          eyebrow={proofSection.eyebrow}
          title={proofSection.title}
          intro={proofSection.intro}
        />

        {/* Métricas */}
        {metrics.length > 0 ? (
          <Metrics items={metrics} />
        ) : (
          ph && (
            <div className="mt-20 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Placeholder key={n} label={`Métrica ${n}`} hint="Número real + o que ele mede" className="h-40" />
              ))}
            </div>
          )
        )}

        {/* Cases */}
        {cases.length > 0 ? (
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {cases.map((c) => (
              <CaseCard key={c.client} item={c} />
            ))}
          </div>
        ) : (
          ph && (
            <div className="mt-4 grid gap-4 md:grid-cols-12">
              <Placeholder label="Case" hint="Imagem de antes e depois · cliente · segmento · resultado" className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[26rem]" />
              <Placeholder label="Depoimento" hint="Citação real · nome · cargo · empresa" className="min-h-64 md:col-span-5" />
            </div>
          )
        )}

        {/* Depoimentos */}
        {testimonials.length > 0 && (
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {testimonials.map((t) => (
              <Quote key={t.name} item={t} />
            ))}
          </div>
        )}

        {/* Logos */}
        {logos.length > 0 ? (
          <Logos items={logos} />
        ) : (
          ph && <Placeholder label="Logos de clientes" hint="4 a 8 logos, em uma cor" className="mt-4 h-28" />
        )}
      </div>
    </section>
  );
}

function Placeholder({ label, hint, className = "" }: { label: string; hint: string; className?: string }) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-dashed border-ink/25 bg-surface-soft/50 p-6 ${className}`}
    >
      <span className="eyebrow text-support">Espaço reservado · {label}</span>
      <span className="text-sm text-muted">{hint}</span>
    </div>
  );
}

function Metrics({ items }: { items: Metric[] }) {
  return (
    <dl className="mt-20 grid gap-10 border-t border-ink/10 pt-10 sm:grid-cols-3">
      {items.map((m) => (
        <div key={m.label} data-reveal className="flex flex-col-reverse">
          <dt className="mt-3 text-muted">{m.label}</dt>
          <dd className="text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-primary">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article data-reveal>
      {item.image && (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full rounded-2xl object-cover"
        />
      )}
      <p className="eyebrow mt-6 text-muted">{item.segment}</p>
      <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{item.client}</h3>
      <p className="mt-3 text-muted">{item.summary}</p>
      {item.metric && (
        <p className="mt-5 flex items-baseline gap-3">
          <span className="text-4xl font-semibold tracking-[-0.04em] text-primary">{item.metric.value}</span>
          <span className="text-muted">{item.metric.label}</span>
        </p>
      )}
    </article>
  );
}

function Quote({ item }: { item: Testimonial }) {
  return (
    <figure data-reveal className="border-t border-ink/12 pt-8">
      <blockquote className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] italic leading-snug">“{item.quote}”</blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium">{item.name}</span>
        <span className="text-muted"> · {item.role}, {item.company}</span>
      </figcaption>
    </figure>
  );
}

function Logos({ items }: { items: ClientLogo[] }) {
  return (
    <ul className="mt-16 flex flex-wrap items-center gap-x-14 gap-y-8 border-t border-ink/10 pt-10 opacity-70">
      {items.map((l) => (
        <li key={l.name}>
          <Image src={l.src} alt={l.name} width={l.width} height={l.height} className="h-8 w-auto" />
        </li>
      ))}
    </ul>
  );
}
