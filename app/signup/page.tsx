

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // role: "user",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("API not found or server error");
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully 🎉");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err: unknown) {
      toast.error("Something went wrong ❌");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* <select
            className="w-full p-3 rounded-lg border border-border bg-background"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          <button className="w-full bg-foreground text-background py-3 rounded-lg hover:opacity-90 transition">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}