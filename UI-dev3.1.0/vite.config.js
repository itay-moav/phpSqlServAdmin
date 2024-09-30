import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],//need to allow the font files from node modules
    },
  },
  build: {
      target: 'esnext'
  },
  base: "/vulcan",
  plugins: [react()],
  define: {
      __APP_VERSION__: JSON.stringify('3.1.0'),
      __APP_NAME__:    JSON.stringify(process.env.npm_package_name)
  }
})
