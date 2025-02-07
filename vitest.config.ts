import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',  // For React testing
    globals: true,         // Enables global access to test functions like 'describe', 'it', etc.
    setupFiles: ['./src/setupTests.ts'],  // Optional: Setup for test environment
    testTimeout: 10000,   // Increase timeout if necessary
    coverage: {
      reporter: ['text', 'json', 'html'], // Code coverage reporting
    },
  },
});
