import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Plans } from "@/components/sections/Plans";
import { SpecificPain } from "@/components/sections/SpecificPain";
import { Why } from "@/components/sections/Why";
import { Proof } from "@/components/sections/Proof";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { MobileCta } from "@/components/sections/MobileCta";
import { RevealObserver } from "@/components/motion/RevealObserver";

/**
 * Narrativa: slogan → "isso acontece comigo" → a solução → como funciona →
 * planos → a dor específica (Sob medida) → por que nós → prova → formulário.
 * Para reordenar ou remover uma seção, basta mexer nesta lista.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Plans />
        <SpecificPain />
        <Why />
        <Proof />
        <ContactForm />
      </main>
      <Footer />
      <MobileCta />
      <RevealObserver />
    </>
  );
}
