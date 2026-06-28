import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#FEF9F5",
        "surface-mid": "#FFF3EA",
        "surface-dark": "#FDE8D8",
        foreground: "#1A1A1A",
        "foreground-mid": "#555555",
        muted: "#999999",
        border: "#E8E3DF",
        "border-mid": "#D4CECA",
        accent: "#f43f5e",
        "accent-hover": "#e11d48",
        "accent-light": "#fff1f2",
        "accent-fore": "#FFFFFF",
        success: "#16A34A",
        signal: "#F59E0B",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "24px",
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config;
