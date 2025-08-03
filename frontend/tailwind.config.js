/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',   // Light mint green
          100: '#dcfce7',  // Very light green
          200: '#bbf7d0',  // Light green
          300: '#86efac',  // Medium light green
          400: '#4ade80',  // Medium green
          500: '#22c55e',  // Forest green (main)
          600: '#16a34a',  // Deep forest green
          700: '#15803d',  // Dark forest green
          800: '#166534',  // Very dark green
          900: '#14532d',  // Deepest green
        },
        secondary: {
          50: '#f7fee7',   // Light lime
          100: '#ecfccb',  // Very light lime
          200: '#d9f99d',  // Light lime green
          300: '#bef264',  // Medium lime
          400: '#a3e635',  // Bright lime
          500: '#84cc16',  // Lime green
          600: '#65a30d',  // Dark lime
          700: '#4d7c0f',  // Deep lime
          800: '#3f6212',  // Very dark lime
          900: '#365314',  // Deepest lime
        },
        nature: {
          50: '#f6fdf6',   // Lightest nature green
          100: '#e8fce8',  // Very light nature
          200: '#d1f7d1',  // Light sage
          300: '#a7eba7',  // Medium sage
          400: '#6dd76d',  // Fresh green
          500: '#38a338',  // Nature green
          600: '#2d8f2d',  // Deep nature
          700: '#247324',  // Dark nature
          800: '#1d5d1d',  // Very dark nature
          900: '#164716',  // Deepest nature
        },
        accent: {
          50: '#fefce8',   // Light yellow-green
          100: '#fef9c3',  // Very light yellow
          200: '#fef08a',  // Light yellow
          300: '#fde047',  // Medium yellow
          400: '#facc15',  // Bright yellow
          500: '#eab308',  // Golden yellow
          600: '#ca8a04',  // Dark yellow
          700: '#a16207',  // Deep yellow
          800: '#854d0e',  // Very dark yellow
          900: '#713f12',  // Deepest yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-forest': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
        'gradient-nature': 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #4d7c0f 100%)',
        'gradient-green': 'linear-gradient(to right, #22c55e, #16a34a)',
      },
      boxShadow: {
        'green': '0 4px 14px 0 rgba(34, 197, 94, 0.25)',
        'green-lg': '0 10px 25px -3px rgba(34, 197, 94, 0.3)',
        'nature': '0 4px 14px 0 rgba(132, 204, 22, 0.25)',
      }
    },
  },
  plugins: [],
}