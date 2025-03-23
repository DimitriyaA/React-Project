/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                magic: ['"Cinzel Decorative"', 'serif'],
            },
            backgroundImage: {
                'starry-sky': "url('/src/assets/starry-sky.jpg')",
                'castle': "url('/src/assets/magical-castle.png')",
            },
        },
    },
    plugins: [],
}
