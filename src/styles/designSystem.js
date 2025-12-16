/**
 * Readian Design System
 * Centralized design tokens for consistent UI/UX across the application
 */

export const colors = {
  // Primary Colors
  primary: {
    dark: '#1A5632',
    main: '#00A819',
    light: '#C0FFB3',
  },
  // Secondary Colors
  secondary: {
    cream: '#FFFDEE',
    pink: '#FFD7DF',
  },
  // Status Colors
  status: {
    success: '#00A819',
    warning: '#FFA500',
    error: '#DC2626',
    info: '#3B82F6',
  },
  // Premium & Badges
  premium: {
    gold: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  // Content Type
  content: {
    adult: '#DC2626',
    kids: '#3B82F6',
  },
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    black: '#000000',
  },
};

export const typography = {
  fontFamily: {
    heading: '"Geist Mono", monospace',
    body: '"Outfit", sans-serif',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.625rem',  // 10px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  card: '4px 4px 4px 0px rgba(0, 0, 0, 0.25)',
};

export const transitions = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

export const animations = {
  fadeIn: {
    name: 'fadeIn',
    duration: '300ms',
    timingFunction: 'ease-out',
  },
  slideUp: {
    name: 'slideUp',
    duration: '300ms',
    timingFunction: 'ease-out',
  },
  scaleIn: {
    name: 'scaleIn',
    duration: '200ms',
    timingFunction: 'ease-out',
  },
  pulse: {
    name: 'pulse',
    duration: '2s',
    timingFunction: 'ease-in-out',
    iterationCount: 'infinite',
  },
};

// Button Variants
export const buttonVariants = {
  primary: {
    base: `bg-[${colors.primary.dark}] text-[${colors.secondary.pink}] font-semibold rounded-lg transition-all duration-300 hover:bg-[${colors.primary.main}] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[${colors.primary.main}] focus:ring-offset-2`,
  },
  secondary: {
    base: `bg-transparent border-2 border-[${colors.primary.dark}] text-[${colors.primary.dark}] font-semibold rounded-lg transition-all duration-300 hover:bg-[${colors.primary.dark}] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[${colors.primary.main}] focus:ring-offset-2`,
  },
  danger: {
    base: `bg-[${colors.status.error}] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`,
  },
  ghost: {
    base: `bg-[${colors.neutral.gray200}] text-[${colors.neutral.gray700}] font-semibold rounded-lg transition-all duration-300 hover:bg-[${colors.neutral.gray300}] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`,
  },
};

// Card Variants
export const cardVariants = {
  elevated: `bg-white rounded-xl shadow-lg border-2 border-gray-100 transition-all duration-300 hover:shadow-xl`,
  flat: `bg-white rounded-xl border-2 border-gray-200`,
  outlined: `bg-transparent rounded-xl border-2 border-gray-300`,
};

// Input Variants
export const inputVariants = {
  default: `w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[${colors.primary.main}] focus:ring-2 focus:ring-[${colors.primary.main}] focus:ring-opacity-20 transition-all duration-200`,
  error: `w-full px-4 py-3 border-2 border-red-500 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all duration-200`,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  animations,
  buttonVariants,
  cardVariants,
  inputVariants,
};

