# 学习路线 & 项目路线图

> 这个文件包含两部分：
> 1. **学习路线**（从零到全栈，你接下来要学什么）
> 2. **项目版本规划**（这个仓库怎么一步步长起来的）

---

## 一、学习路线

> 主线参考：**能跑起来 > 能看懂 > 能自己造**。每步都有对应的代码在仓库里。

### 1. HTML / CSS / JavaScript（基础，已完成入门 ✅）

- 能看懂根目录 `index.html` 的每个标签、`css/style.css` 的每个选择器
- 能理解 `js/main.js` 里的主题切换、菜单开关这些交互逻辑
- **验收**：不用看文档，能自己给主页加一个区块

### 2. React / Vite（进行中 🔥）

- 仓库对应：`frontend/`
- 先看懂组件怎么拼：`App.jsx` 把 8 个组件串起来
- 理解「数据驱动页面」：改 `src/data/projects.js`，页面自动变
- **验收**：能自己加一个新组件并放进页面

### 3. Python / FastAPI（计划中 📌）

- 仓库对应：`backend/`
- 先跑通：`uvicorn app.main:app --reload`，打开 `/docs` 看接口
- 理解「路由 / 模型 / schema」三个概念
- **验收**：能自己加一个 `/api/todos` 接口

### 4. 数据库（计划中 📌）

- 先用 SQLite（零安装），理解「表 / 记录 / 查询」
- 再升级 PostgreSQL：改 `DATABASE_URL`，代码几乎不用动
- **验收**：能给博客系统加「标签」表

### 5. Docker（计划中 📌）

- 仓库对应：`docker-compose.yml`
- 理解「镜像 / 容器」：把 backend 和 postgres 一键跑起来
- **验收**：`docker compose up` 一次成功

### 6. GitHub Actions（计划中 📌）

- 仓库对应：`.github/workflows/ci.yml`
- 理解「每次 push 自动跑检查」这件事
- **验收**：故意写错一个文件，看 CI 变红

### 7. 部署（计划中 📌）

- 静态主页已经在 GitHub Pages 上了 ✅
- 前端部署到 Vercel / Netlify，后端部署到 Render / Railway
- 详见 [deployment.md](deployment.md)

---

## 二、项目版本规划

### ✅ v1.0 — 上线（2026-08）

- [x] 初始占位页 → 现代单页作品集
- [x] 深/浅色主题切换 + localStorage 记忆
- [x] Hero 打字机效果、响应式布局、移动端汉堡菜单

### ✅ v1.1 — 视觉重构

- [x] 系统字体栈、统一配色、终端风项目封面
- [x] 阅读进度条、返回顶部、无障碍支持
- [x] `assets/avatar.svg`、`scripts/check.py`、`docs/roadmap.md`、`LICENSE`

### ✅ v2.0 — 升级为全栈学习项目（本次）

- [x] 根目录静态主页保留为 landing page，增加「项目结构」导航区块
- [x] `frontend/`：React + Vite，8 个组件 + 静态数据（模拟博客/项目）
- [x] `backend/`：FastAPI + SQLite，5 个示例接口 + 自动文档
- [x] `docs/`：架构、路线、部署、学习笔记
- [x] `.github/workflows/`：CI 检查 + Pages 部署说明
- [x] `docker-compose.yml`：前端 + 后端 + PostgreSQL 三件套
- [x] 专业级 README、CHANGELOG、.env.example

### 🔜 v2.1 — 内容真实化

- [ ] 替换占位邮箱 / 头像为真实信息
- [ ] 写 2~3 篇真实博客文章
- [ ] 前端博客组件改为请求后端 `/api/posts`

### 🔜 v2.2 — 前端上线

- [ ] 前端部署到 Vercel / Netlify
- [ ] 后端部署到 Render / Railway
- [ ] 前后端打通，做一个「能发布文章」的迷你博客

### 🔜 v3.0 — 完整博客系统

- [ ] 文章增删改接口（写操作）
- [ ] PostgreSQL 正式接入
- [ ] 管理员发布功能（先本地登录，不做复杂权限）

---

## 想法收集（暂不承诺）

- [ ] 访问统计（注意隐私）
- [ ] 评论 / 留言（需要真正的后端服务）
- [ ] 中 / 英双语切换
