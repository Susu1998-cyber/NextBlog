// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { SignJWT } from "jose";
// import { NextResponse,NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     await connectDB();

//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return NextResponse.json({ success: false, message: "Invalid credentials" });
//     }

//     const secret = process.env.JWT_SECRET;

//     const token = await new SignJWT({ id: user._id, role: user.role })
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("1d")
//       .sign(new TextEncoder().encode(secret));

//     const res = NextResponse.json({ success: true, role: user.role });

//     res.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//     });

//     return res;
//   } catch (err) {
//     return NextResponse.json({ success: false, error: err.message });
//   }
// }

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET as string; // ✅ add type safety

    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(secret));

    const res = NextResponse.json({ success: true, role: user.role });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err) { // optional quick fix
  const errorMessage =
    err instanceof Error ? err.message : "Internal server error";

  return NextResponse.json({ success: false, error: errorMessage });
  }
}