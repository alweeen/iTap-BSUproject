/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mint: {
                    light: '#E0F7FA', // Ocean Breeze Light
                    DEFAULT: '#98FF98', // Lavender Dream Primary
                    dark: '#00695C', // Ocean Breeze Accent
                },
                sage: {
                    light: '#F1F8E9', // Forest Calm Light
                    DEFAULT: '#9DC183', // Lavender Dream Secondary
                    dark: '#33691E', // Forest Calm Accent
                },
                charcoal: '#36454F',
                // Dynamic Theme Colors
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                background: 'var(--color-background)',
                card: 'var(--color-card-bg)',
                text: 'var(--color-text)',
                'text-secondary': 'var(--color-text-secondary)',
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
