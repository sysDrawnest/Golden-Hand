import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Golden-Hand/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://golden-hand.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
