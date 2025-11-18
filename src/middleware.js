import { NextResponse } from "next/server";

export async function middleware(req) {

  const url = req.nextUrl;
  const token = req.cookies.get("userToken")?.value;

  const isAuthRouteLogin = url.pathname.startsWith("/login");
  const isAuthRouteRegister = url.pathname.startsWith("/register")
  const isProtectedRoute = url.pathname.startsWith("/chat");

  // 1. Se rota protegida e não tem token → redireciona para login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Se tem token → valida no backend
  if (token) {
    try {
      const res = await fetch("http://localhost:3001/session", {
        method: "GET",
        headers: {
          cookie: req.headers.get("cookie")
        }
      });

      // token inválido
      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // se token é válido, mas está indo para /login → manda para /chat
      if (isAuthRouteLogin || isAuthRouteRegister) {
        return NextResponse.redirect(new URL("/chat", req.url));
      }

      return NextResponse.next();

    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/chat", "/login", "/register"],
};
