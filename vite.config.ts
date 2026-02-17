import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/football': {
        target: 'https://api.football-data.org/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/football/, ''),
      },
      '/api/newsdata': {
        target: 'https://newsdata.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/newsdata/, ''),
      },
      '/api/transfers': {
        target: 'https://zylalabs.com/api/11305/transfer+market+free+football+players+api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/transfers/, ''),
      },
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
