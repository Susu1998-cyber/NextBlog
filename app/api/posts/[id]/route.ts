// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";   

// export async function GET(req: Request, { params }: any) {
//   await connectDB();

//   const post = await Blog.findById(params.id);

//   return NextResponse.json(post);
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const post = await Blog.findById(params.id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}