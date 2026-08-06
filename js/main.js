/* ============================================================
   chenji0421.github.io · 交互脚本
   功能：主题切换 / 移动端菜单 / 打字机 / 滚动动画 / 导航高亮
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 主题切换（localStorage 持久化） ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* 隐私模式下忽略 */ }
  }

  const savedTheme = (function () {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  })();

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  }

  themeToggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------- 移动端菜单 ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- 导航栏滚动态 & 回到顶部 ---------- */
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    backTop.classList.toggle('show', y > 600);
  }, { passive: true });

  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 打字机效果 ---------- */
  const phrases = ['爱折腾的高中生', 'Python 学习者', 'Web 新手开发者', 'GitHub 常驻民', '梦想家'];
  const typeEl = document.getElementById('typewriter');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
      setTimeout(typeLoop, 85);
    } else {
      charIndex--;
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 40);
    }
  }
  typeLoop();

  /* ---------- 滚动显现动画 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { io.observe(el); });

  /* ---------- 技能条动画（进入视口后填充 + 数字增长） ---------- */
  function animateBars() {
    const bars = document.querySelectorAll('.bar-fill');
    const pcts = document.querySelectorAll('.skill-pct');
    if (!bars.length) return;

    const barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';

        // 对应百分比数字动画
        const head = fill.closest('.skill-bar');
        const pctEl = head && head.querySelector('.skill-pct');
        if (pctEl) {
          const target = parseInt(pctEl.getAttribute('data-pct'), 10) || 0;
          let cur = 0;
          const step = Math.max(1, Math.round(target / 50));
          const timer = setInterval(function () {
            cur += step;
            if (cur >= target) {
              cur = target;
              clearInterval(timer);
            }
            pctEl.textContent = cur + '%';
          }, 24);
        }
        barIO.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    bars.forEach(function (b) { barIO.observe(b); });

    // 兜底：如果页面里根本没有 .skill-pct 也不会报错
    void pcts;
  }
  animateBars();

  /* ---------- 导航高亮（滚动监听当前区块） ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    const pos = window.scrollY + 90;
    let currentId = 'home';

    sections.forEach(function (sec) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (pos >= top && pos < bottom) currentId = sec.id;
    });

    navAnchors.forEach(function (a) {
      const isActive = a.getAttribute('href') === '#' + currentId;
      a.classList.toggle('active', isActive);
    });
  }

  // 用 requestAnimationFrame 节流
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        setActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  setActiveLink();
})();
