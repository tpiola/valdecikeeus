import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "keeus_admin_session";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

/**
 * Admin auth — fail-closed.
 * - No ?token= / ?admin= query auth (URL tokens leak via logs/Referer).
 * - HTTP Basic issues an opaque HttpOnly session cookie (hash, not the secret).
 */
export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;
  if (!password && !adminToken) {
    return new NextResponse(
      "Admin não configurado. Defina ADMIN_PASSWORD (recomendado) no ambiente.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const expectedSession = sha256(
    password ? `keeus-admin:${password}` : `keeus-admin-token:${adminToken}`
  );

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (cookie && safeEqualHex(cookie, expectedSession)) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      const pass = sep >= 0 ? decoded.slice(sep + 1) : decoded;
      const ok =
        (password && pass === password) || (adminToken && pass === adminToken);
      if (ok) {
        const res = NextResponse.next();
        res.cookies.set(ADMIN_COOKIE, expectedSession, {
          httpOnly: true,
          sameSite: "strict",
          path: "/admin",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 12,
        });
        return res;
      }
    } catch {
      /* fall through */
    }
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
