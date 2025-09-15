import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "./data";
import { usePageEffects } from "./usePageEffects";

export default function Testimonials(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="py-20 px-4 bg-background text-foreground" data-section="testimonials">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            visibleSections.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">Real feedback from organizations we've helped transform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className={`bg-muted/10 backdrop-blur-sm border-muted/20 hover:bg-muted/20 hover:scale-105 transition-all duration-500 transform ${
                visibleSections.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex mb-4 justify-center">
                  {[...Array(t.rating)].map((_, j) => (
                    <span
                      key={j}
                      className="text-yellow-400 text-xl hover:scale-125 transition-transform duration-300"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg mb-6 italic leading-relaxed text-card-foreground">
                  "{t.quote}"
                </p>
                <div className="border-t border-muted/20 pt-4">
                  <div className="font-bold text-card-foreground">{t.author}</div>
                  <div className="text-muted-foreground">{t.position}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
