import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,  // Exposes the app to all network interfaces
    port: 3000,  // Bind to port 3000 (or use an env variable for dynamic port)
    strictPort: true,  // Ensure Vite fails if port 3000 is already taken
  },
});
