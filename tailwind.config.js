/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"], // aplica como padrão
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        'meu-roxo': '#803EFF'
      }
    },
  },
  plugins: [],
}
