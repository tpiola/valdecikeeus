import type { MetadataRoute } from "next";

const SITE_URL = "https://valdecikeeus.vercel.app";

// Public catalog policy: searchable, with model training kept separate.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Keep /admin/ disallowed for a future admin area (route not shipped yet).
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
