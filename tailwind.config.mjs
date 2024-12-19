/** @type {import('tailwindcss').Config} */
export default {
    presets: [
        require('./tailwind-presets/pizza-site')
    ],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
