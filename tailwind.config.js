/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: 'var(--background)',
			'background-secondary': 'var(--background-secondary)',
			primary: 'var(--primary)',
			secondary: 'var(--secondary)',
			tertiary: 'var(--tertiary)',
			'primary-text': 'var(--primary-text)',
			'secondary-text': 'var(--secondary-text)',
			state: {
				danger: 'var(--danger)',
				success: 'var(--success)',
				warning: 'var(--warning)'
			}
		},
		extend: {
			gridTemplateColumns: {
				'fill-72': 'repeat(auto-fill, minmax(18rem, 1fr))',
				'fill-74': 'repeat(auto-fill, minmax(20rem, 1fr))',
				'fill-76': 'repeat(auto-fill, minmax(22rem, 1fr))'
			},
			fontFamily: {
				'red-hat-display': ['Red Hat Display', 'sans-serif']
			}
		}
	},
	plugins: []
};
