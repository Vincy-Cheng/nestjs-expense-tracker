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
          50: '#F3FCF6',
          100: '#E6F9EC',
          200: '#CEF3DA',
          300: '#B5EDC7',
          400: '#9DE7B4',
          500: '#82E0A0',
          600: '#4BD276',
          700: '#2BAC53',
          800: '#1C7238',
          900: '#0E391C',
          950: '#071D0E',
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
