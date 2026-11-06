import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this app from a /dawsonsproject/ subpath, so it needs that base.
  // Vercel serves it from the domain root, so base must be '/' there instead.
  base: process.env.VERCEL ? '/' : '/dawsonsproject/',
})
