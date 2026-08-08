import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base 使用相对路径 './'：
// 以后无论是部署到 GitHub Pages 子目录，还是 Vercel / Netlify，
// 构建产物都能直接使用，不用改配置。
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: true, // 启动时自动打开浏览器
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
