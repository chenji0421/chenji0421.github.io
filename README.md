<div align="center">

<img src="assets/avatar.svg" width="96" height="96" alt="logo">

# Chenji · 个人学习工作台

📚 **个人知识库 + 学习工作台 + 作品展示平台** —— 不是普通个人主页，而是一个「看起来在长期维护」的多页面个人系统

[🔗 在线访问](https://chenji0421.github.io) ·
[📖 文档中心](docs/README.md) ·
[🗺️ 学习路线](docs/roadmap.md)

![Pages](https://img.shields.io/github/deployments/chenji0421/chenji0421.github.io/github-pages?label=Pages&logo=github&style=flat-square)
![CI](https://img.shields.io/github/actions/workflow/status/chenji0421/chenji0421.github.io/ci.yml?branch=main&label=CI&logo=github&style=flat-square)
![License](https://img.shields.io/github/license/chenji0421/chenji0421.github.io?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/chenji0421/chenji0421.github.io?style=flat-square)

</div>

---

## 📌 项目简介

一个部署在 **GitHub Pages** 上的纯静态个人学习工作台。左侧固定深色竖向导航栏，
右侧主内容区通过 hash 路由切换页面，风格参考「知识库 + 学习工作台 + 技术博客后台」。

> 作者是**非计算机专业的大二学生**，正在自学 Python、网页开发与数据分析。
> 这个网站就是他的学习工作台：**文章、计划、项目、游戏、关于、登录**，全部是静态演示与本地数据。

**核心约束**：GitHub Pages 只能托管静态文件，所以本项目**不依赖后端、数据库、登录系统**。
所有交互（搜索、筛选、编辑计划表）都在浏览器本地完成，数据存 `localStorage`。

## ✨ 项目亮点

- 🧭 **左侧深色竖向导航**：后台管理式布局，收起 / 展开 / 移动端抽屉
- 🏠 **首页深色科技感 Hero**：终端风格信息框 + 统计卡片 + 网格背景
- 📝 **文章中心**：9 篇文章 + 搜索 + 标签 / 分类 / 月份筛选 + 热门文章榜
- 🗓️ **计划面板**：可编辑的每日时间段表，`localStorage` 本地保存、恢复模板、复制导出
- 📦 **项目实验室**：8 个项目按「已完成 / 进行中 / 计划中」分组
- 🎮 **游戏工作台**：Card War 在线试玩占位区 + 游戏介绍卡片
- 👤 **关于页**：简介 + 关注方向 + 技能进度 + 时间线 + 联系方式
- 🔐 **登录页**：静态演示，明确标注「未接入真实登录」
- 🌓 **深浅双主题**：一键切换，首页始终保持深色科技感
- 📱 **完全响应式**：桌面侧边栏固定，移动端抽屉菜单 + 卡片单列

## 🛠️ 技术栈

| 层面 | 技术 |
| --- | --- |
| 前端 | 原生 HTML5 · CSS3 · JavaScript（零依赖、零 CDN） |
| 路由 | hash 路由（`#home` / `#articles` / `#plans` / `#projects` / `#games` / `#about` / `#login`） |
| 数据 | `js/data.js` 静态模拟数据 + `localStorage` 本地保存 |
| 部署 | GitHub Pages（main 分支 / 根目录） |
| CI | GitHub Actions（Python 语法检查 + 自检脚本） |

> 仓库里还保留着之前「全栈学习项目」阶段的 `frontend/`（React）与 `backend/`（FastAPI）示例，
> 供本地学习参考，**不会影响** GitHub Pages 上的静态站点。

## 📁 项目结构

```
chenji0421.github.io/
├── index.html              # 个人学习工作台（GitHub Pages 入口，已上线）
├── css/
│   └── style.css           # 全部样式：深色侧边栏 + 工作台主题 + 响应式
├── js/
│   ├── data.js             # 静态数据（文章 / 计划 / 项目 / 技能 / 时间线）
│   └── main.js             # 交互：路由 / 筛选 / localStorage / toast …
├── assets/
│   ├── avatar.svg          # 头像
│   └── favicon.svg         # 站点图标
├── docs/                   # 文档（架构 / 路线 / 部署 / 学习笔记）
├── scripts/                # 自检脚本 check.py + 一键启动脚本
├── .github/workflows/      # CI 自动检查 + Pages 说明
├── frontend/               # （本地学习用）React 前端示例
├── backend/                # （本地学习用）FastAPI 后端示例
├── docker-compose.yml      # （本地学习用）全栈三件套
├── .env.example            # 环境变量示例（不含真实值）
├── CHANGELOG.md
└── README.md
```

## 🚀 本地预览

无需安装任何依赖，静态页面打开即跑：

```bash
# 方式一：Python 自带的静态服务器
python -m http.server 8000
# 浏览器打开 http://localhost:8000

# 方式二：Node 的 npx serve
npx serve .
```

想快速起服务也可以：`bash scripts/dev.sh`（或双击 `scripts/dev.bat`）。

## 💾 数据存储说明

- **静态数据**：文章、项目、技能、时间线等全部写在 `js/data.js` 里，改文件即可改内容
- **本地保存**：计划表的编辑内容、主题偏好、侧边栏状态保存在浏览器 `localStorage`
  （键名 `workbench_*`），不会上传到任何服务器
- **清空本地数据**：浏览器设置里清除该站点的站点数据即可

## 🌐 GitHub Pages 部署

**当前状态：默认部署（main 分支 / 根目录）**，推送即更新：

```bash
bash scripts/deploy.sh "更新说明"
```

GitHub Actions 会在每次 push 时自动运行 `scripts/check.py`（关键文件 + Python 语法 + HTML 配对 + 密钥扫描）。

## 📷 页面截图

| 页面 | 说明 |
| --- | --- |
| 首页 | 深色科技感 Hero：大标题 + 终端框 + 统计卡片 + 最近在做的事 |
| 文章 | 搜索框 + 标签/分类/月份筛选 + 热门文章 + 文章卡片墙 |
| 计划 | Summer Sprint 大卡片 + 三栏计划 + 可编辑时间段表格 |
| 项目 | 项目实验室，按已完成 / 进行中 / 计划中分组 |
| 游戏 | Card War 在线试玩占位区 + 规则 / 技术 / 计划卡片 |
| 关于 | 简介 / 关注方向 / 技能进度 / 时间线 / 联系方式 |
| 登录 | 静态演示登录页，GitHub 登录按钮 + 邮箱折叠表单 |

（截图占位：直接打开 https://chenji0421.github.io 查看效果）

## 🗺️ 后续计划

- [x] v1.0 ~ v1.1：静态作品集上线、视觉重构
- [x] v2.0：升级为全栈学习项目（React + FastAPI + CI + Docker）
- [x] v2.2：重构为「个人学习工作台」多页面系统
- [ ] v2.3：文章内容写真实笔记、替换占位邮箱与头像
- [ ] v2.4：接入评论区（如 Giscus）、添加更多小游戏
- [ ] v3.0：如果愿意，把 backend/ 部署到 Render/Railway，做真正的全栈打通

详见 [docs/roadmap.md](docs/roadmap.md)。

## 🎯 学习目标

1. 用原生 HTML / CSS / JS 做一个「真正在用」的多页面系统
2. 掌握 hash 路由、localStorage、DOM 渲染与事件委托
3. 学会用 GitHub Pages + GitHub Actions 自动部署
4. 保持「长期维护」的节奏，把网站当学习工作台用

## 👤 作者

- **Chenji** —— 非计算机专业大二学生，正在自学 Python、网页开发与数据分析
- GitHub：[chenji0421](https://github.com/chenji0421)
- 网站：[chenji0421.github.io](https://chenji0421.github.io)

## 📄 License

[MIT](LICENSE) © chenji0421
