# 内容自定义指南

所有内容都在 `index.html` 里，按区块（用 `<!-- ===== ... ===== -->` 注释分隔）划分。
改完建议先跑 `python scripts/check.py` 自检，再按 [DEPLOYMENT.md](DEPLOYMENT.md) 推送。

## 1. 名字 / 介绍（Hero 区）

搜索 `chenji0421`，把出现的名字改成你自己的：

```html
<h1 class="hero-name">
  你好，我是
  <span class="gradient-text">chenji0421</span>
</h1>
```

打字机短语在 `js/main.js` 顶部：

```js
var phrases = ['爱折腾的高中生', 'Python 学习者', ...];
```

首屏数据条（`3+ 技能方向` 等）在 Hero 区的 `.hero-stats` 里，改数字即可。

## 2. 关于我

在 `<!-- ===== 关于 ===== -->` 区块里修改：
- `.about-facts` 里的「昵称 / 身份 / 坐标 / 兴趣 / 现状」可以随意增删
- 头像用的是 `assets/avatar.svg`，想换成自己的照片：
  1. 把照片放到 `assets/` 目录（建议正方形、PNG/JPG）
  2. 把 `.about-avatar` 里的 `<img src="assets/avatar.svg">` 改成你的文件路径
- 两段自我介绍直接改文字

## 3. 技能

在 `<!-- ===== 技能 ===== -->` 区块：
- `.skill-bar` 修改技能名和百分比（`data-pct` 和 `data-width` 保持一致）
- `.tag-list` 里的 `.tag` 标签随意增删

## 4. 项目

在 `<!-- ===== 项目 ===== -->` 区块，复制一个 `.project-card` 并修改：

```html
<article class="project-card reveal">
  <div class="project-cover cover-a">      <!-- cover-a / cover-b / cover-c 三种配色 -->
    <div class="term">…</div>              <!-- 终端窗口装饰，可换成你自己的图 -->
  </div>
  <div class="project-body">
    <h3>项目名</h3>
    <p>项目简介……</p>
    <div class="project-tags"><span class="tag">标签</span></div>
    <div class="project-links">
      <a href="https://github.com/你的账号/你的仓库" class="project-link">GitHub</a>
    </div>
  </div>
</article>
```

## 5. 学习路线

在 `<!-- ===== 学习路线 ===== -->` 区块，修改 `.timeline-item` 即可，
阶段状态可以随意改成「已完成 / 进行中 / 计划中」。

## 6. 联系方式

- **邮箱**：把 `index.html` 里所有 `chenji0421@example.com` 换成你的真实邮箱
  （目前是占位地址，记得换！）
- 社交链接：`.social-link` 的 `href` 改成你的主页

## 7. 站点标题 & 图标

- `<title>` 标签：改浏览器标签页文字
- `assets/favicon.svg`：用任意文本编辑器改里面的颜色，或换成你自己的图标
- `assets/avatar.svg`：首页与关于区的头像占位图

## 8. 主题配色

所有颜色都在 `css/style.css` 顶部的 `:root` / `[data-theme="light"]` 里：
- `--accent` / `--accent-2`：主色与辅色（渐变两端）
- `--bg` / `--bg-soft`：页面背景
- 改完这两处，整个站点的主题色就会统一变化
