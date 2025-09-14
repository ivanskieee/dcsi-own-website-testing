import React from "react";
import { stats } from "./data";
import { usePageEffects } from "./usePageEffects";

export default function Stats(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="py-16 px-4 bg-background border-b" data-section="stats">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 transform ${visibleSections.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 hover:scale-110 transition-transform duration-300">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
