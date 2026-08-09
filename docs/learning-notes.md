# 学习笔记（新手向）

> 这些是作者（非科班、正在自学）的笔记。不一定是最优解，但保证是「踩过坑、能跑通」的记录。
> 建议配合代码一起看：改一行 → 刷新 → 看效果。

## 1. 纯静态网站是怎么上线的？

- 你写了一个 `index.html`，里面有 `<div>你好</div>`。
- 浏览器访问时，服务器（这里就是 GitHub Pages）**原封不动**把文件发给你。
- 所以：静态页 = 「服务器只是快递员，不拆包裹、不算数学」。
- 这就是为什么本站可以**零依赖、零构建、零后端**：没有服务器逻辑需要执行。

## 2. 为什么本项目不用 React / Vite / npm？

- React 的代码是 `.jsx`，浏览器**不认**，必须先「构建」成普通 `.js`。
- 构建就需要 npm、打包工具，而 GitHub Pages 的默认部署**不会帮你构建**。
- 所以本站选择原生 HTML / CSS / JavaScript —— 打开即用，推送即上线。
- 等以后想用 React，就得部署到 Vercel / Netlify 这类会自动构建的平台。

## 3. 数据存在哪里？

- 本站没有数据库，所有内容（文章 / 项目 / 计划 / 技能…）都写在 `js/data.js` 里。
- 浏览器加载页面时，`js/main.js` 读取这些数据，渲染成页面上的卡片。
- 想加一篇文章？在 `POSTS` 数组里照葫芦画瓢加一个对象就行。
- 想记录用户的编辑？用浏览器自带的 `localStorage`（本地存储）：
  ```js
  localStorage.setItem('hub_theme', 'dark');   // 存
  localStorage.getItem('hub_theme');            // 读
  ```
- `localStorage` 存在**你自己的浏览器**里，换台电脑就没了，也不会传给服务器。

## 4. hash 路由是什么？

- 网址里的 `#xxx` 叫 hash。`https://chenji0421.github.io/#articles` 里的 `#articles`。
- 浏览器监听 `hashchange` 事件，页面根据 hash 切换显示哪个 `<section>`。
- 好处：不需要服务器配合（不需要 nginx 配置 / history API），刷新后还在原页面。

## 5. 怎么看懂报错

- **前端报错**：打开浏览器 F12 → Console，红色的就是错误，点开看第几行。
- **网站白屏 / 像没加载 CSS**：先看 Console 有没有 JS 报错，再看 Network 里 `css/style.css` 是不是 404。
- **GitHub 报错**：仓库 Actions 页面点进失败的 job，红色的 step 就是出事的地方。

## 6. 关于密码 / Token 的安全习惯

- 代码里不能写密码、Token —— 一旦推到 GitHub 就全世界都能看到。
- 本站没有后端，所以根本没有密钥。将来写 Python 后端时：
  - 敏感值写进 `.env`（已被 `.gitignore` 忽略）
  - 代码里用 `os.getenv(...)` 读取
  - `.env.example` 只写变量名不写真值，可以放心提交
- 登录页是**纯演示**，不会上传任何账号密码。

## 7. 一个「今天就能试」的小实验

```bash
# 1. 本地起一个静态服务器
python -m http.server 8000
# 2. 浏览器打开 http://localhost:8000
# 3. 打开 js/data.js，给 POSTS 数组加一篇文章，刷新页面
```

看到新文章出现在文章中心，你就理解了「数据驱动页面」—— 改数据，页面自动变。

## 8. 之前全栈阶段留下什么可以继续学？

- 仓库的 git 历史里曾有过 `backend/`（FastAPI）和 `frontend/`（React + Vite）示例，
  现在已移出主结构，但相关概念仍在学习路线上（见 `docs/roadmap.md`）。
- 想复习 FastAPI：搜 git 历史 `git log --all -- backend`，或直接看学习路线第 3 步。
