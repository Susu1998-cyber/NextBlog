// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {toast} from "sonner";

// export default function Login() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
// const res = await fetch("/api/auth/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   credentials: "include", // 🔥 VERY IMPORTANT
//   body: JSON.stringify(form),
// });

//     const data = await res.json();

//     if (data.success) {
//       toast.success("Logged in successfully 🎉");

//       if (data.role === "admin") {
//         router.push("/admin");
//       } else {
//         router.push("/");
//       }
//     } else {
//       // ❌ Login failed
//       toast.error(data.message || "Invalid email or password ❌");
//     }
//   } catch (err) {
//     // ❌ Network / server error
//     toast.error("Something went wrong. Please try again ❌");
//     console.error(err);
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
//         <h1 className="text-2xl font-serif font-bold text-center mb-6">
//           Welcome Back
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-lg border border-border bg-background"
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-lg border border-border bg-background"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           <button className="w-full bg-foreground text-background py-3 rounded-lg hover:opacity-90 transition">
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-center text-muted-foreground mt-4">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => router.push("/signup")}
//             className="underline cursor-pointer"
//           >
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Logged in successfully 🎉");

        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        toast.error(data.message || "Invalid email or password ❌");
      }
    } catch (err: unknown) {
      toast.error("Something went wrong. Please try again ❌");
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-foreground text-background py-3 rounded-lg hover:opacity-90 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}