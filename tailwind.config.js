/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [{ pattern: /^h-\\[(\d{1,2}|100)%\\]$/ }],
	theme: {
		extend: {}
	},
	plugins: []
};
