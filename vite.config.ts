import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // Base path (change if deploying to subfolder, e.g., '/portfolio/')
    base: '/',

    // Development server config
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // Set to true if you want sourcemaps for debugging
      minify: 'esbuild', // Fast minification
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'framer': ['framer-motion'],
            'three': ['three'],
          },
        },
      },
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },

    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
