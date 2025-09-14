import React from "react";
import { Button } from "@/components/ui/button";
import { usePageEffects } from "./usePageEffects";
import { productSlides, showcaseColors } from "./data";

export default function ProductShowcase(): React.ReactElement {
  const { activeIndex, setActiveIndex, colorIndex, visibleSections, isPaused, setIsPaused, isTabVisible } = usePageEffects();

  const prev = () => setActiveIndex((p) => (p - 1 + productSlides.length) % productSlides.length);
  const next = () => setActiveIndex((p) => (p + 1) % productSlides.length);

  return (
    <section className="py-12 px-4 bg-muted/10" data-section="showcase">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-6 transition-all duration-1000 transform ${visibleSections.showcase ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Product Showcase</h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">Preview the DCSI Projects UI — light and dark modes with dynamic color effects.</p>
        </div>

        <div className={`bg-card border shadow-lg rounded-xl overflow-hidden transition-all duration-1000 delay-300 transform ${visibleSections.showcase ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div
            className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center bg-transparent"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {productSlides.map((s, i) => (
              <figure
                key={s.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                  i === activeIndex ? "opacity-100 z-20 scale-100" : "opacity-0 z-10 scale-95"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.title}
                  className={`w-full max-w-5xl h-[320px] md:h-[420px] object-contain transition-all duration-1000 filter ${showcaseColors[colorIndex]} brightness-110 saturate-125`}
                />
              </figure>
            ))}

            <button aria-label="Previous" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-30 transition-all duration-300 hover:scale-110">
              ‹
            </button>
            <button aria-label="Next" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-30 transition-all duration-300 hover:scale-110">
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {productSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-4 right-4 z-30">
              <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1 text-white text-sm">
                <div className={`w-2 h-2 rounded-full ${(!isPaused && isTabVisible) ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                {(!isPaused && isTabVisible) ? "Auto" : "Paused"}
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4 flex flex-col md:flex-row items-center justify-between">
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold text-card-foreground">{productSlides[activeIndex].title}</h3>
              <p className="text-muted-foreground mt-1">{productSlides[activeIndex].caption}</p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-3">
              <Button className="px-5 py-2 font-semibold hover:scale-105 transition-transform duration-300">View Demo</Button>
              <Button className="px-5 py-2 border border-background hover:scale-105 transition-transform duration-300">Request Info</Button>
            </div>
          </div>

          <div className="w-full border-t px-6 py-4 flex items-center justify-center gap-3 bg-background">
            {productSlides.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className={`rounded-md overflow-hidden p-1 border transition-all duration-300 hover:scale-105 ${i === activeIndex ? "ring-2 ring-offset-2 ring-primary" : "opacity-80 hover:opacity-100"}`}
                aria-label={`Show ${t.title}`}
              >
                <img src={t.src} alt={t.title} className={`w-36 h-20 object-contain bg-black/5 filter ${showcaseColors[colorIndex]} transition-all duration-1000`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
