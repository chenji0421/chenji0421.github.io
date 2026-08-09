/* ============================================================
   Chenji Learning Hub · 静态数据文件
   所有页面数据集中在这里，方便新手阅读和修改。
   结构：导航 / 首页 / 文章 / 筛选 / 计划 / 项目 / 工具箱 / 游戏 / 关于
   ============================================================ */

/* ---------- 侧边栏菜单（8 项） ---------- */
var NAV_ITEMS = [
  { key: 'home',     label: '首页',   icon: '🏠' },
  { key: 'articles', label: '文章',   icon: '📝' },
  { key: 'plans',    label: '计划',   icon: '🗓️' },
  { key: 'projects', label: '项目',   icon: '📦' },
  { key: 'toolbox',  label: '工具箱', icon: '🧰' },
  { key: 'games',    label: '游戏',   icon: '🎮' },
  { key: 'about',    label: '关于',   icon: '👤' },
  { key: 'login',    label: '登录',   icon: '🔐' }
];

/* ---------- 首页数据 ---------- */
var HOME = {
  badge: 'Chenji Learning Hub · 长期维护中',
  title: '你好，我是 <span class="home-gradient">Chenji</span>',
  sub: '一名正在长跑中的 <span class="home-accent">长期主义者</span>',
  desc: '非计算机专业大二学生，正在通过项目驱动的方式学习 Python、前端开发和数据分析。这里记录我的学习路线、项目实践、踩坑笔记和阶段计划。',
  terminal: [
    { cmd: 'boot',   note: 'learning hub online' },
    { cmd: 'stack',  note: 'HTML + CSS + JavaScript + Python' },
    { cmd: 'latest', note: 'Learning Hub v0.4.0 · 文章中心 / 计划面板 / 工具箱上线' },
    { cmd: 'mode',   note: 'learning mode · 正在长跑中' }
  ],
  tags: ['Web 入门', 'Python', '数据分析', '自动化', 'GitHub Pages', 'Claude Code', '长期主义'],
  stats: [
    { num: '12', label: '已发布文章' },
    { num: '10', label: '项目记录' },
    { num: '12', label: '计划时间段' },
    { num: '8',  label: '学习模块' }
  ],
  statusCards: [
    { icon: '📚', title: '当前在读', desc: 'Python 基础 + JavaScript 入门，每天至少一道小练习' },
    { icon: '🔧', title: '正在做',  desc: '把个人网站迭代成「学习工作台」，边学边改、长期维护' },
    { icon: '🎯', title: '下一步',  desc: '数据分析入门练习 → 接触 FastAPI 与数据库' }
  ],
  quickLinks: [
    { href: '#articles', icon: '📝', label: '看文章',  desc: '12 篇学习笔记' },
    { href: '#plans',    icon: '🗓️', label: '学习计划', desc: '阶段冲刺计划' },
    { href: '#projects', icon: '📦', label: '项目实验室', desc: '10 个项目记录' },
    { href: '#toolbox',  icon: '🧰', label: '工具箱', desc: '效率工具收藏' }
  ]
};

/* ---------- 文章数据（12 篇） ----------
   字段说明：
   - id       文章唯一编号
   - title    标题
   - summary  摘要（搜索会匹配它）
   - category 分类（学习笔记 / 项目记录 / 技术复盘 / 生活记录）
   - tags     标签数组（搜索会匹配）
   - date     发布日期（YYYY-MM-DD）
   - month    所属月份（与筛选选项对应）
   - readTime 阅读时长
   - views    阅读量（决定「热门文章」）
   - pinned   是否置顶
*/
var POSTS = [
  {
    id: 1,
    title: '我为什么开始搭建个人网站',
    summary: '记录从「想有个自己的地方」到「真的把网站搭起来」的整个心路历程：为什么是 GitHub Pages，为什么想把学习过程留在网上，以及「长期主义」三个字到底意味着什么。',
    category: '学习笔记',
    tags: ['学习笔记', 'GitHub Pages', '前端'],
    date: '2026-08-03',
    month: '2026年8月',
    readTime: '5 分钟',
    views: 128,
    pinned: true
  },
  {
    id: 2,
    title: 'GitHub Pages 从 0 到上线',
    summary: '一步步记录用 GitHub Pages 部署个人网站的完整流程：建仓库、写页面、开启 Pages、配置访问地址。踩过的坑和解决的思路都在这里。',
    category: '项目记录',
    tags: ['项目记录', 'GitHub Pages', '工具'],
    date: '2026-07-28',
    month: '2026年7月',
    readTime: '8 分钟',
    views: 96,
    pinned: false
  },
  {
    id: 3,
    title: 'HTML、CSS 和 JavaScript 分别是什么',
    summary: '用盖房子的比喻讲清楚前端三件套的分工：HTML 是骨架、CSS 是装修、JavaScript 是水电和智能家居。写给完全零基础的自己的一篇入门笔记。',
    category: '学习笔记',
    tags: ['学习笔记', 'HTML', 'CSS', 'JavaScript'],
    date: '2026-07-20',
    month: '2026年7月',
    readTime: '6 分钟',
    views: 214,
    pinned: true
  },
  {
    id: 4,
    title: 'Python 文件整理小工具计划',
    summary: '想写一个能按扩展名自动归类整理下载文件夹的 Python 小工具。拆解需求、设计思路，以及第一版伪代码长什么样。',
    category: '项目记录',
    tags: ['项目记录', 'Python', '自动化', '工具'],
    date: '2026-07-15',
    month: '2026年7月',
    readTime: '4 分钟',
    views: 74,
    pinned: false
  },
  {
    id: 5,
    title: '数据分析入门路线',
    summary: 'pandas、matplotlib、numpy……数据分析到底该按什么顺序学？数据从哪来？写给自己的入门路线图，也分享给有同样疑问的人。',
    category: '学习笔记',
    tags: ['学习笔记', '数据分析', 'Python'],
    date: '2026-07-08',
    month: '2026年7月',
    readTime: '7 分钟',
    views: 158,
    pinned: false
  },
  {
    id: 6,
    title: '非计算机专业学生如何入门编程',
    summary: '作为非科班学生，我踩过的坑和走过的路：从「要不要学」到「怎么坚持」。给同样在犹豫的同学一份诚实的技术复盘。',
    category: '技术复盘',
    tags: ['技术复盘', '学习笔记', 'Python'],
    date: '2026-07-02',
    month: '2026年7月',
    readTime: '9 分钟',
    views: 204,
    pinned: true
  },
  {
    id: 7,
    title: '如何用 GitHub 管理学习项目',
    summary: '把 GitHub 当成学习项目的「时间机器」：commit、branch、push、pull 分别解决什么问题，以及一个新手怎么养成写提交信息的习惯。',
    category: '学习笔记',
    tags: ['学习笔记', 'GitHub Pages', '工具'],
    date: '2026-06-28',
    month: '2026年6月',
    readTime: '5 分钟',
    views: 112,
    pinned: false
  },
  {
    id: 8,
    title: '我的暑期学习复盘',
    summary: '复盘过去两个月：做了什么、没做什么、哪些学习方法有效、接下来怎么调整。写给自己看的诚实记录。',
    category: '技术复盘',
    tags: ['技术复盘', '学习笔记', '复盘'],
    date: '2026-06-22',
    month: '2026年6月',
    readTime: '6 分钟',
    views: 167,
    pinned: false
  },
  {
    id: 9,
    title: '给未来自己的技术学习路线',
    summary: '把「想学的东西」整理成一条有顺序的路线：前端基础、Python 进阶、数据分析、后端入门，以及贯穿始终的项目驱动学习法。',
    category: '学习笔记',
    tags: ['学习笔记', '前端', 'Python', '数据分析'],
    date: '2026-06-15',
    month: '2026年6月',
    readTime: '5 分钟',
    views: 141,
    pinned: false
  },
  {
    id: 10,
    title: 'Claude Code 辅助建站记录',
    summary: '用 AI 编程助手一起搭网站是什么体验？记录一次「人机协作」的完整过程：提需求、看代码、问为什么，以及学到的东西。',
    category: '项目记录',
    tags: ['项目记录', 'Claude Code', '工具'],
    date: '2026-08-06',
    month: '2026年8月',
    readTime: '7 分钟',
    views: 89,
    pinned: false
  },
  {
    id: 11,
    title: '个人网站 UI 重构踩坑',
    summary: '把网站从「默认样式的裸页面」升级成学习工作台的过程中踩过的坑：CSS 没加载、导航横向堆叠、内容贴边……一个都不能放过。',
    category: '技术复盘',
    tags: ['技术复盘', '前端', 'CSS'],
    date: '2026-08-01',
    month: '2026年8月',
    readTime: '6 分钟',
    views: 76,
    pinned: false
  },
  {
    id: 12,
    title: '下一步学习 FastAPI 的计划',
    summary: '前端静态站已经能跑，下一步想理解「后端」到底是什么：FastAPI 能做什么、接口文档长什么样、数据库怎么存数据，先立个学习计划。',
    category: '生活记录',
    tags: ['生活记录', 'FastAPI', '学习笔记'],
    date: '2026-07-30',
    month: '2026年7月',
    readTime: '4 分钟',
    views: 58,
    pinned: false
  }
];

/* ---------- 文章筛选选项 ---------- */
var FILTER_TAGS = ['全部', 'Python', '前端', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', '数据分析', '自动化', 'Claude Code', 'FastAPI', '工具', '复盘'];
var FILTER_CATEGORIES = ['全部分类', '学习笔记', '项目记录', '技术复盘', '生活记录'];
var FILTER_MONTHS = ['全部月份', '2026年8月', '2026年7月', '2026年6月'];

/* ---------- 计划模板（12 个时间段） ---------- */
var PLAN_TEMPLATE = [
  { time: '07:00 - 07:30', task: '起床、洗漱、早餐',   note: '不赖床，吃好早餐',            type: '生活' },
  { time: '07:30 - 08:00', task: '晨间回顾',           note: '昨日复盘 + 今日计划',          type: '学习' },
  { time: '08:00 - 10:00', task: 'Python 基础练习',    note: '语法 + 每天一道小练习',        type: '学习' },
  { time: '10:15 - 11:30', task: '前端页面练习',        note: '复刻一个组件 / 小页面',        type: '学习' },
  { time: '11:30 - 12:00', task: '阅读技术文章',        note: '收藏笔记，写 100 字感想',      type: '学习' },
  { time: '12:00 - 14:00', task: '午餐 + 午休',         note: '清淡饮食，午休 30 分钟',       type: '生活' },
  { time: '14:00 - 15:30', task: '数据分析入门',        note: 'pandas / 数据可视化',         type: '学习' },
  { time: '15:30 - 16:30', task: '运动 / 快走',         note: '拉伸 + 快走 40 分钟',         type: '运动' },
  { time: '16:30 - 17:30', task: '弹性时间',            note: '处理临时事项 / 休息',          type: '调整' },
  { time: '19:30 - 21:00', task: '项目实践 / 写博客',   note: '推进一个项目，写一篇笔记',     type: '项目' },
  { time: '21:00 - 21:30', task: '今日复盘',            note: '做了什么 + 明日改进',          type: '学习' },
  { time: '22:30 - 23:30', task: '自由时间 / 洗漱睡觉', note: '23:30 前睡，别熬夜',           type: '生活' }
];

/* 计划三栏卡片 */
var PLAN_CARDS = [
  { icon: '🎯', title: '学习主线', items: ['Python 基础与每日练习', 'HTML / CSS 布局', 'JavaScript 入门', 'GitHub 版本管理', '数据分析基础'] },
  { icon: '💪', title: '运动与作息', items: ['每周跑步 3 次', '23:30 前入睡', '均衡饮食，少点外卖', '记录体重变化'] },
  { icon: '🎮', title: '娱乐边界', items: ['每天游戏 ≤ 1 小时', '短视频 ≤ 30 分钟', '每周读 1 篇长文', '每晚 10 分钟复盘'] }
];

/* ---------- 项目数据（10 个，按状态分组） ---------- */
var PROJECT_GROUPS = [
  {
    title: '✅ 已上线',
    badgeClass: 'gb-done',
    projects: [
      { name: '个人主页网站', status: '已上线', statusClass: 's-done', desc: '这个网站的起点！从一行「你好，我是 Chenji」开始，一路迭代成个人学习工作台。', tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'] },
      { name: 'Chenji Learning Hub', status: '已上线', statusClass: 's-done', desc: '本网站当前版本：8 个模块的个人学习工作台，文章中心、计划面板、项目实验室、工具箱一应俱全。', tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'] },
      { name: '文章中心', status: '已上线', statusClass: 's-done', desc: '站内文章模块：12 篇学习笔记与项目记录，支持搜索 + 标签 / 分类 / 月份三重筛选，含置顶与热门榜。', tags: ['JavaScript', '静态数据', '搜索筛选'] }
    ]
  },
  {
    title: '🔨 进行中',
    badgeClass: 'gb-doing',
    projects: [
      { name: '学习计划面板', status: '进行中', statusClass: 's-doing', desc: '可编辑的每日时间段计划表：12 行时间安排，支持新增 / 删除 / 恢复模板，改动自动保存到 localStorage。', tags: ['HTML 表格', 'JavaScript', '本地保存'] },
      { name: 'GitHub Pages 建站记录', status: '进行中', statusClass: 's-doing', desc: '把每次建站、改版、踩坑都写成文章，长期积累成一份「新手建站手册」。', tags: ['GitHub Pages', '写作', '复盘'] }
    ]
  },
  {
    title: '📝 计划中',
    badgeClass: 'gb-plan',
    projects: [
      { name: 'Python 文件整理工具', status: '计划中', statusClass: 's-plan', desc: '按扩展名自动归类整理下载文件夹的小工具，用 os 和 shutil 实现，目标是让桌面不再混乱。', tags: ['Python', 'os', 'shutil'] },
      { name: '数据分析练习本', status: '计划中', statusClass: 's-plan', desc: '用 pandas 和 matplotlib 对真实数据集做清洗与可视化，作为数据分析入门的第一组练习。', tags: ['Python', 'pandas', 'matplotlib'] },
      { name: '自动化脚本合集', status: '计划中', statusClass: 's-plan', desc: '把日常重复性任务（改名、备份、批量操作）做成可复用的命令行脚本，慢慢攒成自己的工具箱。', tags: ['Python', '命令行工具'] },
      { name: 'Card War 小游戏入口', status: '计划中', statusClass: 's-plan', desc: '把自制的 HTML 卡牌小游戏通过 iframe 嵌入本站，后续补充排行榜与本地分数记录。', tags: ['HTML5', 'iframe', 'JavaScript'] }
    ]
  },
  {
    title: '🌱 长期计划',
    badgeClass: 'gb-long',
    projects: [
      { name: 'FastAPI 博客系统学习版', status: '长期计划', statusClass: 's-long', desc: '用 FastAPI + SQLite 写后端、原生前端写界面，做一个本地可运行的全栈博客，理解前后端协作。', tags: ['FastAPI', 'SQLite', '学习项目'] }
    ]
  }
];

/* ---------- 工具箱数据（6 个工具卡） ---------- */
var TOOLS = [
  {
    icon: '🐍',
    title: 'Python 学习工具',
    desc: '我目前的学习环境与常用工具清单：解释器、编辑器、依赖管理，新手照着配就能跑起来。',
    points: ['VS Code + Python 扩展', 'pip / venv 环境管理', '命令行练手：python -i'],
    tag: 'Python'
  },
  {
    icon: '📁',
    title: '文件整理工具设想',
    desc: '一个「按扩展名自动归类」的小工具设计稿，先用伪代码把需求拆清楚，再慢慢写成真工具。',
    points: ['按扩展名分组移动', '可自定义规则映射', '先 dry-run 再真执行'],
    tag: 'Python'
  },
  {
    icon: '📝',
    title: 'Markdown 笔记模板',
    desc: '写博客 / 笔记用的统一模板：标题、日期、标签、摘要、正文、复盘，保持格式一致。',
    points: ['文章头信息固定', '标签与分类统一', '每篇结尾带复盘'],
    tag: '写作'
  },
  {
    icon: '🔧',
    title: 'Git 常用命令卡片',
    desc: '把最常用的 Git 命令抄在卡片上，记不住就翻：提交、推送、回退、分支、查看状态。',
    points: ['git status / log', 'git add / commit', 'git push / pull', 'git branch / checkout'],
    tag: 'Git'
  },
  {
    icon: '🩺',
    title: '网站检查脚本说明',
    desc: '仓库里的 scripts/check.py 会在 CI 自动运行，检查关键文件是否齐全、HTML 结构是否完整。',
    points: ['检查关键文件存在', '校验 HTML 标签配对', 'GitHub Actions 自动跑'],
    tag: '工具'
  },
  {
    icon: '🤖',
    title: 'AI 辅助学习工作流',
    desc: '用 AI 助手学习的小技巧：让它解释代码、陪我 debug、帮我复盘，但答案一定要自己理解一遍。',
    points: ['让 AI 讲思路，别只抄答案', '看不懂的地方拆开问', '最后用自己的话写笔记'],
    tag: '工作流'
  }
];

/* ---------- 游戏页数据 ---------- */
var GAME = {
  title: 'Card War 在线试玩',
  status: '已嵌入 / 计划中',
  desc: '当前通过 iframe 或占位区域嵌入小游戏，后续可以补充游戏介绍、排行榜和分数记录。',
  placeholderIcon: '🃏',
  placeholderTitle: '游戏区域预留中',
  placeholderDesc: '未来可以把自己的 HTML 小游戏嵌入到这里',
  cards: [
    { icon: '📜', title: '游戏规则', desc: 'Card War（纸牌大战）是一款回合制卡牌对战小游戏。玩家与电脑轮流出牌，比拼点数大小，策略与运气并存。' },
    { icon: '⚙️', title: '技术实现', desc: '使用原生 HTML5 + CSS + JavaScript 实现，计划通过 iframe 嵌入本站。暂无后端，分数记录后续考虑用 localStorage。' },
    { icon: '🗺️', title: '后续计划', desc: '补充完整可玩版本、游戏介绍页、排行榜与本地分数记录，让这里成为真正能玩的「游戏工作台」。' }
  ]
};

/* ---------- 关于页数据 ---------- */
var ABOUT_INTRO = '我是 Chenji（陈际），一名非计算机专业的大二学生。正在通过项目驱动的方式学习 Python、前端开发和数据分析。相信长期主义——每天进步一点点，比什么都重要。这里是我把学到的、想到的、做过的都留下的地方。';

var FOCUS_ITEMS = [
  'Python 自动化',
  'Web 前端',
  '数据分析',
  'GitHub 项目管理',
  '长期主义学习'
];

var SKILLS = [
  { name: 'Python',     pct: 40, cls: '' },
  { name: 'HTML / CSS', pct: 45, cls: 'blue' },
  { name: 'JavaScript', pct: 30, cls: 'indigo' },
  { name: 'Git / GitHub', pct: 35, cls: 'green' },
  { name: '数据分析',   pct: 20, cls: 'purple' }
];

var ABOUT_TIMELINE = [
  { date: '2026-04', title: '创建第一个网页', desc: '照着教程写出了人生第一个 HTML 页面，对前端产生了兴趣。' },
  { date: '2026-05', title: '部署 GitHub Pages', desc: '把页面真正放到公网上，第一次觉得「我也可以」。' },
  { date: '2026-06', title: '搭建个人主页', desc: '从占位页开始，做成一个像样的个人主页。' },
  { date: '2026-07', title: '扩展为学习工作台', desc: '加入文章、计划、项目、游戏等多页面系统，开始长期维护。' },
  { date: '2026-08', title: '升级为 Learning Hub', desc: '重构为「Chenji Learning Hub」：文章中心、计划面板、项目实验室、工具箱。' },
  { date: '规划中', title: '走向全栈', desc: '接触 FastAPI 与数据库，理解接口与前后端协作。' }
];

var LEARNING_PRINCIPLES = [
  { icon: '🐢', title: '慢慢来，比较快', desc: '不追求一晚上学会，追求每天进步一点点。' },
  { icon: '🛠️', title: '项目驱动', desc: '想学什么，就做一个用到它的东西。' },
  { icon: '📝', title: '输出倒逼输入', desc: '学完写下来、讲出来，才算是真的会了。' },
  { icon: '🔁', title: '定期复盘', desc: '每周回头看，调整方向，避免低效努力。' }
];

var CONTACT = [
  { icon: '🐙', label: 'GitHub：github.com/chenji0421', href: 'https://github.com/chenji0421' },
  { icon: '✉️', label: '邮箱：chenji0421@example.com（占位）', href: 'mailto:chenji0421@example.com' },
  { icon: '🔒', label: '更多联系方式建设中', href: null, muted: true }
];
