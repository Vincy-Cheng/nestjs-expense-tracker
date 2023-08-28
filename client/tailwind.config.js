/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    screens: {
      xs: '0px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      fontFamily: {
        Barlow: ['Barlow', 'sans-serif'],
      },
      transitionProperty: {
        height: 'height',
      },
      colors: {
        primary: {
          50: '#f0f9f2',
          100: '#dbf0de',
          200: '#b9e1c2',
          300: '#8acb9b',
          400: '#59ae73',
          500: '#389457',
          600: '#277442',
          700: '#1f5d36',
          800: '#1b4a2d',
          900: '#173d26',
          950: '#0c2216',
        },
        secondary: {
          50: '#F5F4FB',
          100: '#E8E4F6',
          200: '#D4CDEF',
          300: '#BDB2E6',
          400: '#A99BDE',
          500: '#9180D5',
          600: '#664FC5',
          700: '#473399',
          800: '#302267',
          900: '#171032',
          950: '#0C091B',
        },
        info: {
          50: '#F0F8F9',
          100: '#DEF0F2',
          200: '#C0E2E7',
          300: '#9FD3DB',
          400: '#81C5CF',
          500: '#60B6C3',
          600: '#409CAA',
          700: '#30737E',
          800: '#204E55',
          900: '#0F2529',
          950: '#081416',
        },
      },
    },
  },
  plugins: [],
};
