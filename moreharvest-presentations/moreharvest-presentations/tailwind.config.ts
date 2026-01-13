import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#FBB931',
          orange: '#FF9424',
        },
        interaction: {
          error: '#D03131',
          success: '#19B64E',
          disabled: '#8E8F8F',
          hyperlink: '#1282C0',
        },
        base: {
          black: '#1E1F20',
          white: '#FEFEFE',
          background: '#F9F9F9',
          header: '#EDEEF1',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#EDEEF1',
          200: '#D8DBDF',
          300: '#B6BAC3',
          400: '#8E95A2',
          500: '#6B7280',
          600: '#5B616E',
          700: '#4A4E5A',
          800: '#40444C',
          900: '#383A42',
          950: '#25272C',
        },
      },
      fontFamily: {
        heading: ['var(--font-rem)', 'sans-serif'],
        body: ['var(--font-noto-jp)', 'sans-serif'],
        zhTC: ['var(--font-noto-tc)', 'sans-serif'],
        zhSC: ['var(--font-noto-sc)', 'sans-serif'],
      },
      fontSize: {
        h1: 'clamp(2.4rem, 4vw, 2.5rem)',
        h2: 'clamp(2.1rem, 3.5vw, 2.2rem)',
        h3: 'clamp(1.7rem, 3vw, 1.8rem)',
        h4: 'clamp(1.45rem, 2.5vw, 1.5rem)',
        h5: 'clamp(1.2rem, 2vw, 1.25rem)',
        bodyL: 'clamp(1.15rem, 1.5vw, 1.2rem)',
        bodyM: 'clamp(1rem, 1vw, 1rem)',
        bodyS: 'clamp(0.83rem, 0.8vw, 0.85rem)',
        bodyXS: 'clamp(0.75rem, 0.7vw, 0.75rem)',
        labelL: '1rem',
        labelM: '0.875rem',
      },
      letterSpacing: {
        tight: '0.0025em',
      },
      lineHeight: {
        heading: '1.25',
        body: '1.5',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
