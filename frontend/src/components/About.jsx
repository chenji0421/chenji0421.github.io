export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <span className="section-tag">01 // ABOUT</span>
        <h2>
          关于<span className="gradient">我</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="card">
          <div className="fact"><span>身份</span><b>非计算机专业 · 大二</b></div>
          <div className="fact"><span>方向</span><b>Python · Web · 数据分析</b></div>
          <div className="fact"><span>状态</span><b>边上课边自学</b></div>
          <div className="fact"><span>座右铭</span><b>慢慢来，比较快</b></div>
        </div>

        <div className="card about-text">
          <p>
            一开始只是因为「电脑很酷」才开始接触编程，没想到写着写着就停不下来了。
            Python 是我的第一个朋友，后来我又喜欢上了前端——把想法变成看得见的网页，
            真的很有成就感。
          </p>
          <p>
            现在的我还在打地基的阶段，但我会一直往前走。
            这个仓库就是我学习路上的「展示柜」：既有根目录的静态主页，也有 React 前端示例，
            还有 FastAPI 后端示例。
          </p>
        </div>
      </div>
    </section>
  )
}
