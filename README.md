# 咖啡屋 | 轨迹系列 - Cafe (`book.trails-game.com`)

Falcom 轨迹系列中文剧情与剧本档案站，基于 [Astro](https://astro.build/)、[Starlight](https://starlight.astro.build/) 与 [Pagefind](https://pagefind.app/) 构建。

## 剧情文本制作进度

| 作品名称 | 作品简介 | 对话剧情 |
|---|---|---|
| 空之轨迹FC | 已完成 ✔️ | 已完成 ✔️ |
| 空之轨迹SC | 已完成 ✔️ | 已完成 ✔️ |
| 空之轨迹3RD | 已完成 ✔️ | 已完成 ✔️ |
| 零之轨迹 | 已完成 ✔️ | 已完成 ✔️ |
| 碧之轨迹 | 已完成 ✔️ | 已完成 ✔️ |
| 闪之轨迹Ⅰ | 已完成 ✔️ | 已完成 ✔️ |
| 闪之轨迹Ⅱ | 已完成 ✔️ | 已完成 ✔️ |
| 闪之轨迹Ⅲ | 已完成 ✔️ | 制作中 ⭕ |
| 闪之轨迹Ⅳ | 已完成 ✔️ | 制作中 ⭕ |
| 创之轨迹 | 已完成 ✔️ | 已完成 ✔️ |
| 黎之轨迹 | 已完成 ✔️ | 已完成 ✔️ |
| 黎之轨迹Ⅱ | 已完成 ✔️ | 已完成 ✔️ |

## 本地开发与构建

需要 Node.js 22+（或使用 Docker）：

```bash
# 安装依赖
npm install

# 类型与模板检查
npm run check

# 构建静态站点到 dist/（含 Pagefind 中文分片搜索索引）
npm run build

# 本地预览构建产物
npm run preview
```

### 使用 Docker

```bash
# 启动预览容器（http://localhost:4321）
docker compose up -d

# 执行类型检查与生产构建
docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -e NPM_CONFIG_CACHE=/tmp/.npm \
  -v "$(pwd):/workspace" -w /workspace \
  node:22-alpine sh -c "npm run check && npm run build"
```

## 自动化构建与部署

- Pull Request 到 `main` 分支：触发 `.github/workflows/ci-pr.yaml`，运行 `npm ci`、`npm run check` 与 `npm run build`。
- 推送到 `main` 分支：触发 `.github/workflows/ci.yaml`，构建静态资源、生成 `.br` 预压缩文件、发布 GitHub Pages，并同步至阿里云 OSS（需在仓库 Secrets 中配置 `ACCESS_ID`、`ACCESS_KEY_SECRET` 与 `BUCKET`）。
