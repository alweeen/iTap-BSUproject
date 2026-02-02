/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lavender: '#E6E6FA',
                mint: '#98FF98',
                sage: '#9DC183',
                cream: '#FFFDD0',
                charcoal: '#36454F',
            },
            fontFamily: {
                playful: ['Outfit', 'Quicksand', 'sans-serif'],
                clean: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'scale-up': 'scaleUp 0.2s ease-in-out',
            },
            keyframes: {
                scaleUp: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                },
            },
        },
    },
    plugins: [],
}
