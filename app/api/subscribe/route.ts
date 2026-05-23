// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Subscriber from "@/models/Subscriber";

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     // ✅ Check if already exists
//     const existing = await Subscriber.findOne({ email });

//     if (existing) {
//       return NextResponse.json(
//         { error: "Already subscribed" },
//         { status: 400 }
//       );
//     }

//     // ✅ Create new subscriber
//     await Subscriber.create({ email });

//     return NextResponse.json({
//       success: true,
//       message: "Subscribed successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

// ✅ Request body type
type SubscribeBody = {
  email: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: SubscribeBody = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ Check if already exists
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 400 }
      );
    }

    // ✅ Create new subscriber
    await Subscriber.create({ email });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    console.error(errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}