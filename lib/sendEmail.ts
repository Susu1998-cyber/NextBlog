// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendNewBlogEmail(to: string, blog: any) {
//   const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog._id}`;

//   await transporter.sendMail({
//     from: `"Nexora Blog" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: `🚀 New Blog Published: ${blog.title}`,
//     html: `
//       <h2>${blog.title}</h2>
//       <p>${blog.description}</p>
//       <a href="${blogUrl}" target="_blank">Read Full Article</a>
//       <br/><br/>
//       <small>If you no longer want these emails, you can unsubscribe anytime.</small>
//     `,
//   });
// }

import nodemailer from "nodemailer";

type Blog = {
  _id: string;
  title: string;
  description: string;
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendNewBlogEmail(to: string, blog: Blog) {
  const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog._id}`;

  await transporter.sendMail({
    from: `"Nexora Blog" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🚀 New Blog Published: ${blog.title}`,
    html: `
      <h2>${blog.title}</h2>
      <p>${blog.description}</p>
      <a href="${blogUrl}" target="_blank">Read Full Article</a>
      <br/><br/>
      <small>If you no longer want these emails, you can unsubscribe anytime.</small>
    `,
  });
}