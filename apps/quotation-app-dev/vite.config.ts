import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1ファイルにバンドル（kintoneは複数ファイル読み込めない）
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        // IIFE形式で出力（グローバルスコープで実行）
        format: 'iife',
        // 出力ファイル名
        entryFileNames: 'customize.js',
        // CSSも1ファイルに
        assetFileNames: 'customize.[ext]',
      },
    },
    // コード分割しない
    cssCodeSplit: false,
    // 出力先
    outDir: 'dist',
  },
})
