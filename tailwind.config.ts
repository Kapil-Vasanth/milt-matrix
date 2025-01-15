import type { Config } from "tailwindcss";
import preline from "preline";

export default {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    function () {
      if (typeof window !== "undefined" && typeof self !== "undefined") {
        const preline = require("preline");
        return preline;
      }
      return () => {}; // Return a no-op function for server-side environments
    },
  ],
} satisfies Config;
