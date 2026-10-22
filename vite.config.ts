import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 项目站点部署在 /<repo>/ 子路径下，构建时由 BASE_PATH 注入
// 去掉首尾斜杠再补回，避免 Windows shell 的路径转换破坏取值
const basePath = process.env.BASE_PATH?.replace(/^\/+|\/+$/g, '')

// https://vite.dev/config/
export default defineConfig({
  base: basePath ? `/${basePath}/` : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
