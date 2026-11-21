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

## 新增作品指南（以《界之轨迹》为例）

站点已将数据配置与页面组件解耦，新增一部作品（假设目录前缀为 `kai`）无需修改 `astro.config.mjs`、页面组件或 CI 工作流，只需完成以下步骤：

1. **新建章节 Markdown 文档（`src/content/docs/kai/*.md`）**
   - 在 `src/content/docs/kai/` 下新建 `summary.md`、`chapter-0.md` 等文档，Frontmatter 只需填写 `title`（及可选整理成员 `authors`，键名对应 `src/data/authors.ts`）：
     ```yaml
     ---
     title: "界之轨迹 - 剧情简介"
     authors: ["Winston"]
     ---
     ```
   - 无需手动填写 `lastUpdated` 与 `createdAt`，构建时会自动从 Git 提交记录提取。正文自动获得角色对话高亮、场景/时间横幅、`{注音}` 胶囊、`<audio>` 播放器卡片、图片灯箱（`![说明](/images/kai/xx.webp){.imgLightbox}`）与 Pagefind 中文搜索索引支持。

2. **添加音频与图片资源（可选）**
   - 将原声 BGM 放入 `public/bgms/kai/*.mp3`，图片放入 `public/images/kai/*`。
   - Markdown 中直接使用 `/bgms/kai/...` 与 `/images/kai/...` 引用即可（GitHub Pages 子路径构建会自动补全前缀，首页「经典 BGM」统计也会自动累加 `.mp3` 数量）。

3. **配置顶部导航与侧边栏目录（`src/data/navigation.json`）**
   - 在 `sections` 数组中新增该作品节点（顶栏标签按 `sections` 顺序排列，通常将新作置于首位），填写 `label`、`prefix`、`href`（如 `"/kai/summary/"`）及 `sidebar.items` 中的章节 `slug` 列表（如 `"kai/summary"`、`"kai/chapter-0"`）。
   - 顶部导航栏、桌面/移动端侧边栏目录树、各作章节数及同作品内的上下章翻页均会自动生成。

4. **配置首页作品卡片与篇章元数据（`src/data/games.ts`）**
   - 按系列年代顺序在 `RAW_GAMES` 末尾新增 `kai` 条目（填写 `prefix`、`title`、`subtitle`、`year`、`arcId`、`summaryDone`、`scriptDone`、`tagline` 与 `quickLinks`；若该篇章时间跨度变化，可同步更新 `ARCS` 中的 `years`）。
   - 首页英雄区的「部系列作品」计数、「最新收录《...》」快捷按钮及篇章卡片列表均会自动更新，无需改动 `HomePortal.astro`。

5. **可选维护项**
   - **新增整理成员**：将头像放至 `public/images/contributors/<成员名>.webp`，并在 `src/data/authors.ts` 的 `AUTHOR_INFO` 中登记成员信息。
   - **更新仓库说明与首页时间戳**：在本 `README.md` 上方的「剧情文本制作进度」表格中补充一行。常规提交对 `README.md`、`src/data/games.ts` 或 `src/content/docs/index.md` 的改动会自动更新网站首页的「最近更新」时间；若仅调整文档格式不希望刷新页面时间，可在 Git 提交说明中加入 `[skip-date]`。

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
- 推送到 `main` 分支：触发 `.github/workflows/ci.yaml`，并行执行构建与双端部署——分别发布子路径构建至 GitHub Pages，以及根路径构建（含 `.br` 预压缩）同步至阿里云 OSS（需在仓库 Secrets 中配置 `ACCESS_ID`、`ACCESS_KEY_SECRET` 与 `BUCKET`）。
