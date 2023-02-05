import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/test': {
        target: "http://localhost:3000/test",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/test/, ''),
      }
    }
  },
})
