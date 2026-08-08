import { useEffect, useState } from 'react'

// 打字机效果会依次展示的短语
const PHRASES = [
  '正在学习 Python 的大二学生',
  '网页开发入门中…',
  '数据分析练习生',
  '想写代码也想写博客',
]

export default function Hero() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // 简单的打字机逻辑：逐字打出 → 停顿 → 逐字删除 → 换下一句
  useEffect(() => {
    const current = PHRASES[index % PHRASES.length]
    let timer

    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 90)
      } else {
        timer = setTimeout(() => setDeleting(true), 1600)
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 40)
      } else {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    }
    return () => clearTimeout(timer)
  }, [text, deleting, index])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-badge">👋 你好，我是 Chenji</span>
        <h1 className="hero-title">
          把「想做的事」
          <br />
          变成<span className="gradient">「会做的事」</span>
        </h1>
        <p className="hero-type">
          <span>{text}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="hero-sub">
          一名非计算机专业的大二学生，正在学习 Python、网页开发与数据分析。
          这里记录我的学习路线、项目实践与技术成长。
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">看看我的项目</a>
          <a className="btn btn-ghost" href="#blog">阅读博客</a>
        </div>
      </div>
    </section>
  )
}
