/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{html,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin')],
}

