/**
 * Símbolo oficial da Envolva AI, reconstruído em vetor a partir do PNG original
 * (192×192) medindo a geometria pixel a pixel — sem redesenho:
 * - "e" com contorno externo levemente mais largo que alto (66×61) e miolo circular;
 * - terminal com corte inclinado (~22°), como no original;
 * - "e" #F3F2EE, ponto âmbar #EEB21A e fundo #071312 exatamente como no arquivo.
 * As cores da logo não seguem os tokens da página de propósito: são da marca.
 */
type LogoProps = {
  size?: number;
  /** Prefixo único para os ids internos do SVG quando houver mais de uma logo na página. */
  id?: string;
  className?: string;
  title?: string;
};

export function LogoMark({ size = 32, id = "logo", className, title }: LogoProps) {
  const mask = `${id}-ring`;
  const clip = `${id}-outer`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="192" height="192">
          <ellipse cx="87.5" cy="97" rx="33" ry="30.5" fill="#fff" />
          <circle cx="87.5" cy="97.5" r="20" fill="#000" />
          <polygon points="87.5,102.5 136,102.5 136,120 87.5,102" fill="#000" />
        </mask>
        <clipPath id={clip}>
          <ellipse cx="87.5" cy="97" rx="33" ry="30.5" />
        </clipPath>
      </defs>
      <rect width="192" height="192" rx="56" fill="#071312" />
      <rect width="192" height="192" fill="#F3F2EE" mask={`url(#${mask})`} />
      <rect x="54" y="92.5" width="67" height="10" fill="#F3F2EE" clipPath={`url(#${clip})`} />
      <circle cx="131" cy="74" r="10.5" fill="#EEB21A" />
    </svg>
  );
}

/** Símbolo + nome. O nome é composto em texto (não existe logotipo oficial desenhado). */
export function Logo({
  size = 30,
  id,
  tone = "ink",
  className = "",
}: LogoProps & { tone?: "ink" | "paper" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} id={id} />
      <span
        className={`whitespace-nowrap text-[17px] font-semibold tracking-[-0.03em] ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
      >
        Envolva
        <span className={tone === "paper" ? "text-paper/55" : "text-muted"}> AI</span>
      </span>
    </span>
  );
}
