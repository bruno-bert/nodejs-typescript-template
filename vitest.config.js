import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.mongo.js'],
    exclude: [
      ...configDefaults.exclude,
      '**/monitoring/**',
      '**/mongo/**',
      '**/coverage/**',
      '**/.husky/**',
      '**/.plop/**',
      '**/.docs/**',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      exclude: [
        ...configDefaults.coverage.exclude,
        '**/monitoring/**',
        '**/mongo/**',
        '**/coverage/**',
        '**/.husky/**',
        '**/.plop/**',
        '**/.docs/**',
      ],
    },
  },
  plugins: [tsconfigPaths()],
})
