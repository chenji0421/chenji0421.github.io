# 部署指南

这个项目分四层，**每一层能部署到哪里**不一样。先记一个结论：

> **GitHub Pages 只托管静态文件。** 只要涉及「运行代码、连数据库」的东西，都上不了 Pages。

## 1. 静态主页（根目录 `index.html`）→ GitHub Pages ✅ 已上线

当前就是这个状态：`main` 分支根目录，推送即更新。

```bash
# 改完内容后一键上线
bash scripts/deploy.sh "更新说明"
```

- 线上地址：https://chenji0421.github.io

### 首次部署（只需一次）

1. 仓库已启用 GitHub Pages 的话，什么都不用做，`main` 分支就是线上内容。
2. 如果还没启用：
   - 仓库 → `Settings` → 左侧 `Pages`
   - `Build and deployment` → `Deploy from a branch`
   - 分支选 `main`，目录选 `/ (root)`，保存
   - 等 1~3 分钟访问即可

### 每次更新

```bash
python scripts/check.py          # 推送前自检（0 错误再推）
bash scripts/deploy.sh "更新说明"
```

## 2. 前端（`frontend/`，React + Vite）→ Vercel / Netlify（未来）

Pages 的默认部署不会构建 Vite 项目，所以前端**目前只在本地跑**。

```bash
cd frontend
npm install
npm run dev      # 打开 http://localhost:5173
```

将来想上线，推荐 **Vercel** 或 **Netlify**（免费、对新手友好）：

- 连接这个 GitHub 仓库
- 构建命令 `npm run build`，输出目录 `dist`
- 它们会自动识别 Vite，几分钟搞定

> 提示：`vite.config.js` 里 `base: './'` 是相对路径，
> 放到任何子路径都能直接用构建产物。

## 3. 后端（`backend/`，FastAPI）→ Render / Railway / 云服务器（未来）

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload   # 接口文档 http://127.0.0.1:8000/docs
```

将来上线可选：

- **Render / Railway**：免费额度够个人项目用，连仓库填启动命令
  `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- **云服务器**：最自由，但要自己管环境、域名、HTTPS

## 4. 数据库 → PostgreSQL（未来）

- 本地现在用 **SQLite**，零安装，学起来没负担。
- `docker-compose.yml` 里预留了 **PostgreSQL** 服务，想升级时：
  1. 给 backend 设置 `DATABASE_URL=postgresql+psycopg2://...`
  2. 重启服务。代码不用改（用的都是 SQLAlchemy）

## Docker Compose（本地学习 / 展示）

```bash
docker compose up --build
```

| 服务 | 端口 | 说明 |
| --- | --- | --- |
| `frontend` | 5173 | Vite 开发服务器（热更新） |
| `backend` | 8000 | FastAPI，连 PostgreSQL |
| `postgres` | 5432 | 数据库（示例） |

> ⚠️ **GitHub Pages 不跑 Docker。** Docker 方案只用于本地体验
> 「微服务 + 数据库」的感觉，别指望它部署到 Pages 上。

## 部署决策速查表

| 要部署什么 | 用什么 | 能上 GitHub Pages 吗 |
| --- | --- | --- |
| 静态主页 | GitHub Pages | ✅ |
| React 前端 | Vercel / Netlify | ❌（需构建） |
| FastAPI 后端 | Render / Railway / VPS | ❌（需运行代码） |
| PostgreSQL | Render / Railway 托管 | ❌（需服务进程） |

## 常见问题

**Q：推送后网站没变化？**
A：GitHub Pages 构建需要 1~3 分钟，稍等并强制刷新（Ctrl+F5）。

**Q：改了内容但线上还是旧的？**
A：确认 `git push` 成功，且 URL 是 `https://chenji0421.github.io`（不是本地路径）。

**Q：想换静态主页的主题色？**
A：改 `css/style.css` 顶部的 `--accent` 和 `--accent-2`，全站颜色统一变化。
