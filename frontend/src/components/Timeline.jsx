const STEPS = [
  { stage: '阶段一 · 已完成 ✅', title: '编程入门', desc: 'Python 基础语法、HTML/CSS 基础，做出了第一个网页。' },
  { stage: '阶段二 · 进行中 🔥', title: 'Web 开发与工具链', desc: '深入学习 JavaScript、Git/GitHub，搭建了这个全栈学习项目。' },
  { stage: '阶段三 · 计划中 📌', title: '前后端全栈', desc: '掌握 React 前端与 FastAPI 后端，做一个完整的博客系统。' },
  { stage: '阶段四 · 梦想版 🚀', title: '开源与持续成长', desc: '参与开源、写技术博客，成为一个靠谱的开发者。' },
]

export default function Timeline() {
  return (
    <section className="section" id="roadmap">
      <div className="section-head">
        <span className="section-tag">05 // ROADMAP</span>
        <h2>
          我的<span className="gradient">学习路线</span>
        </h2>
      </div>

      <div className="timeline">
        {STEPS.map((s, i) => (
          <div className="timeline-item" key={s.title}>
            <div className="timeline-dot"><span>{i + 1}</span></div>
            <div className="card timeline-card">
              <span className="timeline-stage">{s.stage}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
