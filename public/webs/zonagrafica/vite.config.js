import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 3001,
    open: '/index.html',
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['swiper']
  }
})
