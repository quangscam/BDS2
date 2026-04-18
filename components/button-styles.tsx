// Reusable button styles for consistent UI across the website
export const buttonStyles = {
  primary: {
    className: 'text-white px-6 py-3 rounded font-semibold transition-opacity hover:opacity-90',
    style: { backgroundColor: '#8B4513' },
  },
  secondary: {
    className: 'text-white px-6 py-3 rounded font-semibold transition-opacity hover:opacity-90',
    style: { backgroundColor: '#C41E3A' },
  },
  accent: {
    className: 'text-white px-6 py-3 rounded font-semibold transition-opacity hover:opacity-90',
    style: { backgroundColor: '#D4AF37', color: '#2D2D2D' },
  },
  outline: {
    className: 'border-2 px-6 py-3 rounded font-semibold transition-colors',
    style: { borderColor: '#8B4513', color: '#8B4513' },
  },
  small: {
    className: 'text-white px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-90',
    style: { backgroundColor: '#8B4513' },
  },
  large: {
    className: 'text-white px-8 py-4 rounded text-lg font-semibold transition-opacity hover:opacity-90',
    style: { backgroundColor: '#8B4513' },
  },
}

// Color scheme for consistent theming
export const colorScheme = {
  primary: '#8B4513', // Burgundy/Brown
  secondary: '#C41E3A', // Dark Red
  accent: '#D4AF37', // Gold
  dark: '#2D2D2D', // Dark Gray
  light: '#FAFAF9', // Off-white
  border: '#E0E0E0', // Border Gray
}
