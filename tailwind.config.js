/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1920px',
      xxl: '2560px',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '1.5rem',
      xxl: '2.5rem',
      full: '9999px',
      large: '12px',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans'],
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
      },
      colors: {
        'white-site': 'rgb(255, 255, 255)',
        'black-site': 'rgb(0, 0, 0)',
        'purple-site': 'rgb(119, 85, 204)',
        'primary-site': 'var(--primary-blue)',
        'secondary-site': 'rgb(205, 100, 200)',
        'action-site': 'rgb(205, 100, 200)',
        'action-hover': 'rgb(225, 110, 220)',
        'alertLight-site': 'rgb(217, 48, 37, .20)',
        'blue-site': '#2859B6',
        greyShade: '#2C2C2F',
        greyLight: 'rgba(15, 19, 36, 0.6)',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade 3s ease-in-out',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite plugin
    function ({ addUtilities }) {
      // Custom utility function
      const newUtilities = {
        '.text-stroke-gray': {
          '-webkit-text-stroke-color': 'rgba(15, 19, 36, 0.6)',
          '-webkit-text-strokeWidth': '0.5px',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
