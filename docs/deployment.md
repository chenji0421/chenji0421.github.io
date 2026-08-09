# 部署指南

> 先记一个核心结论：
> **GitHub Pages 只托管静态文件，不运行任何代码。**
> 只要涉及「后端、数据库、构建」的东西，都上不了 Pages —— 本站是纯静态的，所以没问题。

## 1. 静态网站（根目录 `index.html`）→ GitHub Pages ✅ 已上线

当前就是这个状态：`main` 分支根目录，推送即更新。
线上地址：**https://chenji0421.github.io**

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
git add .
git commit -m "feat: 更新说明"
git push origin main
```

GitHub Actions（`.github/workflows/ci.yml`）会自动再跑一次自检，
GitHub Pages 会在几十秒内重建上线。

## 2. 内容数据在哪里

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 文章 | `articles/*.md` + `js/content.js` | 文章正文是 Markdown 文件，登记后网站才能找到 |
| 项目 | `js/content.js` | 在 `siteContent.projects` 数组里登记 |
| 公开计划 | `data/plans.json` | 所有人可见（只读），站长改文件推送后生效 |
| 本地草稿 | 浏览器 `localStorage` | 仅自己可见，不上传服务器，换设备不自动同步 |

想详细了解怎么加内容 → 看 [CONTENT.md](CONTENT.md) 和 `articles/README.md`。

## 3. 前端（未来的 React/Vite）→ Vercel / Netlify（未来）

如果以后把网站升级成 React/Vite（需要构建），Pages 的默认部署不会帮你构建，
推荐用 **Vercel** 或 **Netlify**（免费、对新手友好）：

- 连接这个 GitHub 仓库
- 构建命令 `npm run build`，输出目录 `dist`
- 它们会自动识别 Vite，几分钟搞定

## 4. 后端（FastAPI）→ Render / Railway / 云服务器（未来）

```bash
# 未来建立 backend/ 时
pip install -r requirements.txt
uvicorn app.main:app --reload   # 接口文档 http://127.0.0.1:8000/docs
```

将来上线可选：

- **Render / Railway**：免费额度够个人项目用，连仓库填启动命令
  `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- **云服务器**：最自由，但要自己管环境、域名、HTTPS

## 5. 数据库 → PostgreSQL（未来）

- 本地学习先用 **SQLite**（零安装）。
- 未来可把后端数据库升级为 PostgreSQL（托管在 Render / Railway）。

## 部署决策速查表

| 要部署什么 | 用什么 | 能上 GitHub Pages 吗 |
| --- | --- | --- |
| 本静态网站 | GitHub Pages | ✅ 已经上线 |
| React/Vite 前端 | Vercel / Netlify | ❌（需构建） |
| FastAPI 后端 | Render / Railway / VPS | ❌（需运行代码） |
| 数据库 | Render / Railway 托管 | ❌（需服务进程） |

## 常见问题

**Q：推送后网站没变化？**
A：GitHub Pages 构建需要 1~3 分钟，稍等并强制刷新（Ctrl+F5）。

**Q：改了内容但线上还是旧的？**
A：确认 `git push` 成功，且 URL 是 `https://chenji0421.github.io`（不是本地路径）。

**Q：文章卡片点了打不开 / 提示文件不存在？**
A：检查 `js/content.js` 里登记的 `file` 路径是否真实存在于 `articles/` 目录，且文件名一致。

**Q：为什么没有登录功能？**
A：本站没有后端、没有数据库、也没有登录系统。原来那个「登录」页已经改为「维护」说明页，向访客说明内容如何维护，不再有任何看起来像登录的功能。

**Q：计划数据换设备后没了？**
A：「本地草稿」存在浏览器 `localStorage` 里，不会自动同步，可以用「导出 JSON / 导入 JSON」手动备份迁移。想让所有人看到的计划，请写进 `data/plans.json` 并推送。
