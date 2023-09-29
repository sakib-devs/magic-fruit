import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from './alias'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias,
  },
})
