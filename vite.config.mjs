import { configDefaults, defineConfig } from "vitest/config"
import path from 'path'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, './postgres'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
}) 