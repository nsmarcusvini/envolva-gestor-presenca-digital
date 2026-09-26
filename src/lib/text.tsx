import { Fragment } from "react";

const EM_CLASS = "font-serif italic font-normal tracking-[-0.01em]";

/** Converte "texto *ênfase*" em JSX, com a ênfase em serifa itálica. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") ? (
          <em key={i} className={EM_CLASS}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Quebra o texto em palavras mascaradas para o reveal "de baixo para cima".
 * Respeita *ênfase*. O elemento pai precisa de data-reveal="split".
 */
export function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  // Cada token lembra se havia espaço antes dele — assim "*cuide*." não vira "cuide .".
  const tokens: { word: string; em: boolean; spaceBefore: boolean }[] = [];
  let pendingSpace = false;
  text.split(/(\*[^*]+\*)/g).filter(Boolean).forEach((part) => {
    const em = part.startsWith("*");
    const clean = em ? part.slice(1, -1) : part;
    clean.split(/(\s+)/).forEach((chunk) => {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) {
        pendingSpace = true;
        return;
      }
      tokens.push({ word: chunk, em, spaceBefore: pendingSpace });
      pendingSpace = false;
    });
  });

  return (
    <>
      {tokens.map(({ word, em, spaceBefore }, i) => (
        <Fragment key={i}>
          {i > 0 && spaceBefore ? " " : null}
          <span className="split-word">
            <span className={em ? EM_CLASS : undefined} style={{ "--i": i + offset } as React.CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

/** Texto puro, sem os marcadores de ênfase (para aria-label, metadata etc.). */
export const plain = (text: string) => text.replace(/\*/g, "");
