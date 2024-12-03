import path from 'path';

import { defineConfig } from 'vite';
// TODO: add later
// import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@icons': path.resolve('src/assets/icons'),
      '@images': path.resolve('src/assets/images'),
      '@components/commons': path.resolve('src/components/commons'),
      '@components/front': path.resolve('src/components/front'),
      '@components/dashboard': path.resolve('src/components/dashboard'),
      '@hooks': path.resolve('src/hooks'),
      '@layouts': path.resolve('src/layouts'),
      '@pages': path.resolve('src/pages'),
      '@pages/front': path.resolve('src/pages/front'),
      '@pages/dashboard': path.resolve('src/pages/dashboard'),
      '@store': path.resolve('src/store'),
      '@services': path.resolve('src/services'),
      '@utils': path.resolve('src/utils'),
    },
  },
});
