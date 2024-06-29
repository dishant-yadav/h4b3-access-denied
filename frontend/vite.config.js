import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      ULCA_API_URI: process.env.ULCA_API_URI ?? null,
      ULCA_USER_ID: process.env.ULCA_USER_ID ?? null,
      ULCA_API_KEY: process.env.ULCA_API_KEY ?? null,
      ULCA_AUTH_TOKEN: process.env.ULCA_AUTH_TOKEN ?? null,
      ULCA_SERVICE_ID: process.env.ULCA_SERVICE_ID ?? null
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
})
