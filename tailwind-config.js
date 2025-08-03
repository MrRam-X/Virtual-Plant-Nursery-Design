// Planto - Custom Tailwind CSS Configuration

tailwind.config = {
  theme: {
    extend: {
      colors: {
        "brand-green": "#0A3026",
        "brand-green-light": "#1E473C",
        "brand-accent": "#F3A33D",
        "brand-off-white": "#F8F7F4",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-out-right": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(20px)" },
        },
      },
      animation: {
        "fade-in-right": "fade-in-right 0.3s ease-out forwards",
        "fade-out-right": "fade-out-right 0.3s ease-in forwards",
      },
    },
  },
};
