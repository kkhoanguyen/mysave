/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#a2cfe8",

          "secondary": "#5bbc34",

          "accent": "#eaea09",

          "neutral": "#282933",

          "base-100": "#454346",

          "info": "#67D0F4",

          "success": "#2DE674",

          "warning": "#EC9213",

          "error": "#EB3770",
        },
      },
    ],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ], theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio')
  ],
}
