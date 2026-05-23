// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export async function GET() {
//   try {
//     await connectDB();

//     const blogs = await Blog.find().sort({ createdAt: -1 });

//     const posts = blogs.map((blog) => ({
//       id: blog._id,
//       title: blog.title,
//       excerpt: blog.description,
//       category: blog.category,
//       image: blog.image,
//       date: blog.createdAt.toDateString(),
//       isFeatured: true, // optional (you can control later)
//     }));

//     return NextResponse.json(posts); // 👈 SIMPLE response
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// ✅ Define response type
type BlogResponse = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  isFeatured: boolean;
};

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    const posts: BlogResponse[] = blogs.map((blog: any) => ({
      id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.description,
      category: blog.category,
      image: blog.image,
      date: blog.createdAt ? new Date(blog.createdAt).toDateString() : "",
      isFeatured: true,
    }));

    return NextResponse.json(posts);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
