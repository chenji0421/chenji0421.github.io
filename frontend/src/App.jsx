import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import BlogList from './components/BlogList.jsx'
import Timeline from './components/Timeline.jsx'
import Footer from './components/Footer.jsx'

// App 是整棵组件树的根。
// 这里只负责两件事：管理深/浅色主题，然后把各个区块组件按顺序拼起来。
export default function App() {
  // 主题状态：优先读 localStorage，其次跟随系统偏好
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  // 主题变化时：写回 <html data-theme>，并记住用户选择
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <BlogList />
        <Timeline />
      </main>
      <Footer />
    </>
  )
}
