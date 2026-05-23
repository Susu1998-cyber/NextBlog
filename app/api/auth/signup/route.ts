// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password, role } = await req.json();

//     await connectDB();

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       role,
//     });

//     return NextResponse.json({ success: true, user });
//   } catch (err) {
//     const errorMessage =
//       err instanceof Error ? err.message : "Internal server error";

//     return NextResponse.json({ success: false, error: errorMessage });
//   }
// }
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"; // ✅ add this

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

export async function POST(req: NextRequest) { // ✅ fix here
  try {
    const body: RegisterBody = await req.json();
    const { name, email, password, role } = body;

    await connectDB();

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    return NextResponse.json({ success: true, user });

  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";

    return NextResponse.json({ success: false, error: errorMessage });
  }
}