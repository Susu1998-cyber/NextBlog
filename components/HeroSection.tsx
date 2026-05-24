"use client";

import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* 🔹 LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Explore the Future of{" "}
            <span className="text-primary">Technology & AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Stay updated with the latest insights in{" "}
            <span className="font-medium">AI Updates</span>,{" "}
            <span className="font-medium">Tech Trends</span>, and{" "}
            <span className="font-medium">Digital Innovations</span>.
            Discover ideas that shape tomorrow.
          </p>

          <Button size="lg" className="group">
            <a href="#featured" className="flex items-center">
              Explore Blogs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

          </Button>
        </motion.div>

        {/* 🔹 RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full"
        >
          <img
            src="/images/AIblog.png"
            alt="AI Technology"
            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}