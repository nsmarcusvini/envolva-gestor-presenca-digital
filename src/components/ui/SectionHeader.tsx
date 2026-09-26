import { cn } from "@/lib/cn";
import { Emphasis, SplitWords, plain } from "@/lib/text";

/** Rótulo mono com o ponto da marca: "(03) ● A solução". */
export function Eyebrow({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="opacity-60">({index})</span>}
      <span aria-hidden className="size-1.5 rounded-full bg-gold" />
      <span>{children}</span>
    </p>
  );
}

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
  tone?: "light" | "dark";
};

/**
 * Cabeçalho padrão de seção: eyebrow + título em palavras que sobem + introdução.
 * O título aceita *ênfase* em serifa itálica.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  className,
  titleClassName,
  tone = "light",
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-5xl", className)}>
      <Eyebrow index={index} className={tone === "dark" ? "text-paper/70" : "text-muted"}>
        {eyebrow}
      </Eyebrow>
      <Tag
        data-reveal="split"
        aria-label={plain(title)}
        className={cn("display mt-7 text-[clamp(2.4rem,6.2vw,5.75rem)]", titleClassName)}
      >
        <span aria-hidden>
          <SplitWords text={title} />
        </span>
      </Tag>
      {intro && (
        <p
          data-reveal
          style={{ "--d": 3 } as React.CSSProperties}
          className={cn(
            "mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed md:text-lg",
            tone === "dark" ? "text-paper/70" : "text-muted",
          )}
        >
          <Emphasis text={intro} />
        </p>
      )}
    </header>
  );
}
