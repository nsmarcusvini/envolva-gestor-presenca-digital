"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { requestLead, type LeadIntent } from "@/lib/intent";

/**
 * CTA que leva ao formulário já pré-preenchido (plano, foco no campo de dor).
 * Sem JS continua funcionando como âncora para #contato.
 */
export function LeadButton({
  intent,
  href = "#contato",
  variant,
  size,
  className,
  children,
}: {
  intent: LeadIntent;
  href?: string;
  variant?: "primary" | "light" | "outline" | "outline-light";
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button href={href} variant={variant} size={size} className={className} onClick={() => requestLead(intent)}>
      {children}
    </Button>
  );
}
