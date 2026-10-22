# Shop Demo

面向海外消费者的商品选购应用，基于 Vite + React + TypeScript 构建。

## 本地启动

```bash
pnpm install
pnpm dev
```

默认地址：http://localhost:5173

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 类型检查并构建生产包到 `dist/` |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm lint` | 运行 oxlint |

## 目录结构

```text
src/
  components/Layout.tsx     # 响应式页头、内容区与页脚
  pages/                    # 商品列表、商品详情、购物车
  App.tsx                   # 路由表
  main.tsx                  # 入口
  index.css                 # Tailwind 入口
```
