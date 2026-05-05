/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8ef',
          100: '#f9edda',
          200: '#f3dbb5',
          300: '#ebc286',
          400: '#e3a356',
          500: '#d9812f',
          600: '#c76625',
          700: '#a54e20',
          800: '#853f20',
          900: '#6d351d',
          950: '#3b1a0d',
        },
        accent: {
          gold: '#C5A059',
          navy: '#1B263B',
          soft: '#F8F5F2'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
