import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/components'),
      '@/utils': path.resolve(__dirname, './app/utils'),
      '@/app/utils': path.resolve(__dirname, './src/app/utils/'),
      '@/db': path.resolve(__dirname, './src/db'),
    },
  },
  test: {
    environment: 'jsdom',
  },
})