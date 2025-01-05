// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'pallete': {
//           '50': '#fdf6fc',
//           '100': '#fcebfc',
//           '200': '#f7d7f5',
//           '300': '#eda6e6',
//           '400': '#e78bdd',
//           '500': '#d75ec9',
//           '600': '#ba3fa9',
//           '700': '#9a3189',
//           '800': '#7e2a6f',
//           '900': '#68275c',
//           '950': '#430f38',
//         },
//       },
      
      
//     },
//   },
//   plugins: [
//     require('daisyui'),
//   ],
//   daisyui: {
//     themes: false, // Disable all DaisyUI themes
//   },
// }


import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pallete: {
          50: '#fdf6fc',
          100: '#fcebfc',
          200: '#f7d7f5',
          300: '#eda6e6',
          400: '#e78bdd',
          500: '#d75ec9',
          600: '#ba3fa9',
          700: '#9a3189',
          800: '#7e2a6f',
          900: '#68275c',
          950: '#430f38',
        },
      },
    },
    
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: false, // Disable all DaisyUI themes
  },
};

