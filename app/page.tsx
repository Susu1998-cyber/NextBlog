"use client";

import { useState } from "react";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import QuotesSection from "@/components/QuotesSection";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <CategoriesSection onSelectCategory={setSelectedCategory} />
        <FeaturedSection selectedCategory={selectedCategory} />
        <QuotesSection />
      </main>
    </div>
  );
}