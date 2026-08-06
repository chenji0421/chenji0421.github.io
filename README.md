<div align="center">

<img src="assets/avatar.svg" width="96" height="96" alt="logo">

# chenji0421.github.io

🚀 现代 · 简洁 · 科技感的学生个人主页 / 作品集

纯 HTML / CSS / JavaScript，零框架、零依赖、零构建步骤，部署在 GitHub Pages。

[🔗 在线访问](https://chenji0421.github.io) ·
[📖 内容自定义](docs/CONTENT.md) ·
[🗺️ 项目路线图](docs/roadmap.md)

![GitHub Pages](https://img.shields.io/github/deployments/chenji0421/chenji0421.github.io/github-pages?label=Pages&logo=github&style=flat-square)
![License](https://img.shields.io/github/license/chenji0421/chenji0421.github.io?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/chenji0421/chenji0421.github.io?style=flat-square)
![Stars](https://img.shields.io/github/stars/chenji0421/chenji0421.github.io?style=flat-square)

</div>

---

## ✨ 特性

- 🎨 **现代极简设计**：渐变点缀 + 玻璃拟态卡片 + 终端风装饰
- 🌙 **深浅色主题**：默认跟随系统偏好，可一键切换并记忆选择
- ⌨️ **Hero 打字机效果** + 首屏个人介绍 + 数据条
- 📱 **完全响应式**：移动端汉堡菜单、触控友好的点按目标
- 🧭 **滚动体验**：阅读进度条、平滑锚点跳转、区块高亮、返回顶部
- 🚀 **纯静态零依赖**：系统字体栈，无 Google Fonts 等外部请求，国内访问更快更稳

## 🛠️ 技术栈

| 层面 | 技术 |
| --- | --- |
| 结构 | 语义化 HTML5 |
| 样式 | 原生 CSS3 · CSS 变量驱动双主题 |
| 交互 | 原生 JavaScript（ES5 语法，兼容性好） |
| 部署 | GitHub Pages（`main` 分支根目录） |
| 工具 | `scripts/deploy.sh` 一键推送 · `scripts/check.py` 自检 |

## 📁 项目结构

```
chenji0421.github.io/
├── index.html             # 主页（单页作品集）
├── css/
│   └── style.css          # 全部样式（CSS 变量驱动双主题）
├── js/
│   └── main.js            # 交互脚本（主题/菜单/动画/进度）
├── assets/
│   ├── favicon.svg        # 站点图标
│   └── avatar.svg         # 头像占位图（可换成你自己的照片）
├── docs/
│   ├── CONTENT.md         # 内容自定义指南
│   ├── DEPLOYMENT.md      # 部署与更新指南
│   └── roadmap.md         # 项目开发路线图
├── scripts/
│   ├── check.py           # 网站自检脚本（HTML/资源/锚点/占位）
│   └── deploy.sh          # 一键提交推送脚本
├── LICENSE                # MIT License
├── .gitignore
└── README.md
```

## 🚀 快速开始

### 本地预览

```bash
# 任选其一
python -m http.server 8000   # 需要 Python
npx serve .                  # 需要 Node.js
```

浏览器打开 `http://localhost:8000`（或 serve 提示的端口）。

### 部署

站点位于 `main` 分支根目录，推送后 GitHub Pages 自动更新：

```bash
bash scripts/deploy.sh "更新内容说明"
```

推送前建议先跑一遍自检：

```bash
python scripts/check.py
```

## ✅ 检查脚本

`scripts/check.py` 用纯 Python 标准库实现，无需安装依赖，用于发布前检查：

- HTML 标签是否配对闭合
- 锚点链接是否有对应的 `id`
- `href` / `src` 引用的本地文件是否存在
- 是否残留 `example.com`、`TODO` 等占位文本
- 是否误提交疑似密钥 / token

```bash
python scripts/check.py
# 结果：0 错误，0 警告
```

## ✏️ 自定义

想改成你自己的名字、技能、项目？见 [docs/CONTENT.md](docs/CONTENT.md)。
部署细节见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。
项目后续规划见 [docs/roadmap.md](docs/roadmap.md)。

## 📄 License

[MIT](LICENSE) © chenji0421
