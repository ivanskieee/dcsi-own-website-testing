import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageEffects } from "./usePageEffects";

const items = [
  { title: "Fast Implementation", desc: "Quick deployment with minimal disruption to your current operations" },
  { title: "Secure & Reliable", desc: "Enterprise-grade security with 99.9% uptime guarantee" },
  { title: "Local Expertise", desc: "Deep understanding of Philippine regulations and business practices" },
  { title: "24/7 Support", desc: "Round-the-clock technical support in Filipino and English" },
  { title: "Custom Solutions", desc: "Tailored systems designed specifically for your organization" },
  { title: "Scalable Growth", desc: "Solutions that grow with your organization's needs" },
];

export default function WhyChooseUs(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="py-20 px-4 bg-background" data-section="whyChoose">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${visibleSections.whyChoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We combine technical expertise with deep understanding of local requirements to deliver solutions that truly work.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card
              key={index}
              className={`text-center p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 group border transform ${visibleSections.whyChoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-card-foreground transition-colors duration-300">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
