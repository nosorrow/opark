import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        usloviya: resolve(__dirname, 'usloviya.html'),
        plashtaniya: resolve(__dirname, 'plashtaniya-i-vrashtane.html'),
        poveritelnost: resolve(__dirname, 'poveritelnost.html'),
      },
    },
  },
})
