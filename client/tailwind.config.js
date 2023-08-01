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
          50: '#F5F9F1',
          100: '#E9F1DF',
          200: '#D5E4C3',
          300: '#BFD6A3',
          400: '#ACCA87',
          500: '#96BC67',
          600: '#7AA348',
          700: '#5A7835',
          800: '#3D5124',
          900: '#1D2711',
          950: '#101509',
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
          50: '#F3F7FC',
          100: '#E3ECF7',
          200: '#C8DAEF',
          300: '#ACC7E7',
          400: '#90B5DF',
          500: '#75A2D7',
          600: '#4180C8',
          700: '#2D609A',
          800: '#1E4067',
          900: '#0F2033',
          950: '#08111C',
        },
      },
    },
  },
  plugins: [],
};
