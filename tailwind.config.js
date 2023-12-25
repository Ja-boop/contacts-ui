/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: 'var(--background)',
			primary: 'var(--primary)',
			secondary: 'var(--secondary)',
			tertiary: 'var(--tertiary)',
			'primary-text': 'var(--primary-text)',
			'secondary-text': 'var(--secondary-text)'
		},
		extend: {}
	},
	plugins: []
};
