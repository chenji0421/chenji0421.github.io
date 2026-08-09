<div align="center">

<img src="assets/avatar.svg" width="96" height="96" alt="logo">

# Chenji Learning Hub

📚 **真实可维护的个人学习工作台** —— 一个部署在 GitHub Pages 上的纯静态网站

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

这是一个部署在 **GitHub Pages** 上的纯静态个人学习工作台。左侧固定深色竖向导航栏，
右侧主内容区通过 hash 路由切换页面。

**最重要的一条原则：这里没有假内容。**

- ❌ 没有 Claude / AI 自动生成的假文章
- ❌ 没有假的浏览量、阅读量、点赞数
- ❌ 没有假装做过的假项目
- ❌ 没有编造的统计数字

取而代之的是一个**真实可维护的框架**：文章自己写、项目自己登记、计划自己填。

## 🧩 内容从哪里来（你要知道的 3 件事）

| 内容 | 放在哪里 | 怎么维护 |
| --- | --- | --- |
| 📝 **文章** | `articles/` 目录 + `js/content.js` | 用 Markdown 写文章放进 `articles/`，在 `js/content.js` 的 `siteContent.articles` 里登记。没有文章时网站显示「还没有文章」的空状态。 |
| 📦 **项目** | `js/content.js` | 在 `siteContent.projects` 里登记你真实做过的项目。没有项目时网站显示「还没有项目」。 |
| 🗓️ **计划** | `data/plans.json`（公开）+ 浏览器 `localStorage`（本地草稿） | 计划页分「公开计划 / 本地草稿」两个标签：公开计划写在 `data/plans.json`，所有人可见；本地草稿存你自己的浏览器里，**不会上传服务器**。 |

## ✨ 功能模块

| 模块 | 说明 |
| --- | --- |
| 🏠 **首页** | 深色科技感 Hero + 终端状态卡 + **真实统计**（文章数 / 项目数 / 本地计划天数，全部自动计算，没有数据就显示 0） |
| 📝 **文章** | 空状态 / 文章卡片 + 搜索 + 标签 / 分类 / 月份筛选。点击文章卡片会 `fetch` 对应的 Markdown 文件并渲染成页面 |
| 🗓️ **计划** | 双标签：**公开计划**（`data/plans.json`，只读展示年 / 月 / 日详情，所有人可见）+ **本地草稿**（localStorage，可编辑，仅本人可见）。本地支持导出 / 导入 / 清空 |
| 📦 **项目** | 项目实验室：只显示你真实登记的项目，按状态分组 |
| 🧰 **工具箱** | 真实工具入口：文章模板、写作说明、项目登记说明、部署检查脚本、部署文档 |
| 🎮 **游戏** | 空状态 + iframe 预留区。以后把 HTML 小游戏放进 `games/` 目录就能嵌入 |
| 👤 **关于** | 真实的自我介绍 + 关注方向 + 技能进度（自我评估）+ 时间线 + 学习原则 + 联系方式 |
| 🔧 **维护** | 内容维护说明（站长入口）：本站无后端、无登录，内容全部通过 GitHub 仓库维护 |

## 🛠️ 技术栈

| 层面 | 技术 |
| --- | --- |
| 前端 | 原生 HTML5 · CSS3 · JavaScript（零依赖、零 CDN、零构建） |
| 路由 | hash 路由（`#home` / `#articles` / `#plans` / `#projects` / `#toolbox` / `#games` / `#about` / `#maintain`） |
| 文章 | Markdown 文件 + 极简 Markdown 渲染器（`fetch` 读取，不引外部库） |
| 数据 | `js/content.js`（空框架）+ `data/plans.json`（公开计划）+ `localStorage`（本地草稿 / 主题 / 侧边栏状态） |
| 部署 | GitHub Pages（main 分支 / 根目录，推送即更新） |
| CI | GitHub Actions（`scripts/check.py` 自检：关键文件 / HTML 配对 / 空框架结构 / 密钥扫描） |

## 📁 项目结构

```
chenji0421.github.io/
├── index.html              # 学习工作台主页面（GitHub Pages 入口）
├── css/
│   └── style.css           # 全部样式
├── js/
│   ├── content.js          # 内容框架：siteContent.articles / projects（默认空）
│   └── main.js             # 渲染与交互：路由 / 文章 / 计划 / 主题 / 折叠 …
├── data/
│   └── plans.json          # 公开计划（所有人可见，站长维护）
├── articles/               # 文章目录（真实 Markdown 都放这里）
│   ├── README.md           # 写作说明
│   └── template.md         # 文章模板
├── games/                  # 游戏目录
│   └── README.md           # 小游戏添加说明
├── assets/
│   ├── avatar.svg          # 头像
│   └── favicon.svg         # 站点图标
├── docs/
│   ├── README.md           # 文档导航
│   ├── roadmap.md          # 学习路线
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

**哪些数据是公开的（会随 GitHub Pages 部署到网上）：**

- `js/content.js` 里登记的**文章和项目**——你在 `articles/` 写的 Markdown 也会公开
- **公开计划** `data/plans.json`——你写进去的计划所有人可见
- `index.html` / `css/` / `js/` 的静态内容
- 所以：**不要写密码、Token、隐私信息到这些文件里**

**哪些数据只存在你自己的浏览器里（`localStorage`，不上传）：**

- 计划页「本地草稿」的年 / 月 / 日计划数据（键名 `chenji_planner_data`）
- 主题偏好（键名 `hub_theme`）
- 这些数据换浏览器 / 换设备就没了，**不会自动同步**

## 🌐 GitHub Pages 部署

**当前状态：默认部署（main 分支 / 根目录）**，推送即更新。

1. 修改 `index.html` / `css/style.css` / `js/*.js` / `articles/`
2. 提交并推送：
   ```bash
   git add .
   git commit -m "feat: 更新内容"
   git push origin main
   ```
3. GitHub Actions 会自动运行 `scripts/check.py` 自检；
   GitHub Pages 会在几十秒内重新构建上线

详细说明见 [docs/deployment.md](docs/deployment.md)。

## ✍️ 快速上手

**写一篇文章：**
1. 复制 [`articles/template.md`](articles/template.md) 为 `articles/我的文章.md`
2. 填好标题、日期、标签、摘要，写正文
3. 在 [`js/content.js`](js/content.js) 的 `siteContent.articles` 里加一个对象，`file` 指向上面的文件
4. `git push`，文章就会出现在网站「文章」页

**添加一个项目：**
1. 在 [`js/content.js`](js/content.js) 的 `siteContent.projects` 里加一个对象
2. 写上名称、状态、简介、技术栈、仓库链接
3. `git push`，项目就会出现在「项目」页

**使用计划系统：**
- **公开计划**：想给别人看的计划写进 `data/plans.json` 并推送，所有访问者都能看到（只读）
- **本地草稿**：在「计划」页切到「本地草稿」标签，年表 → 月表 → 点某一天填写目标 / 上午 / 下午 / 晚上 / 复盘 / 状态，点「保存」
- 本地草稿只存在你自己的浏览器里，可以用「导出 JSON / 导入 JSON」备份，**不会上传到网站**

## 🗺️ 后续计划

- [x] v0.1.0：初始 GitHub Pages 上线
- [x] v0.2.0：项目结构拆分
- [x] v0.3.0：Learning Hub 重构（8 模块 + 左侧导航 + hash 路由）
- [x] v0.4.0：文章中心 / 计划面板 / 项目实验室 / 工具箱增强
- [x] v0.5.0：**去除全部假内容，重构为真实可维护的空框架**
- [x] v0.6.0：**计划系统拆分为公开计划（data/plans.json）+ 本地草稿（localStorage）**
- [ ] v0.6.1：写出第一批真实文章、登记第一个真实项目
- [ ] v0.7.0：如果需要评论区（如 Giscus）或可嵌入的小游戏
- [ ] v1.0.0：如果愿意，学习后端与数据库，做真正的全栈打通

## 🎯 学习目标

1. 用原生 HTML / CSS / JS 做一个「真正在用」的多页面系统
2. 掌握 hash 路由、localStorage、DOM 渲染与事件委托
3. 学会用 GitHub Pages + GitHub Actions 自动部署
4. 保持「长期维护」的节奏，内容全部真实

## 👤 作者

- **Chenji** —— 非计算机专业大二学生，正在学习 Python、网页开发与数据分析
- GitHub：[chenji0421](https://github.com/chenji0421)
- 网站：[chenji0421.github.io](https://chenji0421.github.io)

## 📄 License

[MIT](LICENSE) © chenji0421
