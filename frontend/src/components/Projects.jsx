import { PROJECTS } from '../data/projects.js'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-head">
        <span className="section-tag">03 // PROJECTS</span>
        <h2>
          做过的<span className="gradient">项目</span>
        </h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <article className="card project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tag-list">
              {p.tags.map((t) => (
                <span className={`tag ${p.status === '计划中' || p.status === '学习中' ? 'tag-soon' : ''}`} key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="project-meta">
              <span className="status">{p.status}</span>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer">查看 →</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
