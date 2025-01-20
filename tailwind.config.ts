import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'persian-pink': {
          '50': '#fcf3f9',
          '100': '#fae9f5',
          '200': '#f6d4eb',
          '300': '#f0b1da',
          '400': '#e684c2',
          '500': '#d95ba7',
          '600': '#c73b88',
          '700': '#ab2b6e',
          '800': '#8e265b',
          '900': '#77244e',
          '950': '#480f2c'
        }
      },
      fontFamily: {
        cookie: ['Cookie'],
        'cookie-fallback': ['Cookie Fallback'],
        dancing: ['Dancing Script']
      },
      screens: {
        xs: { max: '320px' },
        sm: { max: '576px' },
        md: { max: '768px' },
        lg: { max: '992px' },
        xl: { max: '1200px' },
        '2xl': { max: '1536px' }
      }
    }
  },
  plugins: []
} satisfies Config;
