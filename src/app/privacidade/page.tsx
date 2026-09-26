import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Política de privacidade — Envolva AI", robots: { index: false } };

export default function Page() {
  return <LegalPage title="Política de privacidade" />;
}
