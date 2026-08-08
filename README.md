<div align="center">

<img src="assets/avatar.svg" width="96" height="96" alt="logo">

# chenji0421.github.io

🚀 **个人主页 + 技术博客 + 项目展示** · 一个为「非科班大学生自学编程」而生的全栈学习项目

[🔗 在线访问](https://chenji0421.github.io) ·
[📖 文档中心](docs/README.md) ·
[🗺️ 学习路线](docs/roadmap.md)

![Pages](https://img.shields.io/github/deployments/chenji0421/chenji0421.github.io/github-pages?label=Pages&logo=github&style=flat-square)
![CI](https://img.shields.io/github/actions/workflow/status/chenji0421/chenji0421.github.io/ci.yml?branch=main&label=CI&logo=github&style=flat-square)
![License](https://img.shields.io/github/license/chenji0421/chenji0421.github.io?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/chenji0421/chenji0421.github.io?style=flat-square)
![Stars](https://img.shields.io/github/stars/chenji0421/chenji0421.github.io?style=flat-square)

</div>

---

## 📌 项目简介

一个「**从静态页一路长成全栈**」的学习项目。仓库里既有一眼能看懂的纯 HTML 主页，
也有 React 前端示例、FastAPI 后端示例，还有一整套文档。

> 作者是**非计算机专业的大二学生**，会一点 Python，正在学网页开发、数据分析与自动化。
> 这个项目就是他的「学习展示柜」：**代码要清晰，注释要多，别过度工程化。**

## ✨ 项目亮点

- 🏠 **根目录静态主页**：GitHub Pages 直接托管，改完推 GitHub 就上线
- ⚛️ **React + Vite 前端**：8 个组件 + 静态模拟数据，体验现代前端开发
- 🐍 **FastAPI 后端**：5 个示例接口 + 自动文档，用 SQLite 起步、可换 PostgreSQL
- 📖 **完整文档**：架构说明、学习路线、部署方案、新手笔记
- 🔄 **GitHub Actions**：push 自动跑 Python 语法检查、自检脚本、前端构建
- 🐳 **Docker Compose**：前端 + 后端 + PostgreSQL 一键起三件套
- 🧪 **自检脚本**：发布前检查关键文件、HTML 配对、疑似密钥

## 🛠️ 技术栈

| 层面 | 技术 |
| --- | --- |
| 静态主页 | 原生 HTML5 · CSS3（双主题） · JavaScript |
| 前端 | React 18 · Vite 6 · 纯 CSS（无 UI 库） |
| 后端 | Python · FastAPI · SQLAlchemy · Pydantic |
| 数据库 | SQLite（本地）· PostgreSQL（Docker/未来） |
| CI/CD | GitHub Actions · GitHub Pages |
| 容器 | Docker · Docker Compose |

## 📁 项目结构

```
chenji0421.github.io/
├── index.html              # 静态主页（GitHub Pages 入口，已上线）
├── frontend/               # React + Vite 前端（本地运行）
│   ├── src/
│   │   ├── components/     # 8 个页面组件
│   │   ├── data/           # 模拟数据（项目 / 博客）
│   │   └── styles/         # 主题样式
│   ├── package.json
│   └── vite.config.js
├── backend/                # FastAPI 后端（本地运行）
│   ├── app/
│   │   ├── routers/        # posts / projects / health 接口
│   │   ├── models.py       # ORM 模型
│   │   ├── schemas.py      # API 传输结构
│   │   └── ...
│   └── requirements.txt
├── docs/                   # 文档中心
├── scripts/                # 自检 & 一键启动脚本
├── .github/workflows/      # CI + Pages 部署
├── assets/                 # 头像 / 图标
├── docker-compose.yml      # 本地全栈三件套
├── .env.example            # 环境变量示例（不含真实值）
└── README.md
```

## 🚀 快速开始

### 0. 先看静态主页（已上线，无需任何操作）

直接访问 https://chenji0421.github.io

### 1. 本地预览静态主页

```bash
python -m http.server 8000     # 或：npx serve .
# 浏览器打开 http://localhost:8000
```

### 2. 运行 React 前端

```bash
cd frontend
npm install
npm run dev
# 浏览器打开 http://localhost:5173
```

### 3. 运行 FastAPI 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# 接口文档：http://127.0.0.1:8000/docs
```

### 4. 一键同时启动前端 + 后端

```bash
# Windows：双击 scripts/dev.bat
# 其他系统：
bash scripts/dev.sh
```

### 5. 用 Docker 起三件套（前端 + 后端 + PostgreSQL）

```bash
docker compose up --build
```

## 🧪 检查脚本

```bash
python scripts/check.py
```

检查内容：
- 关键文件是否存在（README、frontend/package.json、backend/requirements.txt …）
- Python 文件语法
- 根目录 index.html 标签配对 / 锚点 / 本地资源
- 是否残留 `example.com` 等占位内容（提醒）
- 是否误提交疑似密钥 / token（阻断）

## 🌐 GitHub Pages 部署说明

**当前状态：默认部署（main 分支 / 根目录）**，推送即更新：

```bash
bash scripts/deploy.sh "更新说明"
```

**重要说明（请务必读完）：**

| 内容 | 能否部署到 GitHub Pages | 原因 / 替代方案 |
| --- | --- | --- |
| 根目录静态主页 | ✅ 已上线 | Pages 托管纯静态文件 |
| React 前端（frontend/） | ⚠️ 需要手动构建 | 见下方「前端上线」 |
| FastAPI 后端（backend/） | ❌ 不能 | Pages 跑不了服务端代码，部署到 Render / Railway |
| PostgreSQL | ❌ 不能 | 需要真正的数据库服务 |

- **前端上线**：仓库里已备好 `.github/workflows/pages.yml`，手动运行它会把前端
  构建产物发布到 `gh-pages` 分支，然后到 `Settings → Pages` 把来源切换成
  `gh-pages / (root)` 即可。更推荐直接部署到 **Vercel / Netlify**（构建命令
  `npm run build`，输出目录 `dist`）。
- **后端上线**：部署到 **Render / Railway**（免费额度够用），启动命令
  `uvicorn app.main:app --host 0.0.0.0 --port 8000`。
- **数据库**：本地用 SQLite；想升级 PostgreSQL 时，改环境变量 `DATABASE_URL` 即可
  （`docker-compose.yml` 已预留 PostgreSQL 服务）。

## 🗺️ 后续计划

- [x] v1.0 ~ v1.1：静态作品集上线、视觉重构
- [x] v2.0：升级为全栈学习项目（前端 + 后端 + 文档 + CI + Docker）
- [ ] v2.1：真实内容（邮箱、头像、博客文章）
- [ ] v2.2：前端部署到 Vercel、后端部署到 Render，前后端打通
- [ ] v3.0：完整博客系统（文章增删改 + PostgreSQL）

详见 [docs/roadmap.md](docs/roadmap.md)。

## 🎯 学习目标

1. 看懂一个真实项目的完整结构（不是只写几个 demo）
2. 体验「前端拿数据 → 渲染页面」的全栈流程
3. 学会用 Git / GitHub / GitHub Actions 管理项目
4. 一步步从静态页 → 框架 → 后端 → 数据库 → 部署

## 👤 作者

- **Chenji** —— 非计算机专业大二学生，正在自学 Python、网页开发与数据分析
- GitHub：[chenji0421](https://github.com/chenji0421)
- 网站：[chenji0421.github.io](https://chenji0421.github.io)

## 📄 License

[MIT](LICENSE) © chenji0421
