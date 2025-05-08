/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'background': '#121212',
        'card': '#1e1e1e',
        'primary': '#ff3e9d',
        'secondary': '#9d00ff',
        'accent': '#7000ff',
      },
      fontFamily: {
        sans: ['Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, #ff3e9d, #9d00ff)',
      }
    },
  },
  plugins: [],
}
