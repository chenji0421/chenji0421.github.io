# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [2.0.0] - 2026-08-08

### 新增
- `frontend/`：React + Vite 前端（8 个组件 + 静态模拟数据）
- `backend/`：FastAPI 后端（posts / projects / health 接口 + SQLite + 自动文档）
- `docs/`：文档中心（architecture / roadmap / deployment / learning-notes）
- `scripts/`：`dev.sh`、`dev.bat` 一键启动脚本；`check.py` 升级为项目级自检
- `.github/workflows/`：`ci.yml`（自动检查）、`pages.yml`（前端构建部署说明）
- `docker-compose.yml`：前端 + 后端 + PostgreSQL 三件套
- `.env.example`、`CHANGELOG.md`
- 根目录静态主页新增「项目结构」导航区块

### 变更
- 根目录 `index.html` 保留为 landing page（GitHub Pages 入口不变）
- `docs/DEPLOYMENT.md` 重命名为 `docs/deployment.md` 并扩充为全栈部署指南

## [1.1.0] - 2026-08-07

### 新增
- 去掉 Google Fonts，改用系统字体栈（国内访问更快）
- 统一配色、卡片阴影 / 圆角 / 字体层级优化
- 终端风项目封面，增强作品集 / 技术感
- 首屏数据条 + 状态徽章 + `~/whoami` 终端彩蛋
- 阅读进度条、返回顶部按钮、更自然的深浅色过渡
- `assets/avatar.svg` 头像占位图、`scripts/check.py` 自检脚本
- `docs/roadmap.md` 与 `LICENSE`
- 无障碍支持（跳过链接、`:focus-visible`、`prefers-reduced-motion`）

## [1.0.0] - 2026-08-05

### 新增
- 初始占位页 → 现代单页作品集
- 深 / 浅色主题切换 + localStorage 记忆
- Hero 打字机效果
- 响应式布局与移动端汉堡菜单
- 项目级目录结构（`docs/`、`scripts/`、`assets/`）
