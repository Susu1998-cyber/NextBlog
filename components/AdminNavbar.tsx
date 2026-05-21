"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      toast.success("Logged out successfully 👋");

      router.replace("/login");
    } catch (err) {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <div className="w-full bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Panel</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:opacity-90"
      >
        Logout
      </button>
    </div>
  );
}