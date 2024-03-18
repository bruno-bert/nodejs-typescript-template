import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.mongo.js'],
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [tsconfigPaths()],
})
