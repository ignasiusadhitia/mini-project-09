import path from 'path';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@icons': path.resolve('src/assets/icons'),
      '@images': path.resolve('src/assets/images'),
      '@components/guests': path.resolve('src/components/guests'),
      '@components/admin': path.resolve('src/components/admin'),
      '@hooks': path.resolve('src/hooks'),
      '@pages': path.resolve('src/pages'),
      '@pages/guests': path.resolve('src/pages/guests'),
      '@pages/admin': path.resolve('src/pages/admin'),
      '@store': path.resolve('src/store'),
      '@services': path.resolve('src/services'),
      '@utils': path.resolve('src/utils'),
    },
  },
});
