import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "outline" | "outline-light";
type Size = "md" | "sm";

const base =
  "group relative inline-flex select-none items-center justify-between gap-4 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[background-color,color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "h-14 pl-6 pr-2 text-[15px]",
  sm: "h-11 pl-5 pr-1.5 text-[14px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-paper hover:bg-deep",
  light: "bg-paper text-deep hover:bg-white",
  outline: "text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/45",
  "outline-light": "text-paper ring-1 ring-inset ring-paper/20 hover:ring-paper/55",
};

const dot: Record<Variant, string> = {
  primary: "bg-paper text-primary",
  light: "bg-primary text-paper",
  outline: "bg-ink/[0.06] text-ink group-hover:bg-ink group-hover:text-paper",
  "outline-light": "bg-paper/10 text-paper group-hover:bg-paper group-hover:text-deep",
};

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden className={className}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string; arrow?: boolean };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/**
 * Botão da marca: pílula + "ponto" circular com seta — ecoa o ponto da logo.
 * No hover a seta sai da diagonal (↗) para a horizontal (→).
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", children, className, arrow = true, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], !arrow && "justify-center px-6", className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-colors duration-500 ease-out-expo",
            size === "md" ? "size-10" : "size-8",
            dot[variant],
          )}
        >
          <ArrowIcon className="-rotate-45 transition-transform duration-500 ease-out-expo group-hover:rotate-0" />
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

/** Link de texto com fio que cresce no hover. */
export function TextLink({
  className,
  children,
  arrow = false,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { arrow?: boolean }) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5",
        "transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]",
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />}
    </a>
  );
}
