import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  const token = process.env.ADMIN_TOKEN || password;

  if (!password && !process.env.ADMIN_TOKEN) {
    return new NextResponse(
      "Admin não configurado. Defina ADMIN_PASSWORD ou ADMIN_TOKEN.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ") && password) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      const pass = sep >= 0 ? decoded.slice(sep + 1) : decoded;
      if (pass === password) return NextResponse.next();
    } catch {
      /* fall through */
    }
  }

  const q = req.nextUrl.searchParams.get("token") || req.nextUrl.searchParams.get("admin");
  if (token && q && q === token) {
    const res = NextResponse.next();
    res.cookies.set("keeus_admin", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/admin",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }

  const cookie = req.cookies.get("keeus_admin")?.value;
  if (token && cookie && cookie === token) {
    return NextResponse.next();
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Keeus Admin"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
