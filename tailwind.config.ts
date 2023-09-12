import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bedrock: {
          primary: "#a16207",

          secondary: "#d9f99d",

          accent: "#60a5fa",

          neutral: "#1d1320",

          "base-100": "#ffffff",

          info: "#a9daea",

          success: "#22c55e",

          warning: "#fbbf24",

          error: "#f52e3b",
        },
      },
    ],
  },
} satisfies Config;
