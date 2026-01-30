/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        primary: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#cccccc',
          400: '#b3b3b3',
          500: '#666666',
          600: '#000000', // Main primary action is black
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Semantic aliases for wireframe look
        border: '#000000',
        input: '#000000',
        ring: '#000000',
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      boxShadow: {
        'wireframe': '4px 4px 0px 0px rgba(0,0,0,1)',
        'wireframe-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
};
