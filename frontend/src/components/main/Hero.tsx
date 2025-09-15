import React from "react";
import { Button } from "@/components/ui/button";
import { usePageEffects } from "./usePageEffects";

export default function Hero(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="relative py-20 px-4 text-center bg-background text-foreground overflow-hidden" data-section="hero">
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/10" />
      <div className="relative max-w-4xl mx-auto z-10">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 transform ${
            visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          DataLink Creative Solutions
          <span className="block text-muted-foreground">Incorporation</span>
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed transition-all duration-1000 delay-300 transform ${
            visibleSections.heroDesc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Professional technology solutions for modern organizations across the Philippines
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 transform ${
            visibleSections.heroButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button className="px-8 py-4 text-lg bg-background text-foreground hover:bg-muted font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started Today
          </Button>
          <Button className="px-8 py-4 text-lg border border-background text-background hover:bg-background hover:text-foreground font-semibold transition-all duration-300 hover:scale-105">
            View Our Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
