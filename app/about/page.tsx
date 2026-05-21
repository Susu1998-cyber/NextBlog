"use client";

import * as motion from "motion/react-client";
import { BookOpen, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">

        {/* 🔥 HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About This Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A space where technology, creativity, and ideas come together to
            inspire, inform, and innovate.
          </p>
        </motion.div>

        {/* 📖 ABOUT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This blog was created to explore the ever-evolving world of
            technology and digital innovation. From AI breakthroughs to modern
            development practices, we aim to simplify complex ideas into
            meaningful insights.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a developer, tech enthusiast, or curious learner,
            you'll find valuable content that helps you stay ahead in the
            digital world.
          </p>
        </motion.div>

        {/* 🌟 FEATURES / VALUES */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: BookOpen,
              title: "Quality Content",
              desc: "Well-researched and practical insights on modern tech.",
            },
            {
              icon: Sparkles,
              title: "Latest Trends",
              desc: "Stay updated with AI, web, and digital innovations.",
            },
            {
              icon: Users,
              title: "Community Focus",
              desc: "Built for learners, creators, and developers.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 🚀 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-primary/10 to-purple-500/10 border rounded-2xl p-10"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Join the Journey
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore articles, gain insights, and grow with the future of
            technology.
          </p>

          <a
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Explore Blog
          </a>
        </motion.div>

      </div>
    </div>
  );
}