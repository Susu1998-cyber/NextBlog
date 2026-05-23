// import { NextResponse } from "next/server";

// function parseJwt(token) {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch {
//     return null;
//   }
// }

// export async function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   const publicRoutes = ["/login", "/signup"];

//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/favicon.ico")
//   ) {
//     return NextResponse.next();
//   }

//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const decoded = parseJwt(token);

//   if (!decoded) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (pathname === "/" && decoded.role === "admin") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }

//   if (pathname.startsWith("/admin") && decoded.role !== "admin") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }


import { NextRequest, NextResponse } from "next/server";

type JwtPayload = {
  role: string;
  [key: string]: unknown;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/signup"];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = parseJwt(token);

  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/" && decoded.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}