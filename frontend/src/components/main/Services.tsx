import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "./data";
import { usePageEffects } from "./usePageEffects";

export default function Services(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <section className="py-20 px-4 bg-muted/30" data-section="services">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive digital solutions tailored to meet the unique needs of government institutions, educational organizations, and businesses across the Philippines.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 transform ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Carousel className="relative" autoPlay={true} interval={4000}>
            <CarouselPrevious />
            <CarouselNext />

            <CarouselContent className="py-4 px-2">
              {services.map((service, index) => (
                <CarouselItem key={index}>
                  <Card className="border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-card group">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors duration-300">{service.name}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center justify-center group-hover:text-card-foreground transition-colors duration-300">
                            <span className="w-2 h-2 bg-foreground rounded-full mr-3 flex-shrink-0 group-hover:bg-primary transition-colors duration-300"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
