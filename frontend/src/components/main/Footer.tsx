import React from "react";
import { usePageEffects } from "./usePageEffects";

export default function Footer(): React.ReactElement {
  const { visibleSections } = usePageEffects();

  return (
    <footer className="py-12 px-4 bg-background text-foreground border-t" data-section="footer">
      <div className={`max-w-6xl mx-auto grid md:grid-cols-4 gap-8 transition-all duration-1000 transform ${visibleSections.footer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div>
          <h3 className="text-xl font-bold mb-4 hover:text-primary transition-colors duration-300">DataLink Creative Solutions Incorporation</h3>
          <p className="text-muted-foreground leading-relaxed">Professional technology solutions for modern organizations across the Philippines.</p>
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
  );
}