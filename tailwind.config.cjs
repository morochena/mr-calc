const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#741420',
					50: '#EFA2AC',
					100: '#EC919C',
					200: '#E66E7D',
					300: '#E04B5E',
					400: '#DA283F',
					500: '#BA2033',
					600: '#971A2A',
					700: '#741420',
					800: '#440C13',
					900: '#140306'
				},
			}
		},
		colors: {
			"mr-red": '#741420',
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
