// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), tsconfigPaths(), alpinejs()]
  },

  integrations: [alpinejs()]
});