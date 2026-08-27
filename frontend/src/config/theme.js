

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
    heroTitle: "text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white", // ডেস্কটপের জন্য সাইজ বাড়িয়ে দেওয়া হয়েছে
    subTitle: "text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto", // বড় স্ক্রিনে আরও রিডেবল করা হয়েছে
    sectionTitle: "text-2xl sm:text-3xl lg:text-4xl font-bold text-white",
    bodyText: "text-sm sm:text-base text-slate-400",
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
      fontSize: {
        'hero-desktop': ['3.75rem', { lineHeight: '1.1' }],
      }
    },
  },
  plugins: [],
};