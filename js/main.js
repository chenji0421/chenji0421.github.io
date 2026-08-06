/* ============================================================
   chenji0421.github.io · 交互脚本
   功能：主题切换 / 移动端菜单 / 打字机 / 滚动动画 /
        技能条动画 / 导航高亮 / 进度条 / 年份
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 主题：默认跟随系统，切换后持久化 ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function getSavedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  // 初始主题：已保存的选择 > 系统偏好 > 深色
  var initialTheme = getSavedTheme() || getSystemTheme() || 'dark';
  root.setAttribute('data-theme', initialTheme);
  if (themeColor) themeColor.setAttribute('content', initialTheme === 'light' ? '#f6f8fc' : '#0b1020');

  function applyTheme(theme) {
    // 加一层 class，让所有颜色平滑过渡后再移除
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', theme);
    if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#f6f8fc' : '#0b1020');
    try { localStorage.setItem('theme', theme); } catch (e) { /* 隐私模式下忽略 */ }
    setTimeout(function () { root.classList.remove('theme-switching'); }, 360);
  }

  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------- 顶部阅读进度条 ---------- */
  var progress = document.getElementById('scrollProgress');
  function updateProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var y = window.pageYOffset || doc.scrollTop || 0;
    var pct = max > 0 ? y / max : 0;
    if (progress) progress.style.width = (pct * 100).toFixed(2) + '%';
  }

  /* ---------- 导航滚动态 / 回到顶部 / 年份 ---------- */
  var nav = document.getElementById('nav');
  var backTop = document.getElementById('backTop');
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 8);
    backTop.classList.toggle('show', y > 480);
    updateProgress();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 移动端菜单 ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // 点击菜单内的链接后自动收起
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- 打字机效果 ---------- */
  var phrases = [
    '爱折腾的大学生',
    'Python 学习者',
    'Web 开发者（学习中）',
    'GitHub 常驻民',
    '未来的全栈工程师'
  ];
  var typeEl = document.getElementById('typewriter');
  var phraseIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function typeLoop() {
    var current = phrases[phraseIndex];
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

  /* ---------- 滚动显现动画（IntersectionObserver） ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // 老浏览器兜底：直接显示
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 技能条动画（进入视口后填充 + 数字增长） ---------- */
  var bars = document.querySelectorAll('.bar-fill');
  if (bars.length && 'IntersectionObserver' in window) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var fill = entry.target;
        fill.style.width = fill.getAttribute('data-width') + '%';

        // 对应的百分比数字动画
        var head = fill.closest('.skill-bar');
        var pctEl = head && head.querySelector('.skill-pct');
        if (pctEl) {
          var target = parseInt(pctEl.getAttribute('data-pct'), 10) || 0;
          var cur = 0;
          var step = Math.max(1, Math.round(target / 50));
          var timer = setInterval(function () {
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
  }

  /* ---------- 导航高亮（滚动监听当前区块） ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    var pos = window.scrollY + 90;
    var currentId = 'home';

    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      if (pos >= top && pos < bottom) currentId = sec.id;
    });

    navAnchors.forEach(function (a) {
      var isActive = a.getAttribute('href') === '#' + currentId;
      a.classList.toggle('active', isActive);
    });
  }

  // 用 requestAnimationFrame 节流
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        setActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 初始化一次
  setActiveLink();
  onScroll();
  updateProgress();
})();
