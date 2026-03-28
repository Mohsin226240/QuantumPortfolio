export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
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