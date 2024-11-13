import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        burn: "#EC5E32",
        burnLighter: "#F5B29E",
        burnLight: "#F18E78",
        burnDark: "#B14423",
        deep: "#1D1D2E"
      },
      keyframes: {
        vibe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }, // Slightly bigger at the middle of the animation
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }, // Full rotation
        },
        rotaterrr: {
          '0%': { transform: 'rotate(50deg)' },
          '100%': { transform: 'rotate(14deg)' },
        },
      },
      animation: {
        pulse: 'vibe 1s infinite', // Pulses every second
        rotate: 'rotate 5s linear infinite',   // Slow rotation over 10 seconds
        rotateonefour: 'rotaterrr 2s linear forwards',
      },
      animationDelay: {
        '3100': '3.1s',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;