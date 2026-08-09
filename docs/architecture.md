# 项目架构说明

这是一个部署在 GitHub Pages 上的**纯静态个人学习工作台**（Chenji Learning Hub）。
它刻意做成了「学习展示柜」的样子：真实能跑的代码 + 大量注释 + 完整文档。

## 整体关系

```
                        ┌─────────────────────────────┐
   浏览器 ──────────────▶│  GitHub Pages（静态托管）     │
                        │  └ 根目录 index.html         │
                        │     （本站唯一入口，已上线）    │
                        └─────────────┬───────────────┘
                                      │ 加载
                                      ▼
                        ┌─────────────────────────────┐
                        │  js/content.js（空内容框架）   │
                        │  siteContent.articles/       │
                        │  siteContent.projects        │
                        │  文章 Markdown 在 articles/   │
                        └─────────────┬───────────────┘
                                      │ 读取
                                      ▼
                        ┌─────────────────────────────┐
                        │  js/main.js（渲染 + 交互）     │
                        │  路由 / 文章 / 计划 / localStorage
                        └─────────────────────────────┘
```

**没有服务器，没有数据库，没有构建步骤，没有假内容。**
浏览器直接加载 HTML/CSS/JS，页面内容由 `main.js` 根据 `siteContent`（空框架）渲染；
文章是 `articles/` 目录里的真实 Markdown 文件，计划数据存在浏览器 `localStorage`。

## 各部分职责

### `index.html` —— 页面骨架

- **谁在跑它**：GitHub Pages，全世界都能访问。
- **干嘛的**：定义整个工作台的骨架 —— 左侧导航、右侧 8 个页面容器、顶栏、页脚、文章阅读模态框。
- 首页 Hero 等内容直接写死在 HTML 里（即使 JS 加载失败，首页也不会变成空白裸页）。

### `js/content.js` —— 空内容框架

- **谁在跑它**：浏览器。
- **干嘛的**：定义 `siteContent = { articles: [], projects: [] }`。
  默认是空的 —— **这里不自动生成任何内容**，只有作者亲手登记的对象才会被渲染。
  数组上方的注释是格式示例，方便照着写。

### `js/main.js` —— 渲染与交互

- **谁在跑它**：浏览器。
- **干嘛的**：
  - 根据 `siteContent.articles` 渲染文章卡片（为空时显示空状态）
  - 点击文章卡片 → `fetch` `articles/*.md` → 极简 Markdown 渲染器 → 显示阅读模态框
  - 根据 `siteContent.projects` 按状态分组渲染项目（为空时显示空状态）
  - 计划页「年 / 月 / 日」三视图，数据存 `localStorage`（`chenji_planner_data`）
  - hash 路由、主题切换、侧边栏折叠、toast、返回顶部
- 首页统计（文章数 / 项目数 / 本地计划天数 / 技能数）**全部真实计算**，没有数据就显示 0。

### `css/style.css` —— 全部样式

- 深色侧边栏（`#132033`）+ 浅色工作台（`#f3f6fb`）
- 首页深色科技感 Hero、卡片式布局、深浅双主题、响应式适配
- 空状态卡片、计划日历、Markdown 阅读样式
- 配色集中在文件顶部的 `:root` / `[data-theme="dark"]` 变量里

### `articles/`、`games/`、`docs/`、`scripts/`、`.github/workflows/`

- `articles/`：真实文章目录（`README.md` 写作说明 + `template.md` 模板）
- `games/`：小游戏目录（`README.md` 添加说明）
- `docs/`：文档中心（架构 / 路线 / 部署 / 学习笔记 / 内容指南）
- `scripts/check.py`：项目自检脚本（关键文件 + HTML 配对 + 空框架结构 + 密钥扫描）
- `.github/workflows/ci.yml`：每次 push 自动跑自检

## GitHub Pages 能做什么 / 不能做什么

**能：**
- 托管纯静态文件（HTML / CSS / JS / 图片 / Markdown）
- 绑定自定义域名
- 免费、免维护、全球 CDN

**不能：**
- 跑 Python / Node 服务端代码 —— Pages 只做「把文件发给你」的事
- 动态处理请求、写数据库 —— 这些必须交给真正的服务器（VPS / Render / Railway…）

所以：**本站的纯静态方案能直接上线；将来想加后端（FastAPI + 数据库），
必须部署到 Render / Railway 等平台**（详见 `docs/deployment.md`）。

## 为什么不用框架？

因为作者是**新手**。这个项目的设计哲学是：

1. **先看懂**：原生 HTML/CSS/JS 一眼就能看懂，改一行字就能看到效果。
2. **再进阶**：等熟练了，再学 React/Vite、FastAPI，一步步走向全栈。
3. **不强上**：GitHub Pages 限制下，纯静态是最稳、最省心的方案。

## 为什么没有假内容？

因为**内容只有真实才有意义**。AI 生成的假文章、假项目、假阅读量只会让网站「看起来丰富」，
却骗不了自己和访客。这个网站刻意做成空框架，等作者亲手把真实内容填进来。

一步一个脚印，慢慢来，比较快。
