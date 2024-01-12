/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				button: '#4D9ECF',
				buttonText: '#F5FBFE',
				foreground: '#1D2F45',
				background: '#132037',
				navbar: '#0F1F33',
				text: '#CCD2D6',
				title: '#FFFFFD'
			}
		}
	},
	plugins: []
};
