const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: colors.violet[500],
					...colors.violet,
				},
			},
			fontFamily: {
				sans: ["Inter"],
			},
		},
	},
	plugins: [],
};
