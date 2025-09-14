import React from "react";
import { PageEffectsProvider } from "@/components/main/usePageEffects";
import Hero from "@/components/main/Hero";
import ProductShowcase from "@/components/main/ProductShowcase";
import Stats from "@/components/main/Stats";
import Services from "@/components/main/Services";
import WhyChooseUs from "@/components/main/WhyChooseUs";
import Testimonials from "@/components/main/Testimonials";
import CallToAction from "@/components/main/CallToAction";
import Footer from "@/components/main/Footer";

export default function MainPage(): React.ReactElement {
  return (
    <PageEffectsProvider>
      <div className="min-h-screen bg-background">
        <Hero />
        <ProductShowcase />
        <Stats />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </PageEffectsProvider>
  );
}