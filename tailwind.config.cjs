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
				gray: {
					DEFAULT: '#151414',
					50: '#FEFEFE',
					100: '#B9B6B6',
					200: '#A6A1A1',
					300: '#928C8C',
					400: '#7D7878',
					500: '#696464',
					600: '#545050',
					700: '#3F3C3C',
					800: '#2A2828',
					900: '#151414'
				}
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
