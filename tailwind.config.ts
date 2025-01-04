import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        body: "#F7F7F5",
        gray: {
          1: "#4A4A4A",
          2: "#767676",
          3: "#A4A4A4",
          4: "#EBEBEB",
          5: "#F8F8F8",
        },
        brand: {
          1: "#022213",
          2: "#ADDE34",
          3: "#F8981D",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
