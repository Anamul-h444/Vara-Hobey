

export const theme = {
  colors: {
    bg: "bg-[#0b0f17]", // Leonardo AI Deep Dark Background
    card: "bg-[#161b26]", // Card Background
    sidebar: "bg-[#11151f]", // Sidebar Background
    border: "border-slate-800/80", // Subtle Borders
    accent: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    textHeading: "text-white",
    textBody: "text-slate-400",
  },
  typography: {
    heroTitle: "text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white",
    subTitle: "text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto",
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};