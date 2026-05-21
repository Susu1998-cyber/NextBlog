"use client";

import { quotes } from "@/lib/data";
import { Quote } from "lucide-react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export default function QuotesSection() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    // set first random quote AFTER mount
    setQuote(getRandomQuote());

    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          key={quote.text} // 🔥 triggers animation on change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-10 md:p-14 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <Quote className="h-12 w-12 text-primary/40 group-hover:scale-110 transition-transform" />
            </div>

            {/* Quote Text with Gradient */}
            <blockquote className="text-2xl md:text-3xl font-serif font-semibold leading-relaxed mb-8 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              “{quote.text}”
            </blockquote>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-primary/40 mx-auto mb-6 rounded-full" />

            {/* Author */}
            <cite className="text-lg text-muted-foreground font-medium not-italic tracking-wide">
              — {quote.author}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}