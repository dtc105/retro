/** @type {import("tailwindcss").Config} */
export default {
	content: [
			".index.html",
			"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
			extend: {
				fontFamily: {
					"terminal": "'VGA-437', monospace"
				}
			},
	},
	plugins: [],
};

