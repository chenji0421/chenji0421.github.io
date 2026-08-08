// 博客文章模拟数据（静态示例数据）。
// 想改内容直接改这里即可，改完页面自动更新。
// 未来可以改成从后端 GET /api/posts 拉取真实数据。
export const POSTS = [
  {
    slug: 'why-i-built-this-site',
    title: '我为什么开始搭建个人网站',
    date: '2026-08-01',
    excerpt: '记录第一次建站的动机：不想再当一个「只收藏不学习」的旁观者。',
    tags: ['随笔', '建站'],
  },
  {
    slug: 'python-learning-roadmap',
    title: 'Python 学习路线记录',
    date: '2026-08-03',
    excerpt: '从 print("Hello World") 到写小工具，我踩过的坑和接下来的计划。',
    tags: ['Python', '学习路线'],
  },
  {
    slug: 'github-pages-notes',
    title: 'GitHub Pages 建站笔记',
    date: '2026-08-05',
    excerpt: '免费托管、自定义域名、CI/CD——GitHub Pages 入门踩坑记录。',
    tags: ['GitHub', '部署'],
  },
  {
    slug: 'frontend-learning-plan',
    title: '前端基础学习计划',
    date: '2026-08-06',
    excerpt: 'HTML → CSS → JavaScript → React，一步一个脚印的前端路线。',
    tags: ['前端', '学习计划'],
  },
  {
    slug: 'fastapi-starting-plan',
    title: 'FastAPI 入门计划',
    date: '2026-08-07',
    excerpt: '为什么选 FastAPI、项目结构怎么搭、怎么写出第一个 /api/health 接口。',
    tags: ['FastAPI', '后端'],
  },
]
