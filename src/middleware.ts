import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  "/sistema/paginas/curriculos": "/curriculos/visualizar",
  "/sistema/paginas/curriculos/novo": "/curriculos/cadastrar",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/sistema/paginas")) {
    return NextResponse.redirect(new URL("/curriculos/visualizar", request.url));
  }

  for (const [from, to] of Object.entries(REDIRECTS)) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      return NextResponse.redirect(new URL(to + pathname.slice(from.length), request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/sistema/:path*"] };
