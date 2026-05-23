// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         message: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState("");

//     const handleChange = (e: any) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         setLoading(true);
//         setSuccess("");

//         try {
//             const res = await fetch("/api/contact", {
//                 method: "POST",
//                 body: JSON.stringify(form),
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 setSuccess("Message sent successfully ✅");
//                 setForm({ name: "", email: "", message: "" });
//             } else {
//                 setSuccess(data.error || "Something went wrong");
//             }
//         } catch (err) {
//             setSuccess("Failed to send message ❌");
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-16">
//             <div className="max-w-3xl mx-auto">
//                 <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

//                 <p className="text-muted-foreground mb-8">
//                     Have questions or feedback? We'd love to hear from you!
//                 </p>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-card border rounded-xl p-8 space-y-6"
//                 >
//                     <input
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Your Name"
//                         className="w-full p-3 border rounded-lg bg-background"
//                         required
//                     />

//                     <input
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="Your Email"
//                         type="email"
//                         className="w-full p-3 border rounded-lg bg-background"
//                         required
//                     />

//                     <textarea
//                         name="message"
//                         value={form.message}
//                         onChange={handleChange}
//                         placeholder="Your Message"
//                         rows={5}
//                         className="w-full p-3 border rounded-lg bg-background"
//                         required
//                     />

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
//                     >
//                         {loading ? "Sending..." : "Send Message"}
//                     </button>

//                     {success && (
//                         <p className="text-center text-sm text-muted-foreground">
//                             {success}
//                         </p>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Message sent successfully ✅");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess(data.error || "Something went wrong");
      }
    } catch (err: unknown) {
      setSuccess("Failed to send message ❌");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-muted-foreground mb-8">
          Have questions or feedback? We would love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-card border rounded-xl p-8 space-y-6"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg bg-background"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            type="email"
            className="w-full p-3 border rounded-lg bg-background"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 border rounded-lg bg-background"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-center text-sm text-muted-foreground">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}