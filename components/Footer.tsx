"use client";

import { useState } from "react";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  // ✅ 1. State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ 2. API Call
  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ⚠️ important
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subscribed successfully ✅");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to subscribe ❌");
    }

    setLoading(false);
  };

  return (
    <footer className="bg-background border-t border-border/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

          {/* LEFT */}
          <div className="w-full md:w-1/2">
            <h4 className="font-semibold text-foreground mb-5 text-lg">
              Stay Updated
            </h4>

            <p className="text-muted-foreground mb-5 leading-relaxed">
              Get the latest articles, insights, and updates delivered straight
              to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* ✅ 3. Bind input */}
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* ✅ 4. Button click */}
              <Button
                className="whitespace-nowrap"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {/* ✅ 5. Message */}
            {message && (
              <p className="mt-3 text-sm text-muted-foreground">
                {message}
              </p>
            )}
          </div>

          {/* RIGHT (unchanged) */}
          <div className="w-full md:w-1/2 md:text-right">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4 tracking-tight">
              Nexora
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6 md:ml-auto max-w-md">
              Writing that resonates with curious minds. Exploring technology,
              design, and creativity in the digital age.
            </p>

            <div className="flex gap-3 md:justify-end">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="p-2 rounded-lg border border-border bg-muted/30 hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground text-center">
          <p>
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}