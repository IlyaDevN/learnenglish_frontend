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
		lineHeight: {
			"tight": "1.2",
		},
		colors: {
			"light_blue": "#8DC8F0",
			"dark_blue": "#1593DF",
			"light_green": "#97CE4E",
			"dark_green": "#58AA2C",
			"light_yellow": "#FAE355",
			"dark_yellow": "#D49D26"
		}
	}
  },
  plugins: [],
};
