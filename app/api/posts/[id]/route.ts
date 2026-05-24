// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";   

// export async function GET(req: Request, { params }: any) {
//   await connectDB();

//   const post = await Blog.findById(params.id);

//   return NextResponse.json(post);
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const post = await Blog.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

        const formattedPost = {
      id: post._id.toString(), // ✅ use id consistently
      title: post.title,
      description: post.description,
      category: post.category,
      image: post.image,
      date: post.createdAt
        ? new Date(post.createdAt).toDateString()
        : "",
    };

    return NextResponse.json({
      success: true,
       data: formattedPost,
    });

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}