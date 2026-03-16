/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#1B2E4B',
                'warm-white': '#FAFAF7',
                'fnu-gold': '#C9A84C',
                'soft-blue': '#E6F0FF',
                'primary-blue': '#3B82F6',
                'teal-glow': '#2DD4BF',
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['"Source Sans 3"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
