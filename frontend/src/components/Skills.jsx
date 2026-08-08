// 技能数据直接写在组件里，方便新人一眼看懂改哪里
const GROUPS = [
  {
    title: '编程语言',
    icon: '🐍',
    skills: [
      { name: 'Python', level: 70 },
      { name: 'HTML / CSS', level: 65 },
      { name: 'JavaScript', level: 45 },
    ],
  },
  {
    title: '工具与工作流',
    icon: '🛠️',
    tags: ['Git', 'GitHub', 'VS Code', '终端 / Shell', 'Markdown', 'Vite'],
  },
  {
    title: '正在点亮',
    icon: '🌱',
    tags: ['React', 'FastAPI', '数据分析', '数据可视化', 'Docker', 'Node.js'],
  },
]

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="section-head">
        <span className="section-tag">02 // SKILLS</span>
        <h2>
          我的<span className="gradient">技能树</span>
        </h2>
      </div>

      <div className="skills-grid">
        {GROUPS.map((g) => (
          <div className="card" key={g.title}>
            <h3 className="skill-title">{g.icon} {g.title}</h3>

            {g.skills ? (
              // 带进度条的技能
              <div className="skill-bars">
                {g.skills.map((s) => (
                  <div className="skill-bar" key={s.name}>
                    <div className="skill-bar-head">
                      <span>{s.name}</span>
                      <span className="skill-pct">{s.level}%</span>
                    </div>
                    <div className="bar">
                      <div className="bar-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 纯标签型技能
              <div className="tag-list">
                {g.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
