import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Subscriber from "@/models/Subscriber";
import { sendNewBlogEmail } from "@/lib/sendEmail";

// ✅ CREATE BLOG
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, category, image } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: "All fields required" },
        { status: 400 }
      );
    }

    // ✅ Create Blog
    const blog = await Blog.create({
      title,
      description,
      category,
      image,
    });

    // 🔥 SEND EMAILS (non-blocking)
    setTimeout(async () => {
      try {
        const subscribers = await Subscriber.find({ status: "active" });

        console.log(`📧 Sending emails to ${subscribers.length} subscribers`);

        await Promise.all(
          subscribers.map((sub) =>
            sendNewBlogEmail(sub.email, blog)
          )
        );

        console.log("✅ Emails sent successfully");
      } catch (err) {
        console.error("❌ Email sending failed:", err);
      }
    }, 0);

    return NextResponse.json({
      success: true,
      data: blog,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET ALL BLOGS
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}