import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
      target: 'esnext'
  },
  base: "/vulcan",
  plugins: [react()],
  define: {
      __APP_VERSION__: JSON.stringify('3.0.0'),
      __APP_NAME__:    JSON.stringify(process.env.npm_package_name)
  }
})
