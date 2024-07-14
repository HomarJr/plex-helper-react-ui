import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
// https://ui.shadcn.com/docs/installation/vite
export default defineConfig({
  plugins: [react()],
  base: '/plex-helper-react-ui/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
