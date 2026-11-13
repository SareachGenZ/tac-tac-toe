/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-secondary': 'var(--color-surface-secondary)',
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
        },
        'player-x': 'var(--color-player-x)',
        'player-o': 'var(--color-player-o)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 24px -4px rgba(139, 92, 246, 0.45)',
        'glow-x': '0 0 24px -4px rgba(56, 189, 248, 0.45)',
        'glow-o': '0 0 24px -4px rgba(192, 132, 252, 0.45)',
        'glow-success': '0 0 24px -4px rgba(34, 197, 94, 0.45)',
        card: '0 12px 32px -8px rgba(2, 6, 23, 0.45)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

