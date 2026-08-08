export default function Footer() {
  return (
    <>
      <section className="section contact" id="contact">
        <div className="section-head">
          <span className="section-tag">06 // CONTACT</span>
          <h2>
            找到<span className="gradient">我</span>
          </h2>
        </div>

        <div className="card contact-card">
          <h3>一起聊聊天吧？</h3>
          <p>想交流、想合作、或者只是打个招呼都欢迎！（这里是占位邮箱，记得换成自己的）</p>
          <div className="contact-links">
            <a className="btn btn-primary" href="mailto:chenji0421@example.com">发邮件给我</a>
            <a
              className="btn btn-ghost"
              href="https://github.com/chenji0421"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} chenji0421 · 用 ❤ 和咖啡搭建 · React + Vite 前端示例
        </p>
      </footer>
    </>
  )
}
