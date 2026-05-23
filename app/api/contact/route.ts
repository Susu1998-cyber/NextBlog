// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     // 🔐 Configure transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // ✉️ Email content
//     await transporter.sendMail({
//       from: `"Blog Contact" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: `New Contact Message from ${name}`,
//       replyTo: email,
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Message: ${message}
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Email failed to send" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Request body type
type ContactBody = {
  name: string;
  email: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const { name, email, message } = body;

    // 🔐 Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✉️ Email content
    await transporter.sendMail({
      from: `"Blog Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Email failed to send";

    console.error(errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}