import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Termos de uso — Envolva AI", robots: { index: false } };

export default function Page() {
  return <LegalPage title="Termos de uso" />;
}
