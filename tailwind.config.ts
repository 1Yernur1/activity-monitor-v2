import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "600px",
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateRows: {
        projects: "4rem 1fr",
        xs: "3rem 1fr",
      },
    },
  },
};
export default config;
