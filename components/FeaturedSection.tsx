// "use client";

// import { useEffect, useState } from "react";
// import * as motion from "motion/react-client";
// import { Card, CardContent, CardHeader } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { ArrowRight, Calendar } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function FeaturedSection({ selectedCategory }: { selectedCategory: string | null }) {
//   const [posts, setPosts] = useState([]);

//   const filteredPosts = selectedCategory
//     ? posts.filter((post: any) => post.category === selectedCategory)
//     : posts;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/posts");
//         const data = await res.json();

//         setPosts(data); // ✅ API already formatted
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
//             Featured Insights
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Curated thoughts and discoveries from the intersection of
//             technology, design, and human experience.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {filteredPosts.length === 0 ? (
//             <p className="text-center col-span-2 text-muted-foreground">
//               No posts available
//             </p>
//           ) : (
//             filteredPosts.map((post: any, index: number) => (
//               <motion.div
//                 key={post.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-xs py-0">
//                   <CardHeader className="p-0">
//                     <div className="relative">
//                       <div className="w-full h-48 relative">
//                         <Image
//                           fill
//                           src={post.image || "/placeholder.jpg"}
//                           alt={post.title}
//                           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                       </div>

//                       <div className="absolute top-4 left-4">
//                         <Badge
//                           variant="secondary"
//                           className="bg-background/80 backdrop-blur-xs"
//                         >
//                           {post.category}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>

//                   <CardContent className="p-6">
//                     <div className="flex items-center text-sm text-muted-foreground mb-3">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       {post.date}
//                     </div>

//                     <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
//                       {post.title}
//                     </h3>

//                     <p className="text-muted-foreground mb-4 line-clamp-3">
//                       {post.excerpt}
//                     </p>

//                     <Link href={`/blog/${post.id}`}>
//                       <div className="flex items-center text-primary font-medium group-hover:underline">
//                         Read more
//                         <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                       </div>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export default function FeaturedSection({ selectedCategory }: { selectedCategory: string | null }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const filteredPosts = selectedCategory
    ? posts.filter((post: Post) => post.category === selectedCategory)
    : posts;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Featured Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated thoughts and discoveries from the intersection of
            technology, design, and human experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.length === 0 ? (
            <p className="text-center col-span-2 text-muted-foreground">
              No posts available
            </p>
          ) : (
            filteredPosts.map((post: Post, index: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-xs py-0">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <div className="w-full h-48 relative">
                        <Image
                          fill
                          src={post.image || "/images/placeholder.jpg"}
                          alt={post.title}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-xs"
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.id}`}>
                      <div className="flex items-center text-primary font-medium group-hover:underline">
                        Read more
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}