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
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['"Source Sans 3"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
