import { defineConfig } from 'vite';
import { resolve } from 'path';
import compression from 'vite-plugin-compression'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib.ts'),
      name: 'TrpcClient',
      fileName: 'trpc-client',
      formats: ['iife'],
    },
    minify: 'esbuild',
    sourcemap: false
  },
  plugins: [
    compression({
      algorithm: 'gzip'
    })
  ]
});
