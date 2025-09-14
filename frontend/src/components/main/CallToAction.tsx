import React from "react";
import { Button } from "@/components/ui/button";
import { usePageEffects } from "./usePageEffects";

export default function CallToAction(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="py-20 px-4 bg-muted text-center" data-section="cta">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-foreground transition-all duration-1000 transform ${visibleSections.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Ready to Transform Your Organization?
        </h2>

        <p className={`text-xl mb-8 text-muted-foreground leading-relaxed transition-all duration-1000 delay-300 transform ${visibleSections.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Join hundreds of organizations that have already modernized their operations with our solutions. Get started with a free consultation today.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 transform ${visibleSections.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Schedule Free Consultation</Button>
          <Button className="px-8 py-4 text-lg border border-background font-semibold transition-all duration-300 hover:scale-105">Contact Us Today</Button>
        </div>
      </div>
    </section>
  );
}
