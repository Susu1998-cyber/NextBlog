import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";   

export async function GET(req: Request, { params }: any) {
  await connectDB();

  const post = await Blog.findById(params.id);

  return NextResponse.json(post);
}
