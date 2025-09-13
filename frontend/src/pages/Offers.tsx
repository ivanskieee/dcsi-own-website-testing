import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Offers() {
  const offers = [
    {
      title: "Local Gov Unit Starter Pack",
      price: "₱120,000",
      bullets: ["E-permits", "Tax module", "Document management", "1 year support"],
    },
    {
      title: "Edu Platform Basic",
      price: "₱80,000",
      bullets: ["SIS", "Grades & Attendance", "Parent portal", "Training included"],
    },
    {
      title: "Payments & Transactions",
      price: "₱60,000",
      bullets: ["QR / Online Payments", "Transaction Reporting", "Secure gateway"],
    }
  ];

  return (
    <div className="min-h-screen bg-background/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Offers & Packages</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Hand-picked packages to help organizations start their digital transformation. Each package can be customized to fit your needs.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((o, i) => (
            <Card key={i} className="shadow-md border hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-foreground">{o.title}</h3>
                  <div className="text-lg font-semibold text-foreground">{o.price}</div>
                </div>

                <ul className="mt-4 text-muted-foreground space-y-2">
                  {o.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-foreground mr-3"></span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  <Link to="/">
                    <Button className="px-4 py-2 bg-background text-foreground border">Learn More</Button>
                  </Link>
                  <Button className="px-4 py-2 bg-foreground text-background">Request Quote</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
