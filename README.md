<div align="center">

<img src="assets/avatar.svg" width="96" height="96" alt="logo">

# Chenji Learning Hub

📚 **个人学习工作台 / 知识库 / 作品展示平台** —— 一个部署在 GitHub Pages 上的纯静态多页面个人系统

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
右侧主内容区通过 hash 路由切换页面，整体气质参考「后台管理系统 + 个人知识库 +
技术博客工作台」，但**不复制任何现有项目的代码或文案**。

> 作者是**非计算机专业的大二学生**，正在自学 Python、网页开发与数据分析。
> 这个网站就是他的学习工作台：**文章、计划、项目、工具箱、游戏、关于、登录**，
> 全部是静态演示与本地数据，打开就能用、长期维护中。

**核心约束**：GitHub Pages 只能托管静态文件，所以本项目**不依赖后端、数据库、登录系统、npm 构建**。
所有交互（搜索、筛选、编辑计划表）都在浏览器本地完成，数据存 `localStorage`。

## ✨ 功能模块

| 模块 | 说明 |
| --- | --- |
| 🏠 **首页** | 深色科技感 Hero：大标题 + 终端状态卡 + 统计卡片 + 当前学习状态 + 最近更新 + 快捷入口 |
| 📝 **文章** | 12 篇文章：搜索 + 标签 / 分类 / 月份筛选 + 置顶文章 + 热门文章榜 + 卡片列表 |
| 🗓️ **计划** | Summer Sprint 阶段冲刺计划：三栏目标 + 12 行可编辑时间表（新增 / 删除 / 恢复模板 / 复制 / 本地保存） |
| 📦 **项目** | 项目实验室：10 个项目按「已上线 / 进行中 / 计划中 / 长期计划」分组 |
| 🧰 **工具箱** | 学习工具、文件整理设想、Markdown 模板、Git 命令速查、检查脚本说明、AI 辅助工作流 |
| 🎮 **游戏** | Card War 在线试玩占位区 + 规则 / 技术实现 / 后续计划说明卡 |
| 👤 **关于** | 简介 + 关注方向 + 技能进度条 + 成长时间线 + 学习原则 + 联系方式 |
| 🔐 **登录** | 静态演示，明确标注「不会上传账号密码，请勿输入真实密码」 |

## 🛠️ 技术栈

| 层面 | 技术 |
| --- | --- |
| 前端 | 原生 HTML5 · CSS3 · JavaScript（零依赖、零 CDN、零构建） |
| 路由 | hash 路由（`#home` / `#articles` / `#plans` / `#projects` / `#toolbox` / `#games` / `#about` / `#login`） |
| 数据 | `js/data.js` 静态数据 + `localStorage` 本地保存（键名 `hub_*`） |
| 部署 | GitHub Pages（main 分支 / 根目录，推送即更新） |
| CI | GitHub Actions（`scripts/check.py` 自检：关键文件 / HTML 配对 / 数据完整性 / 密钥扫描） |

## 📁 项目结构

```
chenji0421.github.io/
├── index.html              # 学习工作台主页面（GitHub Pages 入口）
├── css/
│   └── style.css           # 全部样式：深色侧边栏 + 工作台主题 + 深浅色 + 响应式
├── js/
│   ├── data.js             # 静态数据：导航 / 12 篇文章 / 计划 / 10 个项目 / 工具箱 / 游戏 / 关于
│   └── main.js             # 渲染与交互：路由 / 筛选 / localStorage / toast / 主题 …
├── assets/
│   ├── avatar.svg          # 头像
│   └── favicon.svg         # 站点图标
├── docs/                   # 文档中心
│   ├── README.md           # 文档导航
│   ├── roadmap.md          # 学习路线
│   ├── learning-notes.md   # 学习笔记说明
│   └── deployment.md       # GitHub Pages 部署说明
├── scripts/
│   └── check.py            # 项目自检脚本
├── .github/workflows/      # ci.yml：push / PR 自动自检
├── README.md
├── CHANGELOG.md
├── LICENSE                 # MIT
└── .gitignore
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

## 💾 数据存储说明

- **静态数据**：文章、项目、技能、时间线等全部写在 `js/data.js` 里，改文件即可改内容
- **本地保存**：计划表的编辑内容、主题偏好、侧边栏状态保存在浏览器 `localStorage`
  （键名 `hub_*`），**不会上传到任何服务器**
- **清空本地数据**：浏览器设置里清除该站点的站点数据即可

## 🌐 GitHub Pages 部署

**当前状态：默认部署（main 分支 / 根目录）**，推送即更新。

1. 修改 `index.html` / `css/style.css` / `js/*.js`
2. 提交并推送：
   ```bash
   git add .
   git commit -m "feat: 更新说明"
   git push origin main
   ```
3. GitHub Actions 会自动运行 `scripts/check.py` 自检；
   GitHub Pages 会在几十秒内重新构建上线

详细说明见 [docs/deployment.md](docs/deployment.md)。

## 📷 页面截图

（截图占位：直接打开 https://chenji0421.github.io 查看效果）

| 页面 | 说明 |
| --- | --- |
| 首页 | 深色科技感 Hero + 终端框 + 统计卡 + 学习状态 + 最近更新 + 快捷入口 |
| 文章 | 搜索框 + 标签/分类/月份筛选 + 热门榜 + 置顶 + 12 篇卡片墙 |
| 计划 | Summer Sprint 大卡片 + 三栏目标 + 可编辑 12 行时间表 |
| 项目 | 项目实验室，10 个项目按四种状态分组 |
| 工具箱 | 6 张工具卡：学习工具 / 文件整理 / Markdown 模板 / Git 命令 / 检查脚本 / AI 工作流 |
| 游戏 | Card War 占位区 + 规则 / 技术 / 计划卡片 |
| 关于 | 简介 / 关注方向 / 技能进度 / 时间线 / 学习原则 / 联系方式 |
| 登录 | 静态演示登录页，GitHub 按钮 + 邮箱折叠表单 |

## 🗺️ 后续计划

- [x] v0.1.0：初始 GitHub Pages 上线
- [x] v0.2.0：项目结构拆分
- [x] v0.3.0：Learning Hub 重构（8 模块 + 左侧导航 + hash 路由）
- [x] v0.4.0：文章中心 / 计划面板 / 项目实验室 / 工具箱增强
- [ ] v0.5.0：文章写真实笔记、替换占位邮箱与头像
- [ ] v0.6.0：接入评论区（如 Giscus）、添加更多可玩的小游戏
- [ ] v1.0.0：如果愿意，把后端（FastAPI）部署到 Render/Railway，做真正的全栈打通

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
