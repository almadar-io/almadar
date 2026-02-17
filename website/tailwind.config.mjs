/**
 * Tailwind config for the website + storybook.
 * Re-exports the @almadar/ui config with expanded content paths
 * to scan all project design system components.
 */
import baseConfig from '../../packages/almadar-ui/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    '../../packages/almadar-ui/components/**/*.{js,ts,jsx,tsx}',
    '../../projects/*/design-system/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
};
