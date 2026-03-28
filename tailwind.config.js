export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#ffffff',
        'text-light': '#000000',
        'border-light': '#e5e7eb',

        'background-dark': '#0f172a',
        'text-dark': '#ffffff',
        'border-dark': '#334155',

        'cyan': {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        'magenta': {
          500: '#d946ef',
        }
      }
    }
  }
}