import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Offers() {
  const offers = [
    {
      title: "Local Gov Unit",
      price: "₱120,000",
      bullets: ["E-permits", "Tax module", "Document management", "1 year support"],
    },
    {
      title: "Edu Platform Basic",
      price: "₱80,000",
      bullets: ["SIS", "Grades & Attendance", "Parent portal", "Training included"],
    },
    {
      title: "Payments Gateway",
      price: "₱60,000",
      bullets: ["QR / Online Payments", "Transaction Reporting", "Secure gateway", "Integration support"],
    },
  ];

  return (
    <section className="min-h-screen bg-background/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Offers & Packages
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hand-picked packages to help organizations start their digital
            transformation. Each package can be customized to fit your needs.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer, i) => (
            <Card
              key={i}
              className="border border-muted-foreground shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                  <span className="text-lg font-semibold text-foreground">{offer.price}</span>
                </div>

                <ul className="mt-4 text-muted-foreground space-y-3 flex-1">
                  {offer.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-foreground mr-3 flex-shrink-0"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/" aria-label={`Learn more about ${offer.title}`}>
                    <Button className="px-4 py-2 bg-background text-foreground border hover:bg-foreground hover:text-background transition-colors">
                      Learn More
                    </Button>
                  </Link>
                  <Button className="px-4 py-2 text-background hover:bg-foreground/90 transition-colors" aria-label={`Request a quote for ${offer.title}`}>
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
