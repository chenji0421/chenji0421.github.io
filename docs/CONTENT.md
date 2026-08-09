# 内容维护指南（写文章 / 加项目 / 用计划）

本站是「真实可维护的空框架」——**没有假内容**。所有内容都由你自己写、自己登记。
改完建议先跑 `python scripts/check.py` 自检，再按 [deployment.md](deployment.md) 推送。

## 1. 如何写一篇文章

完整说明见 [`articles/README.md`](../articles/README.md)。速览：

1. **写 Markdown 正文**：复制 [`articles/template.md`](../articles/template.md)，
   存成 `articles/我的文章.md`，填好头部信息（title / date / category / tags / summary）和正文。
2. **登记到网站**：打开 `js/content.js`，在 `siteContent.articles` 数组里加：

   ```js
   {
     title: "我的第一篇文章",
     date: "2026-08-09",
     category: "学习笔记",          // 学习笔记 / 项目记录 / 技术复盘 / 生活记录
     tags: ["GitHub Pages", "建站"],
     summary: "这里是摘要，会显示在卡片上",
     file: "articles/my-first-post.md"
   }
   ```

   `file` 必须指向真实存在的 Markdown 文件。
3. **推送上线**：`git add . && git commit -m "feat: 添加文章" && git push origin main`

**注意**：不要写 `views` / `readTime` / `pinned` 这些假字段 —— 没有假阅读量、假浏览量。

## 2. 如何添加一个项目

打开 `js/content.js`，在 `siteContent.projects` 数组里加：

```js
{
  name: "个人主页网站",
  status: "已上线",              // 已上线 / 进行中 / 计划中 / 长期计划
  description: "这是我自己搭建并部署的个人主页。",
  tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
  repo: "https://github.com/chenji0421/chenji0421.github.io",
  link: "https://chenji0421.github.io"
}
```

`repo` 和 `link` 是可选字段，没有就留空。状态只写你真实的状态。

## 3. 如何使用计划系统

计划页是「年 / 月 / 日」三视图，数据存在**你自己的浏览器**（localStorage，键名
`chenji_planner_data`），**不会上传服务器**，换设备不自动同步。

- **年表**：看全年 12 个月的目标 / 完成情况，点月份进入月表
- **月表**：真实日历，有计划的日期会有标记，点某一天进入日计划
- **日计划**：填写「今日目标 / 上午 / 下午 / 晚上 / 今日复盘 / 完成状态」，点「保存」
- 支持 **导出 JSON**（下载到本地备份）和 **导入 JSON**（恢复），以及「清空本地计划」

## 4. 网站名称 / 头像 / 图标

- `<title>` 标签：改浏览器标签页文字（`index.html` 的 `<head>` 里）
- `assets/favicon.svg`：站点图标
- `assets/avatar.svg`：侧边栏头像
- 侧边栏的「Chenji / chenji0421」：在 `index.html` 的 `.sidebar-user` 里

## 5. 关于页内容

关于页内容在 `js/main.js` 顶部的 `ABOUT` 对象里（简介 / 关注方向 / 技能进度 / 时间线 /
学习原则 / 联系方式）。技能进度是**自我评估**，水平还在入门阶段就如实填写。

## 6. 游戏页

游戏页当前是「暂未添加游戏」空状态。以后做出纯静态小游戏后，按
[`games/README.md`](../games/README.md) 的说明放进 `games/` 目录并用 iframe 嵌入。

## 7. 页面布局（加新页面 / 改导航）

1. 在 `index.html` 的 `.pages` 里加一个 `<section class="page" id="page-xxx">`
2. 在 `js/main.js` 的 `NAV_ITEMS` 里加对应导航项
3. 在 `css/style.css` 给新区块补样式

> 提示：不要在仓库里写真实手机号、密码、Token —— 一旦推送就全世界可见。
