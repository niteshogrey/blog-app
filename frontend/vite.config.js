import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from network devices
    port: 3000, // Set a custom port (default is 5173)
    open: true, // Automatically opens the app in the default browser
  },
});
