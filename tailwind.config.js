/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'wave-opacity': 'waveOpacity 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'wave-opacity': 'waveOpacity 1.5s ease-in-out infinite',
//       },
//     },
//   },
//   plugins: [],
// }
