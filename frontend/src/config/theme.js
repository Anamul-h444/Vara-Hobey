export const theme = {
  colors: {
    bg: "bg-[#0b0f17]",
    card: "bg-[#161b26]",
    sidebar: "bg-[#11151f]",
    border: "border-slate-800/80",

    accent:
      "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-200",

    textHeading: "text-slate-100 font-bold", // একদম উজ্জ্বল সাদার বদলে আরামদায়ক টেক্সট
    textBody: "text-slate-300 font-medium", // বডি টেক্সট আরও স্পষ্ট করা হলো
  },

  typography: {
    heroTitle:
      "text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight",

    subTitle:
      "text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed", // ফন্ট সাইজ ও রিডেবিলিটি বৃদ্ধি

    sectionTitle:
      "text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 tracking-wide",

    bodyText: "text-sm sm:text-base text-slate-300 leading-relaxed",
  },
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
        "spin-slow": "spin 5s linear infinite",
        "hero-title": "heroTitle 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "hero-search":
          "heroSearch 0.8s cubic-bezier(0.22, 1, 0.36, 1) 120ms both",
        "hero-filter":
          "heroFilter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 220ms both",
      },

      keyframes: {
        heroTitle: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        heroSearch: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroFilter: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      fontSize: {
        "hero-desktop": [
          "3.75rem",
          {
            lineHeight: "1.1",
          },
        ],
      },
    },
  },

  plugins: [],
};
