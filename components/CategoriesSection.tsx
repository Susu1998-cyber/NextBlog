"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { categories } from "@/lib/data";
import { Badge } from "./ui/badge";


type CategoryApiItem = {
  _id: string;
  count: number;
};

export default function CategoriesSection({
  onSelectCategory,
}: {
  onSelectCategory: (category: string | null) => void;
}) {
  const [categoriesData, setCategoriesData] = useState(categories);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        // ✅ Merge API counts with static categories
        const updated = categories.map((cat) => {

          if (cat.name === "All") {
            const total = data.reduce(
              (sum: number, item: CategoryApiItem) => sum + item.count,
              0
            );

            return {
              ...cat,
              count: total,
            };
          }

          const found = data.find((item: CategoryApiItem) => item._id === cat.name);

          return {
            ...cat,
            count: found ? found.count : 0,
          };
        });

        setCategoriesData(updated);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">

        {/* 🔹 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Categories
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest in AI, technology, and digital innovation.
          </p>
        </motion.div>

        {/* 🔹 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group cursor-pointer"
                  onClick={() =>
                    onSelectCategory(category.name === "All" ? null : category.name)
                  }>
                  <div className="bg-card rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border">

                    {/* ✅ ICON */}
                    <div className="mb-4 flex justify-center">
                      <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition" />
                    </div>

                    <h3 className="font-semibold mb-2 group-hover:text-primary transition">
                      {category.name}
                    </h3>

                    {/* ✅ Dynamic Count */}
                    <Badge variant="outline" className="text-xs">
                      {category.count} posts
                    </Badge>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}