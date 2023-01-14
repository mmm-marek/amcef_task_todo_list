/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            "amcef-primary": "#9ffa57",
            "amcef-primary-hover": "#62c414",
            "amcef-secondary": "#22252E",
            "amcef-black": "#000000",
            "amcef-white": "#ffffff",
            "amcef-white-hover": "#bcf78d",
        },
        extend: {
            width: {
                300: "80rem",
            },
        },
    },
    plugins: [require("daisyui")],
};
