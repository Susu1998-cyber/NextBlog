"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    toast.success("Logged out successfully 👋");

    router.push("/login");
    router.refresh(); // refresh middleware state
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-red-500 hover:text-red-600"
    >
      Logout
    </button>
  );
}