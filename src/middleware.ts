import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_INTERNAL_PATHS = [
  "/sistema/paginas",
];

const REDIRECTS: Record<string, string> = {
  "/sistema/paginas/curriculos": "/curriculos/visualizar",
  "/sistema/paginas/curriculos/novo": "/curriculos/cadastrar",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const path of PROTECTED_INTERNAL_PATHS) {
    if (pathname.startsWith(path)) {
      return NextResponse.redirect(new URL("/curriculos/visualizar", request.url));
    }
  }

  for (const [from, to] of Object.entries(REDIRECTS)) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      const rest = pathname.slice(from.length);
      return NextResponse.redirect(new URL(to + rest, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sistema/:path*",
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
