import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/signup"];

    if (
    pathname.startsWith("/_next") ||   // 🔥 FIX
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }
  
  // ✅ Allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ❌ No token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const url = req.nextUrl.clone();

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    if (pathname === "/" && payload.role === "admin") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
