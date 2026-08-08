/* ============================================================
   chenji0421.github.io · 静态数据文件
   所有页面数据集中在这里，方便新手阅读和修改。
   ============================================================ */

/* ---------- 侧边栏菜单 ---------- */
var NAV_ITEMS = [
  { key: 'home',     label: '首页', icon: '🏠' },
  { key: 'articles', label: '文章', icon: '📝' },
  { key: 'plans',    label: '计划', icon: '🗓️' },
  { key: 'projects', label: '项目', icon: '📦' },
  { key: 'games',    label: '游戏', icon: '🎮' },
  { key: 'about',    label: '关于', icon: '👤' },
  { key: 'login',    label: '登录', icon: '🔐' }
];

/* ---------- 文章数据（9 篇） ---------- */
var POSTS = [
  {
    id: 1,
    title: '我为什么开始搭建个人网站',
    category: '学习笔记',
    date: '2026-08-03',
    month: '2026年8月',
    readTime: '5 分钟',
    views: 128,
    summary: '记录从「想有个自己的地方」到「真的把网站搭起来」的整个心路历程：为什么是 GitHub Pages，为什么想把学习过程留在网上，以及「长期主义」三个字到底意味着什么。',
    tags: ['学习笔记', 'GitHub Pages', '前端']
  },
  {
    id: 2,
    title: 'GitHub Pages 从 0 到上线',
    category: '项目记录',
    date: '2026-07-28',
    month: '2026年7月',
    readTime: '8 分钟',
    views: 96,
    summary: '一步步记录用 GitHub Pages 部署个人网站的完整流程：建仓库、写页面、开启 Pages、配置访问地址。踩过的坑和解决的思路都在这里。',
    tags: ['项目记录', 'GitHub Pages', '工具']
  },
  {
    id: 3,
    title: 'HTML、CSS 和 JavaScript 分别是什么',
    category: '学习笔记',
    date: '2026-07-20',
    month: '2026年7月',
    readTime: '6 分钟',
    views: 152,
    summary: '用盖房子的比喻讲清楚前端三件套的分工：HTML 是骨架、CSS 是装修、JavaScript 是水电和智能家居。写给完全零基础的自己的一篇入门笔记。',
    tags: ['学习笔记', 'HTML', 'CSS', 'JavaScript']
  },
  {
    id: 4,
    title: 'Python 文件整理小工具计划',
    category: '项目记录',
    date: '2026-07-15',
    month: '2026年7月',
    readTime: '4 分钟',
    views: 74,
    summary: '想写一个能按扩展名自动归类整理下载文件夹的 Python 小工具。拆解需求、设计思路，以及第一版伪代码长什么样。',
    tags: ['项目记录', 'Python', '自动化', '工具']
  },
  {
    id: 5,
    title: '数据分析入门路线',
    category: '学习笔记',
    date: '2026-07-08',
    month: '2026年7月',
    readTime: '7 分钟',
    views: 88,
    summary: 'pandas、matplotlib、numpy……数据分析到底该按什么顺序学？数据从哪来？写给自己的入门路线图，也分享给有同样疑问的人。',
    tags: ['学习笔记', '数据分析', 'Python']
  },
  {
    id: 6,
    title: '如何用 GitHub 管理学习项目',
    category: '学习笔记',
    date: '2026-07-02',
    month: '2026年7月',
    readTime: '5 分钟',
    views: 112,
    summary: '把 GitHub 当成学习项目的「时间机器」：commit、branch、push、pull 分别解决什么问题，以及一个新手怎么养成写提交信息的习惯。',
    tags: ['学习笔记', 'GitHub Pages', '工具']
  },
  {
    id: 7,
    title: '非计算机专业学生如何入门编程',
    category: '技术复盘',
    date: '2026-06-26',
    month: '2026年6月',
    readTime: '8 分钟',
    views: 204,
    summary: '作为非科班学生，我踩过的坑和走过的路：从「要不要学」到「怎么坚持」。给同样在犹豫的同学一份诚实的技术复盘。',
    tags: ['技术复盘', '学习笔记', 'Python']
  },
  {
    id: 8,
    title: '我的暑期学习复盘',
    category: '技术复盘',
    date: '2026-06-20',
    month: '2026年6月',
    readTime: '6 分钟',
    views: 167,
    summary: '复盘过去一个月：做了什么、没做什么、哪些学习方法有效、接下来怎么调整。写给自己看的诚实记录。',
    tags: ['技术复盘', '学习笔记', '复盘']
  },
  {
    id: 9,
    title: '给未来自己的技术学习路线',
    category: '学习笔记',
    date: '2026-06-12',
    month: '2026年6月',
    readTime: '5 分钟',
    views: 141,
    summary: '把「想学的东西」整理成一条有顺序的路线：前端基础、Python 进阶、数据分析、后端入门，以及贯穿始终的项目驱动学习法。',
    tags: ['学习笔记', '前端', 'Python', '数据分析']
  }
];

/* ---------- 文章筛选选项 ---------- */
var FILTER_TAGS = ['全部', 'Python', '前端', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', '数据分析', '自动化', '学习笔记', '项目记录', '工具', '复盘'];
var FILTER_CATEGORIES = ['全部分类', '学习笔记', '项目记录', '技术复盘', '生活记录'];
var FILTER_MONTHS = ['全部月份', '2026年8月', '2026年7月', '2026年6月'];

/* ---------- 计划模板（8 个时间段） ---------- */
var PLAN_TEMPLATE = [
  { time: '07:30 - 08:00', task: '起床、洗漱、早餐', note: '规律作息是长期主义的前提', type: '生活' },
  { time: '08:00 - 10:00', task: 'Python 基础练习', note: '语法 + 小练习，记录到日志', type: '学习' },
  { time: '10:15 - 11:30', task: '前端页面练习', note: '照着模板做一个页面，拆解结构', type: '学习' },
  { time: '12:00 - 14:00', task: '午餐 + 午休', note: '别熬夜，午休 20 分钟', type: '生活' },
  { time: '14:00 - 15:30', task: '数据分析入门', note: 'pandas 基础 + 一张可视化图', type: '学习' },
  { time: '15:30 - 16:30', task: '运动 / 快走', note: '每天 5000 步起步', type: '运动' },
  { time: '16:30 - 17:30', task: '弹性时间', note: '处理当天未完成 / 临时事项', type: '调整' },
  { time: '19:30 - 21:30', task: '项目实践 / 复盘', note: '写当天总结，规划明天', type: '项目' }
];

/* 计划卡片 */
var PLAN_CARDS = [
  { icon: '🎯', title: '学习主线', items: ['Python 基础', 'HTML / CSS', 'JavaScript', 'GitHub', '数据分析'] },
  { icon: '💪', title: '运动与身体', items: ['跑步 / 快走', '规律作息', '饮食记录', '体重记录'] },
  { icon: '🎮', title: '娱乐边界', items: ['游戏时间控制', '短视频控制', '阅读与复盘'] }
];

/* ---------- 项目数据（8 个） ---------- */
var PROJECT_GROUPS = [
  {
    title: '已完成',
    badgeClass: 'gb-done',
    projects: [
      {
        name: '个人主页网站',
        status: '已上线',
        statusClass: 'st-online',
        desc: '这个网站本身！从一行占位页一步步变成「个人学习工作台」，见证了从零到一的全过程。',
        tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages']
      }
    ]
  },
  {
    title: '进行中',
    badgeClass: 'gb-doing',
    projects: [
      {
        name: '文章中心',
        status: '进行中',
        statusClass: 'st-doing',
        desc: '支持搜索、标签/分类筛选的文章系统，数据全部本地化，目标是长期积累学习笔记。',
        tags: ['JavaScript', 'localStorage', '搜索筛选']
      },
      {
        name: '学习计划面板',
        status: '进行中',
        statusClass: 'st-doing',
        desc: '可编辑的每日时间段计划表，修改自动保存到浏览器 localStorage，支持导出与恢复模板。',
        tags: ['HTML 表格', 'JavaScript', '本地保存']
      },
      {
        name: 'Card War 在线试玩',
        status: '嵌入中',
        statusClass: 'st-embed',
        desc: '把自制的 HTML 小游戏嵌入到页面里，后续补充游戏介绍、排行榜和分数记录。',
        tags: ['HTML5', 'iframe', 'GitHub Pages']
      }
    ]
  },
  {
    title: '计划中',
    badgeClass: 'gb-plan',
    projects: [
      {
        name: 'Python 文件整理工具',
        status: '计划中',
        statusClass: 'st-plan',
        desc: '按扩展名自动归类整理下载文件夹的小工具，用 os 和 shutil 实现，目标是让桌面不再混乱。',
        tags: ['Python', 'os', 'shutil']
      },
      {
        name: '数据分析练习本',
        status: '计划中',
        statusClass: 'st-plan',
        desc: '用 pandas 和 matplotlib 对真实数据集做清洗与可视化，作为数据分析入门的第一组练习。',
        tags: ['Python', 'pandas', 'matplotlib']
      },
      {
        name: '自动化脚本合集',
        status: '计划中',
        statusClass: 'st-plan',
        desc: '把日常重复性任务（改名、备份、批量操作）做成可复用的命令行脚本，慢慢攒成自己的工具箱。',
        tags: ['Python', '命令行工具']
      },
      {
        name: '全栈博客系统学习版',
        status: '长期计划',
        statusClass: 'st-long',
        desc: '用 FastAPI + SQLite + 前端框架做一个本地可运行的全栈博客，作为理解前后端协作的学习项目。',
        tags: ['FastAPI', 'SQLite', '前端']
      }
    ]
  }
];

/* ---------- 关于页数据 ---------- */
var FOCUS_ITEMS = [
  'Python 自动化',
  'Web 前端',
  '数据分析',
  'GitHub 项目管理',
  '长期主义学习'
];

var SKILLS = [
  { name: 'Python', pct: 40 },
  { name: 'HTML / CSS', pct: 45 },
  { name: 'JavaScript', pct: 30 },
  { name: 'Git / GitHub', pct: 35 },
  { name: '数据分析', pct: 20 }
];

var ABOUT_TIMELINE = [
  { date: '2026-04', title: '创建第一个网页', desc: '照着教程写出了人生第一个 HTML 页面。' },
  { date: '2026-05', title: '部署 GitHub Pages', desc: '把页面真正放到公网上，第一次觉得「我也可以」。' },
  { date: '2026-06', title: '搭建个人主页', desc: '从占位页开始，做成一个像样的个人主页。' },
  { date: '2026-07', title: '扩展为学习工作台', desc: '加入文章、计划、项目、游戏等多页面系统，开始长期维护。' },
  { date: '规划中', title: '未来学习后端', desc: '理解 API 与数据库，把「全栈」这条路走通。' }
];
