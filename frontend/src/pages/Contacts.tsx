import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Get in touch with us for inquiries, partnerships, or support. We’d love to hear from you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        {/* Inquiry Form */}
        <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-2 bg-background text-foreground h-28"
                required
              />

              <div className="flex gap-3 mt-4 justify-center">
                <Button
                  type="submit"
                  className="px-4 py-2 text-background hover:bg-foreground/90 transition-colors"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Inquiry"}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => setForm({ name: "", email: "", message: "" })}
                  className="px-4 py-2 border  transition-colors"
                >
                  Reset
                </Button>
              </div>

              {status === "success" && (
                <p className="text-green-600 mt-3 text-center">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-600 mt-3 text-center">Something went wrong. Try again.</p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0 h-full flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.123456789!2d121.324567!3d14.074567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397abcde1234567%3A0xabcdef1234567890!2sSPC%20Medical%2C%20San%20Pablo%20City!5e0!3m2!1sen!2sph!4v1695123456789"
              width="100%"
              height="100%"
              className="block w-full h-full"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SPC Medical - San Pablo City"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
