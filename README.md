# chenji0421.github.io

> 一个现代、清爽、带深色模式的个人主页 & 作品集。部署在 GitHub Pages，纯静态，零依赖。

## ✨ 特性

- 🎨 现代极简设计：渐变点缀 + 玻璃拟态卡片 + 滚动入场动画
- 🌙 深色 / 浅色主题一键切换（记忆你的选择）
- ⌨️ Hero 区打字机效果
- 📱 完全响应式，手机也能舒适浏览
- 🚀 纯静态，无框架、无构建步骤，开箱即用

## 📁 项目结构

```
chenji0421.github.io/
├── index.html          # 主页（单页作品集）
├── css/
│   └── style.css       # 全部样式（CSS 变量驱动双主题）
├── js/
│   └── main.js         # 交互脚本（主题/菜单/动画）
├── assets/
│   └── favicon.svg     # 站点图标
├── docs/
│   ├── DEPLOYMENT.md   # 部署与更新指南
│   └── CONTENT.md      # 内容自定义指南
├── scripts/
│   └── deploy.sh       # 一键提交推送脚本
└── README.md
```

## 🚀 快速开始

### 本地预览

```bash
# 任选其一
npx serve .            # 需要 Node.js
python -m http.server  # 需要 Python
```

然后浏览器打开 `http://localhost:3000`（serve）或 `http://localhost:8000`（http.server）。

### 部署

站点位于 `main` 分支根目录，推送后 GitHub Pages 会自动更新：

```bash
./scripts/deploy.sh "更新内容说明"
```

或者手动：

```bash
git add -A
git commit -m "更新站点"
git push origin main
```

## ✏️ 自定义

想改成你自己的名字、技能、项目？见 [docs/CONTENT.md](docs/CONTENT.md)。
部署细节见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。

## 📄 License

[MIT](LICENSE) © chenji0421
