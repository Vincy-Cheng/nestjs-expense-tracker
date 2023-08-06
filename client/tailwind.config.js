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
      colors: {
        primary: {
          50: '#F1F9F3',
          100: '#E3F2E8',
          200: '#C4E4CE',
          300: '#A8D7B7',
          400: '#88C89D',
          500: '#6CBB85',
          600: '#4AA066',
          700: '#387A4D',
          800: '#255033',
          900: '#132A1A',
          950: '#0A150D',
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
