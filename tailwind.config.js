/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./Layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				dark: "#141414",
				purpureus: "#9D44B5",
				pinky: "#FF5C6C",
				light: "#F5F5F5",
				lavendar: "#d8d4f2",
        flax: '#FFEF9F',
				pink: {
					mimi: "#FFD6E0",
				},
				blue: {
					ice: "#90F1EF",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
