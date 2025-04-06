/**
 * DemoGenius Design System Tokens
 * 
 * This file contains all design tokens used throughout the application.
 * Always import from here instead of hardcoding values to maintain consistency.
 */

export const colors = {
  // Brand colors
  primary: {
    base: '#39FF14',
    hover: '#32E512',
    pressed: '#2BD910',
    light: 'rgba(57, 255, 20, 0.2)',
    dark: '#30C912',
  },
  
  // Neutrals (dark theme focused)
  neutrals: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Functional colors
  functional: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // State overlays
  overlays: {
    hover: 'rgba(255, 255, 255, 0.05)',
    pressed: 'rgba(0, 0, 0, 0.05)',
    focus: 'rgba(57, 255, 20, 0.2)',
  },
};

export const spacing = {
  // Base unit: 4px (0.25rem)
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  
  // Font sizes
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
    '6xl': '3.75rem',  // 60px
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

export const zIndices = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  // Specific contexts
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modal: '1300',
  popover: '1400',
  tooltip: '1500',
};

export const animations = {
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
};

export const mediaQueries = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common layout values
export const layout = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  maxWidths: {
    none: 'none',
    xs: '20rem',     // 320px
    sm: '24rem',     // 384px
    md: '28rem',     // 448px
    lg: '32rem',     // 512px
    xl: '36rem',     // 576px
    '2xl': '42rem',  // 672px
    '3xl': '48rem',  // 768px
    '4xl': '56rem',  // 896px
    '5xl': '64rem',  // 1024px
    '6xl': '72rem',  // 1152px
    '7xl': '80rem',  // 1280px
    full: '100%',
  },
};

// Theme configuration (dark mode is default for DemoGenius)
export const themeConfig = {
  defaultTheme: 'dark',
  background: {
    light: colors.neutrals[50],
    dark: colors.neutrals[950],
  },
  text: {
    light: {
      primary: colors.neutrals[900],
      secondary: colors.neutrals[600],
      tertiary: colors.neutrals[500],
    },
    dark: {
      primary: colors.neutrals[50],
      secondary: colors.neutrals[300],
      tertiary: colors.neutrals[400],
    },
  },
  border: {
    light: colors.neutrals[200],
    dark: colors.neutrals[800],
  },
};

// Component styles that enforce consistency
export const components = {
  card: {
    background: {
      light: 'white',
      dark: 'rgb(2, 6, 23)', // slate-950
    },
    border: {
      light: 'rgb(226, 232, 240)', // slate-200
      dark: 'rgb(30, 41, 59)',  // slate-800
    },
    shadow: {
      default: 'shadow-sm',
      hover: 'shadow-md',
    },
    radius: borderRadius.lg,
    padding: {
      sm: spacing[3],
      md: spacing[4],
      lg: spacing[6],
    },
  },
  
  section: {
    spacing: {
      sm: spacing[4],
      md: spacing[6], 
      lg: spacing[8],
    },
    gap: spacing[6],
  },
  
  text: {
    font: {
      heading: typography.fontFamily.sans,
      body: typography.fontFamily.sans,
    },
    size: {
      heading: {
        xs: typography.fontSize.lg,
        sm: typography.fontSize.xl,
        md: typography.fontSize['2xl'],
        lg: typography.fontSize['3xl'],
        xl: typography.fontSize['4xl'],
      },
      body: {
        xs: typography.fontSize.xs,
        sm: typography.fontSize.sm,
        md: typography.fontSize.base,
        lg: typography.fontSize.lg,
      },
    },
    weight: {
      heading: typography.fontWeight.semibold,
      body: typography.fontWeight.normal,
      bold: typography.fontWeight.semibold,
    },
    color: {
      heading: {
        light: colors.neutrals[900],
        dark: colors.neutrals[50],
      },
      body: {
        light: colors.neutrals[700],
        dark: colors.neutrals[300],
      },
      muted: {
        light: colors.neutrals[500],
        dark: colors.neutrals[400],
      },
      accent: colors.primary.base,
    },
  },
  
  button: {
    primary: {
      bg: colors.primary.base,
      hover: colors.primary.hover,
      text: 'black',
      fontWeight: typography.fontWeight.medium,
    },
    radius: {
      default: borderRadius.md,
      round: borderRadius.full,
    },
  },
  
  form: {
    spacing: spacing[2],
    labelSize: typography.fontSize.sm,
    labelWeight: typography.fontWeight.medium,
    helpTextSize: typography.fontSize.xs,
    errorColor: colors.functional.error,
  },
  
  layout: {
    containerWidth: {
      sm: layout.container.sm,
      md: layout.container.md,
      lg: layout.container.lg,
      xl: layout.container.xl,
    },
    gap: {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8],
    },
  },
};

// Export a universal theme context
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndices,
  animations,
  mediaQueries,
  layout,
  themeConfig,
  components,
};

export default theme;
