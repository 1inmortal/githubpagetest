import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/githubpagetest/public/webs/cenaduria/react-app/dist/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
