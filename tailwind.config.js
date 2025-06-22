/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		fontFamily: {
        	sans: ['var(--font-source-sans-3)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      	},
		fontSize: {
        'default-base': '16px',
        },
		lineHeight: {
			"tight": "1.2",
		},
		colors: {
			"light_blue": "#8DC8F0",
			"dark_blue": "#1593DF",
			"light_green": "#97CE4E",
			"dark_green": "#58AA2C",
			"light_yellow": "#FAE355",
			"dark_yellow": "#D49D26",
			"brown": "#694A04",
			"green_80_mate": "rgba(112, 184, 57, 0.8)"
		},
		backgroundImage: {
			'radial-gradient-yellow': 'radial-gradient(at center, var(--tw-gradient-stops))',
			'gradient-yellow-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
		},
		gradientColorStops: theme => ({
			'gradient-yellow-from': '#D49D26',
			'gradient-yellow-to': '#FAE355',
		}),
	}
  },
  plugins: [],
};
