# 小游戏添加说明

这个网站的游戏页目前是「空状态」——它**不会假装有游戏**。

以后如果你做了自己的 HTML 小游戏，想把它嵌入到网站上，按下面的步骤来：

## 如何添加一个小游戏

1. **把你的游戏文件放进来**：在 `games/` 目录下放一个文件夹，
   比如 `games/card-war/`，里面是你的 HTML / CSS / JS 文件
   （注意：纯静态，不能用需要构建工具的框架）。

2. **在游戏页嵌入它**：打开 `index.html`，找到游戏页
   （`id="page-games"`），把占位区域换成 iframe：

   ```html
   <iframe src="games/card-war/index.html" class="game-iframe"
           frameborder="0" allowfullscreen></iframe>
   ```

   `.game-iframe` 的样式已经写好在 `css/style.css` 里，改个宽度高度就能用。

3. **补上介绍**：在游戏占位区下方，把「游戏规则 / 技术实现 / 后续计划」
   的说明卡片改成你游戏的真实信息。

4. **提交推送**：

   ```bash
   git add games/
   git commit -m "feat: 添加小游戏：Card War"
   git push origin main
   ```

## 原则

- 没有真实游戏时，游戏页就保持「暂未添加游戏」的空状态，**不假装有游戏**。
- 嵌入的游戏必须是**静态文件**（HTML/CSS/JS），不能依赖后端或构建工具。
- 排行榜、分数记录这类功能，可以先在浏览器 localStorage 里做，不需要后端。

## 目录结构

```
games/
├── README.md        ← 本文件
└── (以后放你的游戏文件夹)
```
