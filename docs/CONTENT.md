# 内容自定义指南

所有内容都在 `index.html` 里，按区块（用 `<!-- ===== ... ===== -->` 注释分隔）划分。
改动后按 [DEPLOYMENT.md](DEPLOYMENT.md) 推送即可。

## 1. 名字 / 介绍（Hero 区）

搜索 `chenji0421`，把出现的名字改成你自己的：

```html
<h1 class="hero-name"><span class="gradient-text">chenji0421</span></h1>
```

打字机短语在 `js/main.js` 顶部：

```js
const phrases = ['爱折腾的高中生', 'Python 学习者', 'Web 新手开发者', ...];
```

## 2. 关于我

在 `<!-- ===== 关于 ===== -->` 区块里修改：
- `.about-facts` 里的「昵称 / 身份 / 坐标 / 兴趣 / 现状」可以随意增删
- `.about-avatar` 的 `C` 改成你的名字首字母
- 两段自我介绍直接改文字

## 3. 技能

在 `<!-- ===== 技能 ===== -->` 区块：
- `.skill-bar` 修改技能名和百分比（`data-pct` 和 `data-width` 保持一致）
- `.tag-list` 里的 `.tag` 标签随意增删

## 4. 项目

在 `<!-- ===== 项目 ===== -->` 区块，复制一个 `.project-card` 并修改：

```html
<article class="project-card reveal">
  <div class="project-cover"><div class="project-emoji">📱</div></div>
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

- 邮件地址：把 `index.html` 里所有 `chenji0421@example.com` 换成你的真实邮箱
- 社交链接：`.social-link` 的 `href` 改成你的主页

## 7. 站点标题 & 图标

- `<title>` 标签：改浏览器标签页文字
- `assets/favicon.svg`：用任意文本编辑器改里面 `fill` 的颜色，或换你自己的图标文件
