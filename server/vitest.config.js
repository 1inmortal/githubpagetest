import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/scripts/',
        '**/*.test.js',
        '**/*.spec.js'
      ]
    },
    testTimeout: 10000,
    setupFiles: ['./src/test/setup.js']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
