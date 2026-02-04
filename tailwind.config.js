/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-accent', 'bg-marked', 'border-marked-border', 'active:bg-accent-light'],
  theme: {
    extend: {
      colors: {
        'coffee-brown': '#3E2723',
        'warm-cream': '#F5E9DC',
        'amber-syrup': '#D97706',
        'muted-sage': '#6B8C6B',
        'terracotta': '#C05621'
      },
      borderRadius: {
        'xl': '1rem'
      },
      spacing: {
        '18': '4.5rem'
      }
    }
  },
  plugins: []
}
