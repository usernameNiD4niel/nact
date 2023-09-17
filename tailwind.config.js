/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import theme from "daisyui/src/theming/themes";
export default {
	content: ["src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					...theme["[data-theme=light]"],
					primary: "#017DC3",
					"primary-focus": "#005382",
					secondary: "#D6D6D6",
					"secondary-focus": "#8B8B8B",
				},
			},
		], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	},
};
