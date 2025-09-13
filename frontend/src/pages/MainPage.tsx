// src/components/MainPage.tsx
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

// Put files in src/assets and import like this:
import LaptopLight from "@/assets/laptop-light.png";
import LaptopDark from "@/assets/laptop-dark.png";

export default function MainPage(): React.ReactElement {
  const services = [
    { name: "Government Systems", desc: "Comprehensive digital solutions for Local Government Units including permit processing, tax management, and citizen services.", features: ["Digital Permits", "Tax Collection", "Citizen Portal", "Document Management"] },
    { name: "School Management", desc: "Complete educational platform managing students, teachers, grades, and administrative processes for modern institutions.", features: ["Student Information System", "Grade Management", "Attendance Tracking", "Parent Portal"] },
    { name: "Digital Transactions", desc: "Secure and reliable payment processing solutions with multiple payment methods and real-time transaction monitoring.", features: ["Online Payments", "Mobile Banking", "QR Code Payments", "Transaction Reports"] },
    { name: "Data Solutions", desc: "Advanced analytics and business intelligence tools providing actionable insights from your organizational data.", features: ["Real-time Analytics", "Custom Reports", "Data Visualization", "Predictive Modeling"] },
    { name: "Process Automation", desc: "Streamline operations with intelligent workflow automation, reducing manual tasks and improving efficiency.", features: ["Workflow Design", "Task Automation", "Process Optimization", "Integration Tools"] },
    { name: "Cloud Infrastructure", desc: "Scalable cloud solutions ensuring high availability, security, and performance for your digital transformation needs.", features: ["Cloud Migration", "Server Management", "Backup Solutions", "Security Monitoring"] }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    { quote: "Their government system solution transformed our permit processing. What used to take weeks now takes just days.", author: "Maria Santos", position: "City Administrator", rating: 5 },
    { quote: "The school management platform has revolutionized how we handle student records and parent communication.", author: "Dr. Juan Cruz", position: "School Principal", rating: 5 },
    { quote: "Outstanding support and robust solutions. Our digital transaction system has never been more reliable.", author: "Ana Reyes", position: "Business Manager", rating: 5 }
  ];

  // Product showcase with color cycling
  const productSlides = [
    { id: "light", src: LaptopLight, title: "DCSI — Light Mode", caption: "Clean, bright UI for daytime workflows." },
    { id: "dark", src: LaptopDark, title: "DCSI — Dark Mode", caption: "Dark theme optimized for low-light usage." }
  ];

  // Color cycling for images (tailwind filter utilities or custom classes)
  const colors = [
    'hue-rotate-0', 'hue-rotate-30', 'hue-rotate-60', 'hue-rotate-90',
    'hue-rotate-120', 'hue-rotate-180', 'hue-rotate-240', 'hue-rotate-300'
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: false,
    heroDesc: false,
    heroButtons: false,
    showcase: false,
    stats: false,
    services: false,
    whyChoose: false,
    testimonials: false,
    cta: false,
    footer: false
  });

  // autoplay control for the showcase
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(typeof document !== "undefined" ? !document.hidden : true);
  const autoplayIntervalMs = 4000; // change if you want a different speed
  const autoplayRef = useRef<number | null>(null);

  // Color cycling effect
  useEffect(() => {
    const interval = window.setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation for the showcase
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((p) => (p - 1 + productSlides.length) % productSlides.length);
      if (e.key === "ArrowRight") setActiveIndex((p) => (p + 1) % productSlides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [productSlides.length]);

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setVisibleSections(prev => ({ ...prev, [sectionName]: true }));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Staggered animation for hero section
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, hero: true }));
    }, 200);

    const timer2 = setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, heroDesc: true }));
    }, 800);

    const timer3 = setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, heroButtons: true }));
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Autoplay for the showcase slides (pauses when hovered or tab hidden)
  useEffect(() => {
    // clear any existing timer
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    if (!isPaused && isTabVisible && productSlides.length > 1) {
      autoplayRef.current = window.setInterval(() => {
        setActiveIndex(prev => (prev + 1) % productSlides.length);
      }, autoplayIntervalMs) as unknown as number;
    }

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPaused, isTabVisible, productSlides.length]);

  // Visibility handling (pause when the tab is hidden)
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    // set initial state in case effect ran after mount
    setIsTabVisible(!document.hidden);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const prev = () => setActiveIndex((p) => (p - 1 + productSlides.length) % productSlides.length);
  const next = () => setActiveIndex((p) => (p + 1) % productSlides.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/10"></div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 transform ${
              visibleSections.hero
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            DataLink Creative Solutions
            <span className="block text-muted-foreground">Incorporation</span>
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed transition-all duration-1000 delay-300 transform ${
              visibleSections.heroDesc
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Professional technology solutions for modern organizations across the Philippines
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 transform ${
              visibleSections.heroButtons
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
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

      {/* Product Showcase */}
      <section
        className="py-12 px-4 bg-muted/10"
        data-section="showcase"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-6 transition-all duration-1000 transform ${
              visibleSections.showcase
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Product Showcase</h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">Preview the DCSI Projects UI — light and dark modes with dynamic color effects.</p>
          </div>

          <div
            className={`bg-card border shadow-lg rounded-xl overflow-hidden transition-all duration-1000 delay-300 transform ${
              visibleSections.showcase
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Large image stage with color cycling */}
            <div
              className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center bg-transparent"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              // also pause on focus for keyboard users
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              {productSlides.map((s, i) => (
                <figure
                  key={s.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out
                    ${i === activeIndex ? "opacity-100 z-20 scale-100" : "opacity-0 z-10 scale-95"}`}
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    className={`w-full max-w-5xl h-[320px] md:h-[420px] object-contain transition-all duration-1000 filter ${colors[colorIndex]} brightness-110 saturate-125`}
                  />
                </figure>
              ))}

              {/* Navigation buttons */}
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-30 transition-all duration-300 hover:scale-110"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-30 transition-all duration-300 hover:scale-110"
              >
                ›
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {productSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-white scale-125 shadow-lg'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play indicator */}
              <div className="absolute top-4 right-4 z-30">
                <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1 text-white text-sm">
                  <div className={`w-2 h-2 rounded-full ${(!isPaused && isTabVisible) ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}></div>
                  {(!isPaused && isTabVisible) ? "Auto" : "Paused"}
                </div>
              </div>
            </div>

            {/* Caption + CTAs */}
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

            {/* Thumbnails */}
            <div className="w-full border-t px-6 py-4 flex items-center justify-center gap-3 bg-background">
              {productSlides.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-md overflow-hidden p-1 border transition-all duration-300 hover:scale-105 ${
                    i === activeIndex ? "ring-2 ring-offset-2 ring-primary" : "opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Show ${t.title}`}
                >
                  <img
                    src={t.src}
                    alt={t.title}
                    className={`w-36 h-20 object-contain bg-black/5 filter ${colors[colorIndex]} transition-all duration-1000`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 px-4 bg-background border-b"
        data-section="stats"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 transform ${
                  visibleSections.stats
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-20 px-4 bg-muted/30"
        data-section="services"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${
              visibleSections.services
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive digital solutions tailored to meet the unique needs of government institutions, educational organizations, and businesses across the Philippines.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 transform ${
              visibleSections.services
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
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

      {/* Why Choose Us Section */}
      <section
        className="py-20 px-4 bg-background"
        data-section="whyChoose"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${
              visibleSections.whyChoose
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine technical expertise with deep understanding of local requirements to deliver solutions that truly work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fast Implementation", desc: "Quick deployment with minimal disruption to your current operations" },
              { title: "Secure & Reliable", desc: "Enterprise-grade security with 99.9% uptime guarantee" },
              { title: "Local Expertise", desc: "Deep understanding of Philippine regulations and business practices" },
              { title: "24/7 Support", desc: "Round-the-clock technical support in Filipino and English" },
              { title: "Custom Solutions", desc: "Tailored systems designed specifically for your organization" },
              { title: "Scalable Growth", desc: "Solutions that grow with your organization's needs" }
            ].map((item, index) => (
              <Card
                key={index}
                className={`text-center p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 group border transform ${
                  visibleSections.whyChoose
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
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

      {/* Testimonials Section */}
      <section
        className="py-20 px-4 bg-foreground text-background"
        data-section="testimonials"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${
              visibleSections.testimonials
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Real feedback from organizations we've helped transform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-muted/10 backdrop-blur-sm border-muted/20 hover:bg-muted/20 hover:scale-105 transition-all duration-500 transform ${
                  visibleSections.testimonials
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl hover:scale-125 transition-transform duration-300">★</span>
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic leading-relaxed text-background">"{testimonial.quote}"</p>
                  <div className="border-t border-muted/20 pt-4">
                    <div className="font-bold text-background">{testimonial.author}</div>
                    <div className="text-muted-foreground">{testimonial.position}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-20 px-4 bg-muted text-center"
        data-section="cta"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-foreground transition-all duration-1000 transform ${
              visibleSections.cta
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Transform Your Organization?
          </h2>
          <p
            className={`text-xl mb-8 text-muted-foreground leading-relaxed transition-all duration-1000 delay-300 transform ${
              visibleSections.cta
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Join hundreds of organizations that have already modernized their operations with our solutions.
            Get started with a free consultation today.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 transform ${
              visibleSections.cta
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Schedule Free Consultation
            </Button>
            <Button className="px-8 py-4 text-lg border border-background font-semibold transition-all duration-300 hover:scale-105">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-4 bg-foreground text-background border-t"
        data-section="footer"
      >
        <div
          className={`max-w-6xl mx-auto grid md:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            visibleSections.footer
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <h3 className="text-xl font-bold mb-4 hover:text-primary transition-colors duration-300">DataLink Creative Solutions Incorporation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Professional technology solutions for modern organizations across the Philippines.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 hover:text-primary transition-colors duration-300">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">Government Systems</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">School Management</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">Digital Transactions</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">Data Solutions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 hover:text-primary transition-colors duration-300">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">24/7 Technical Support</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">Training & Documentation</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">System Maintenance</li>
              <li className="hover:text-background cursor-pointer transition-colors duration-300 hover:translate-x-2 transform">Consultation Services</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 hover:text-primary transition-colors duration-300">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-background transition-colors duration-300">Email: info@datalinkcreativesolutions.ph</li>
              <li className="hover:text-background transition-colors duration-300">Phone: +63 2 8888 1234</li>
              <li className="hover:text-background transition-colors duration-300">Address: San Pablo City, Laguna</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
