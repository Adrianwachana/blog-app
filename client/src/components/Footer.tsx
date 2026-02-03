/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import * as React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import ButterflyLogo from "./ButterflyLogo";

/**
 * Footer navigation links
 */
const FOOTER_LINKS = [
  {
    title: "Explore",
    links: ["Articles", "Travel Stories", "Photography", "Guides"],
  },
  {
    title: "Company",
    links: ["About Me", "Contact", "Privacy Policy", "Terms"],
  },
  {
    title: "Support",
    links: ["Help Center", "Newsletter", "Feedback", "Community"],
  },
] as const;

/**
 * Social media links
 */
const SOCIAL_LINKS = [
  { href: "https://facebook.com/mindyourbusinessofficial", Icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com/mindyourbusinessofficial", Icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/in/mindyourbusinessofficial", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com/mindyourbusinessofficial", Icon: Youtube, label: "YouTube" },
] as const;

/**
 * Footer component
 */
export const Footer = ({ className, ...props }: React.ComponentProps<"footer">) => {
  return (
    <footer className={`bg-foreground text-background py-16 ${className ?? ""}`} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="group-hover:scale-110 transition-transform duration-300 [&_svg]:drop-shadow-lg">
                <ButterflyLogo size="lg" />
              </div>
              <span className="font-display text-2xl font-semibold">
                Bearbubbles
              </span>
            </a>
            <p className="text-background/70 text-sm mb-6 max-w-sm">
              Sharing stories, adventures, and insights from around the world. 
              Join me on this journey of discovery and connection.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-background/70 hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Bearbubbles. All rights reserved.
          </p>

          {/* Brand display with logo */}
          <p className="text-sm text-background/60 flex items-center gap-1 font-bold">
            <ButterflyLogo size="sm" /> Bearbubbles
          </p>
        </div>
      </div>
    </footer>
  );
};
