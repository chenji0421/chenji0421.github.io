import { useState } from 'react'

const LINKS = [
  { href: '#about', label: '关于' },
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#blog', label: '博客' },
  { href: '#roadmap', label: '路线' },
  { href: '#contact', label: '联系' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false) // 移动端汉堡菜单是否展开

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top" onClick={() => setOpen(false)}>
          <span className="nav-logo-dot" />
          <span>chenji0421</span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="主导航">
          {LINKS.map((l) => (
            <a key={l.href} className="nav-link" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="切换深浅色主题" title="切换主题">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="打开菜单"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
