/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-pink': '#d1a8ff',
        'custom-green': '#a5f3dc',
      },
      backgroundImage: {
        'gradient-to-pink': 'linear-gradient(to right, #a5f3dc, #d1a8ff)',
      },
      fontFamily: {
        poppins: ['Poppins', 'serif'],
        robotoslab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
};
