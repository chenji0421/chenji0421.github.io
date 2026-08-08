import { POSTS } from '../data/posts.js'

export default function BlogList() {
  return (
    <section className="section section-alt" id="blog">
      <div className="section-head">
        <span className="section-tag">04 // BLOG</span>
        <h2>
          博客<span className="gradient">文章</span>
        </h2>
      </div>

      <div className="blog-list">
        {POSTS.map((post) => (
          <article className="card blog-card" key={post.slug}>
            <span className="blog-date">{post.date}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="tag-list">
              {post.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="note">以上为模拟数据（frontend/src/data/posts.js），未来可改成从后端 API 拉取真实文章。</p>
    </section>
  )
}
