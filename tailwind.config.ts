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
          primary: "#9d4e15",

          secondary: "#276e0f",

          accent: "#4c159d",

          neutral: "#261726",

          "base-100": "#FFFFFF",

          info: "#4f66c9",

          success: "#169886",

          warning: "#f7d955",

          error: "#e94e72",
        },
      },
    ],
  },
} satisfies Config;
