"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navigation from "./Navigation";
import AdminNavbar from "./AdminNavbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Admin Navbar */}
      {isAdmin && <AdminNavbar />}

      {/* ✅ User Navbar */}
      {!isAuthPage && !isAdmin && <Navigation />}

      {children}

      {/* ✅ Footer only for users */}
      {!isAuthPage && !isAdmin && <Footer />}
    </>
  );
}