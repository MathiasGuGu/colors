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
				title: '#FFFFFD',
				white: {
					50: 'hsl(0, 0%, 100%)',
					100: 'hsl(0, 0%, 94%)',
					200: 'hsl(0, 0%, 86%)',
					300: 'hsl(0, 0%, 74%)',
					400: 'hsl(0, 0%, 60%)',
					500: 'hsl(0, 0%, 49%)',
					600: 'hsl(0, 0%, 40%)',
					700: 'hsl(0, 0%, 32%)',
					800: 'hsl(0, 0%, 27%)',
					900: 'hsl(0, 0%, 24%)',
					950: 'hsl(0, 0%, 16%)'
				}
			}
		}
	},
	plugins: []
};
