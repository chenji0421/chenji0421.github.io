# 内容自定义指南

本站所有内容都是「静态数据」—— 改文件即改内容，刷新即见效果。
改完建议先跑 `python scripts/check.py` 自检，再按 [deployment.md](deployment.md) 推送。

## 1. 数据在哪改？→ `js/data.js`

所有页面内容几乎都集中在 `js/data.js` 里。结构：

| 变量 | 控制什么 | 怎么改 |
| --- | --- | --- |
| `NAV_ITEMS` | 左侧导航 8 项 | 增删一个对象 |
| `HOME` | 首页 Hero / 状态 / 统计 / 快捷入口 | 直接改文字 |
| `POSTS` | 文章中心（12 篇） | 照葫芦画瓢加对象 |
| `FILTER_*` | 文章筛选的标签 / 分类 / 月份 | 增删数组元素 |
| `PLAN_TEMPLATE` | 计划表默认 12 行 | 加一行 / 改内容 |
| `PLAN_CARDS` | 计划页三栏目标 | 改 `items` 数组 |
| `PROJECT_GROUPS` | 项目实验室（10 个） | 按状态分组加项目 |
| `TOOLS` | 工具箱（6 张卡） | 加一个工具对象 |
| `GAME` | 游戏页说明卡 | 改 `cards` |
| `ABOUT_INTRO` / `FOCUS_ITEMS` / `SKILLS` / `ABOUT_TIMELINE` / `LEARNING_PRINCIPLES` / `CONTACT` | 关于页全部内容 | 直接改 |

### 加一篇文章的例子

在 `POSTS` 数组末尾加：

```js
{
  id: 13,
  title: '我的第一篇真实笔记',
  summary: '这里是摘要，搜索会匹配它。',
  category: '学习笔记',            // 学习笔记 / 项目记录 / 技术复盘 / 生活记录
  tags: ['学习笔记', 'Python'],
  date: '2026-08-10',
  month: '2026年8月',              // 要和 FILTER_MONTHS 里的对得上
  readTime: '5 分钟',
  views: 0,
  pinned: false                    // true 会显示在「置顶文章」
}
```

## 2. 网站名称 / 头像 / 图标

- `<title>` 标签：改浏览器标签页文字（`index.html` 的 `<head>` 里）
- `assets/favicon.svg`：站点图标
- `assets/avatar.svg`：侧边栏头像
- 侧边栏的「Chenji / chenji0421」：在 `index.html` 的 `.sidebar-user` 里

## 3. 页面布局（加新页面 / 改导航）

1. 在 `index.html` 的 `.pages` 里加一个 `<section class="page" id="page-xxx">`（首页保持 `active`）
2. 在 `js/data.js` 的 `NAV_ITEMS` 里加对应导航项
3. 在 `js/main.js` 的 `PAGE_TITLES`（由 `NAV_ITEMS` 自动生成）就会自动支持
4. 在 `css/style.css` 给新区块补样式

## 4. 主题配色

所有颜色都在 `css/style.css` 顶部的 `:root` / `[data-theme="dark"]` 变量里：

- `--accent`（青绿 `#2f7d6d`）/ `--accent-2`（蓝 `#1a73e8`）：主色
- `--main-bg` / `--card-bg` / `--card-border`：浅色与深色主题的背景与边框
- 改完这几处，全站颜色统一变化

## 5. 首页 Hero（深色科技感卡片）

在 `index.html` 的 `#page-home` 里，内容是直接写死的（不依赖 JS 渲染），
改标题、副标题、终端框、统计数字都直接改 HTML 即可。
「最近更新」列表由 `js/main.js` 自动从 `POSTS` 取最新 4 篇。

## 6. 联系方式（占位，记得换！）

- `js/data.js` 的 `CONTACT` 里，邮箱目前是 `chenji0421@example.com`（占位）
- 想换真实邮箱：把 `CONTACT` 里的 href 和 label 改成你的
- GitHub 链接 `https://github.com/chenji0421` 可换成你的主页

> 提示：不要在仓库里写真实手机号、密码、Token —— 一旦推送就全世界可见。
