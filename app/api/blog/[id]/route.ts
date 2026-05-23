// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// // ✏️ UPDATE BLOG
// export async function PUT(req: Request, { params }: any) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const updated = await Blog.findByIdAndUpdate(
//       params.id,
//       body,
//       { new: true }
//     );

//     return NextResponse.json({ success: true, data: updated });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, error: err.message });
//   }
// }

// // 🗑️ DELETE BLOG
// export async function DELETE(req: Request, { params }: any) {
//   try {
//     await connectDB();

//     await Blog.findByIdAndDelete(params.id);

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, error: err.message });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// ✅ Define params type
type Params = {
  params: {
    id: string;
  };
};

// ✏️ UPDATE BLOG
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";

    return NextResponse.json({ success: false, error: errorMessage });
  }
}

// 🗑️ DELETE BLOG
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";

    return NextResponse.json({ success: false, error: errorMessage });
  }
}