/* ============================================================
   Chenji Learning Hub · 内容数据文件
   ------------------------------------------------------------
   这是一个「真实可维护」的框架，不是自动生成假内容的玩具。

   ✅ 你要做的只有两件事：
     1. 写文章 → 把 Markdown 文件放进 articles/ 目录
     2. 登记内容 → 在下方 siteContent.articles / projects 数组里加对象

   ❌ 这里不会自动生成假文章、假项目、假阅读量、假浏览量。
     文章数组默认为空；projects 数组只登记作者真实做过的项目。
     当前已登记的唯一真实项目：Chenji Learning Hub（本站本体）。
   ============================================================ */

var siteContent = {
  articles: [],
  projects: [
    {
      name: "Chenji Learning Hub",
      status: "已上线",
      description: "一个部署在 GitHub Pages 上的个人学习工作台，用于记录文章、项目和计划。",
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      repo: "https://github.com/chenji0421/chenji0421.github.io",
      link: "https://chenji0421.github.io"
    }
  ]
};

/* ============================================================
   文章登记示例
   ------------------------------------------------------------
   照这个格式往 siteContent.articles 数组里加对象即可：

   {
     title: "我的第一篇文章",
     date: "2026-08-09",
     category: "学习笔记",          // 学习笔记 / 项目记录 / 技术复盘 / 生活记录
     tags: ["GitHub Pages", "建站"],
     summary: "这里是摘要，会显示在文章卡片上",
     file: "articles/my-first-post.md"
   }

   注意：
   - file 指向的文章 Markdown 文件必须真实存在于 articles/ 目录，
     否则点击文章会提示「文章文件不存在」。
   - 不要写 views / readTime / pinned 这些假数据——
     阅读量、浏览量只能等你真正部署后才有意义。
   ============================================================ */

/* ============================================================
   项目登记示例
   ------------------------------------------------------------
   照这个格式往 siteContent.projects 数组里加对象即可：

   {
     name: "个人主页网站",
     status: "已上线",              // 已上线 / 进行中 / 计划中 / 长期计划
     description: "这是我自己搭建并部署的个人主页。",
     tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
     repo: "https://github.com/chenji0421/chenji0421.github.io",
     link: "https://chenji0421.github.io"
   }

   注意：
   - repo 和 link 是可选字段，没有就留空字符串。
   - status 只显示你真实的状态，不要写假状态。
   ============================================================ */
