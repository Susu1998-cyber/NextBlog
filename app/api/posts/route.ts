import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    const posts = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      excerpt: blog.description,
      category: blog.category,
      image: blog.image,
      date: blog.createdAt.toDateString(),
      isFeatured: true, // optional (you can control later)
    }));

    return NextResponse.json(posts); // 👈 SIMPLE response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
