/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'diagonal-stripes': 'repeating-linear-gradient(45deg, #3B82F6 0px, #3B82F6 20px, #E5E7EB 20px, #E5E7EB 40px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

