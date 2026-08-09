/* ============================================================
   Chenji Learning Hub · 交互脚本
   ------------------------------------------------------------
   原则：这是一个「真实可维护」的框架。
   - 文章 / 项目来自 js/content.js 的 siteContent（默认为空）
   - 没有文章 / 项目时显示好看的空状态，绝不放假内容
   - 计划数据存 localStorage（键名 chenji_planner_data）
   - 文章详情用 fetch 读取 articles/ 下的 Markdown 文件渲染
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 工具函数 ---------- */
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function dateStr(y, m, d) { return y + '-' + pad2(m + 1) + '-' + pad2(d); }

  /* ---------- Toast 提示 ---------- */
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(msg, type) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.className = 'toast'; }, 2400);
  }

  /* ---------- 导航数据 ---------- */
  var NAV_ITEMS = [
    { key: 'home',     label: '首页',   icon: '🏠' },
    { key: 'articles', label: '文章',   icon: '📝' },
    { key: 'plans',    label: '计划',   icon: '🗓️' },
    { key: 'projects', label: '项目',   icon: '📦' },
    { key: 'toolbox',  label: '工具箱', icon: '🧰' },
    { key: 'games',    label: '游戏',   icon: '🎮' },
    { key: 'about',    label: '关于',   icon: '👤' },
    { key: 'login',    label: '登录',   icon: '🔐' }
  ];

  /* ================= 渲染侧边栏导航 ================= */
  var navEl = $('#sideNav');
  var PAGE_TITLES = {};
  NAV_ITEMS.forEach(function (item) {
    PAGE_TITLES[item.key] = item.label;
    if (navEl) {
      var a = document.createElement('a');
      a.className = 'side-link';
      a.href = '#' + item.key;
      a.setAttribute('data-page', item.key);
      a.innerHTML = '<span class="side-icon">' + item.icon + '</span><span class="side-text">' + item.label + '</span>';
      navEl.appendChild(a);
    }
  });
  var VALID_PAGES = NAV_ITEMS.map(function (i) { return i.key; });

  /* ================= Hash 路由 ================= */
  function navigate(page, updateHash) {
    if (VALID_PAGES.indexOf(page) === -1) page = 'home';

    $all('.page').forEach(function (p) { p.classList.remove('active'); });
    var target = $('#page-' + page);
    if (target) target.classList.add('active');

    $all('.side-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });

    var titleEl = $('#topbarTitle');
    if (titleEl) titleEl.textContent = PAGE_TITLES[page] || '首页';

    closeSidebarMobile();
    window.scrollTo(0, 0);

    if (updateHash !== false && window.location.hash !== '#' + page) {
      window.location.hash = page;
    }
  }

  function getHashPage() {
    var h = (window.location.hash || '').replace('#', '');
    return h || 'home';
  }

  navEl && navEl.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('.side-link') : null;
    if (!link) return;
    e.preventDefault();
    navigate(link.getAttribute('data-page'));
  });

  $all('[data-goto]').forEach(function (btn) {
    btn.addEventListener('click', function () { navigate(btn.getAttribute('data-goto')); });
  });

  window.addEventListener('hashchange', function () {
    navigate(getHashPage(), false);
  });

  /* ================= 关于页数据（真实自我介绍，不夸大） ================= */
  var ABOUT = {
    intro: '我是 Chenji（陈际），一名非计算机专业的大二学生，正在学习 Python、前端开发和数据分析。水平都还在入门阶段，想通过项目驱动的方式一点点积累。这个网站是我真实学习过程的地方，不追求看起来很厉害，只追求真实记录。',
    focus: ['Python 自动化', 'Web 前端', '数据分析', 'GitHub 项目管理', '长期主义学习'],
    skills: [
      { name: 'Python',       pct: 20, cls: '' },
      { name: 'HTML / CSS',   pct: 30, cls: 'blue' },
      { name: 'JavaScript',   pct: 15, cls: 'indigo' },
      { name: 'Git / GitHub', pct: 25, cls: 'green' },
      { name: '数据分析',     pct: 10, cls: 'purple' }
    ],
    timeline: [
      { date: '2026-04', title: '创建第一个网页', desc: '照着教程写出了人生第一个 HTML 页面，对前端产生了兴趣。' },
      { date: '2026-05', title: '部署 GitHub Pages', desc: '把页面真正放到公网上，第一次觉得「我也可以」。' },
      { date: '2026-06', title: '搭建个人主页', desc: '从占位页开始，做成一个像样的个人主页。' },
      { date: '2026-07', title: '做成多页面工作台', desc: '加入左侧导航与多页面系统，开始把网站当学习工作台用。' },
      { date: '2026-08', title: '重构为真实空框架', desc: '删除假文章假项目，改造成真实可维护的内容框架。' },
      { date: '规划中', title: '写出第一批真实内容', desc: '写出第一篇真实文章、登记第一个真实项目。' }
    ],
    principles: [
      { icon: '🐢', title: '慢慢来，比较快', desc: '不追求一晚上学会，追求每天进步一点点。' },
      { icon: '🛠️', title: '项目驱动', desc: '想学什么，就做一个用到它的东西。' },
      { icon: '📝', title: '输出倒逼输入', desc: '学完写下来、讲出来，才算是真的会了。' },
      { icon: '🔁', title: '定期复盘', desc: '每周回头看，调整方向，避免低效努力。' }
    ],
    contact: [
      { icon: '🐙', label: 'GitHub：github.com/chenji0421', href: 'https://github.com/chenji0421' },
      { icon: '✉️', label: '邮箱：chenji0421@example.com（占位）', href: 'mailto:chenji0421@example.com' },
      { icon: '🔒', label: '更多联系方式建设中', href: null }
    ]
  };

  /* ================= 首页：真实统计 ================= */
  var STAT_CACHE = null;
  function getPlannerData() {
    if (STAT_CACHE) return STAT_CACHE;
    try {
      var raw = localStorage.getItem('chenji_planner_data');
      STAT_CACHE = raw ? JSON.parse(raw) : {};
    } catch (e) { STAT_CACHE = {}; }
    return STAT_CACHE;
  }

  function refreshPlannerCache() { STAT_CACHE = null; getPlannerData(); }

  function countPlanDays() {
    var data = getPlannerData();
    var n = 0;
    for (var k in data) { if (Object.prototype.hasOwnProperty.call(data, k) && data[k] && data[k].goal) n++; }
    return n;
  }

  function renderHomeStats() {
    var arts = $('#statArticles');
    var prjs = $('#statProjects');
    var plans = $('#statPlans');
    var skills = $('#statSkills');
    if (arts) arts.textContent = String((siteContent.articles || []).length);
    if (prjs) prjs.textContent = String((siteContent.projects || []).length);
    if (plans) plans.textContent = String(countPlanDays());
    if (skills) skills.textContent = String((ABOUT.skills || []).length);
  }

  /* 首页：最近更新（从真实文章计算，最多 4 篇） */
  var recentEl = $('#recentList');
  if (recentEl) {
    var recent = (siteContent.articles || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    }).slice(0, 4);
    if (recent.length) {
      recentEl.innerHTML = '';
      recent.forEach(function (p) {
        var item = document.createElement('a');
        item.className = 'recent-item';
        item.href = '#articles';
        item.innerHTML =
          '<span class="recent-dot"></span>' +
          '<span class="recent-title">' + escapeHtml(p.title) + '</span>' +
          '<span class="recent-meta">' + escapeHtml(p.date) + '</span>';
        recentEl.appendChild(item);
      });
    }
  }

  /* ================= 文章页 ================= */
  var articleGrid = $('#articleGrid');
  var articleEmpty = $('#articleEmpty');
  var articleFilters = $('#articleFilters');
  var countEl = $('#articleCount');
  var filterState = { q: '', tag: 'all', cat: 'all', month: 'all' };

  function catClass(cat) {
    return { '学习笔记': 'cat-learn', '项目记录': 'cat-project', '技术复盘': 'cat-review', '生活记录': 'cat-life' }[cat] || 'cat-learn';
  }

  function buildArticleCard(p) {
    var card = document.createElement('article');
    card.className = 'article-card';
    card.dataset.title = p.title;
    card.dataset.cat = p.category || '';
    card.dataset.date = p.date || '';
    card.dataset.summary = p.summary || '';
    card.dataset.tags = (p.tags || []).join(',');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', '打开文章：' + p.title);
    var tagsHtml = (p.tags || []).map(function (t) {
      return '<span class="mini-tag">' + escapeHtml(t) + '</span>';
    }).join('');
    card.innerHTML =
      '<div class="article-meta">' +
        '<span class="badge ' + catClass(p.category) + '">' + escapeHtml(p.category || '未分类') + '</span>' +
        '<span class="meta-item">' + escapeHtml(p.date || '') + '</span>' +
      '</div>' +
      '<h4 class="article-title">' + escapeHtml(p.title) + '</h4>' +
      '<p class="article-summary">' + escapeHtml(p.summary) + '</p>' +
      '<div class="article-tags">' + tagsHtml + '</div>';
    return card;
  }

  /* 从真实文章数据推导筛选选项 */
  function buildFilters() {
    var tagEl = $('#tagFilter');
    var catSel = $('#categoryFilter');
    var monthSel = $('#monthFilter');
    var articles = siteContent.articles || [];

    var tagSet = [];
    var catSet = [];
    var monthSet = [];
    articles.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (tagSet.indexOf(t) === -1) tagSet.push(t);
      });
      if (p.category && catSet.indexOf(p.category) === -1) catSet.push(p.category);
      if (p.date) {
        var m = p.date.slice(0, 7); // YYYY-MM
        if (monthSet.indexOf(m) === -1) monthSet.push(m);
      }
    });

    if (tagEl) {
      tagEl.innerHTML = '';
      var allChip = document.createElement('button');
      allChip.type = 'button';
      allChip.className = 'chip active';
      allChip.setAttribute('data-tag', 'all');
      allChip.textContent = '全部';
      tagEl.appendChild(allChip);
      tagSet.forEach(function (t) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.setAttribute('data-tag', t);
        b.textContent = t;
        tagEl.appendChild(b);
      });
    }

    if (catSel) {
      catSel.innerHTML = '';
      var oAll = document.createElement('option');
      oAll.value = 'all';
      oAll.textContent = '全部分类';
      catSel.appendChild(oAll);
      catSet.forEach(function (c) {
        var o = document.createElement('option');
        o.value = c;
        o.textContent = c;
        catSel.appendChild(o);
      });
    }

    if (monthSel) {
      monthSel.innerHTML = '';
      var oM = document.createElement('option');
      oM.value = 'all';
      oM.textContent = '全部月份';
      monthSel.appendChild(oM);
      monthSet.slice().sort().reverse().forEach(function (m) {
        var o = document.createElement('option');
        o.value = m;
        o.textContent = m.replace('-', '年') + '月';
        monthSel.appendChild(o);
      });
    }
  }

  function renderArticles() {
    var articles = siteContent.articles || [];
    if (articleEmpty) articleEmpty.style.display = articles.length ? 'none' : '';
    if (articleFilters) articleFilters.style.display = articles.length ? '' : 'none';

    if (!articleGrid) return;
    articleGrid.innerHTML = '';
    articles.forEach(function (p) { articleGrid.appendChild(buildArticleCard(p)); });
    applyArticleFilter();
  }

  function applyArticleFilter() {
    var cards = $all('#articleGrid .article-card');
    var shown = 0;
    cards.forEach(function (card) {
      var ok = true;
      var text = (card.dataset.title + ' ' + card.dataset.summary + ' ' + card.dataset.tags).toLowerCase();
      var q = filterState.q.toLowerCase().trim();
      if (q && text.indexOf(q) === -1) ok = false;
      if (ok && filterState.tag !== 'all') {
        var tags = (card.dataset.tags || '').toLowerCase().split(',');
        if (tags.indexOf(filterState.tag) === -1) ok = false;
      }
      if (ok && filterState.cat !== 'all' && card.dataset.cat !== filterState.cat) ok = false;
      if (ok && filterState.month !== 'all' && (card.dataset.date || '').indexOf(filterState.month) !== 0) ok = false;
      card.classList.toggle('hide', !ok);
      if (ok) shown++;
    });
    if (countEl) countEl.textContent = shown + ' / ' + (siteContent.articles || []).length + ' 篇文章';
  }

  var searchInput = $('#articleSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterState.q = searchInput.value;
      applyArticleFilter();
    });
  }

  var tagFilterEl = $('#tagFilter');
  if (tagFilterEl) {
    tagFilterEl.addEventListener('click', function (e) {
      var chip = e.target.closest ? e.target.closest('.chip') : null;
      if (!chip) return;
      tagFilterEl.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      filterState.tag = chip.getAttribute('data-tag').toLowerCase();
      applyArticleFilter();
    });
  }

  var catSel = $('#categoryFilter');
  if (catSel) catSel.addEventListener('change', function () { filterState.cat = catSel.value; applyArticleFilter(); });
  var monthSel = $('#monthFilter');
  if (monthSel) monthSel.addEventListener('change', function () { filterState.month = monthSel.value; applyArticleFilter(); });

  /* 点击文章卡片 → 打开 Markdown；点击卡片内标签 → 筛选 */
  if (articleGrid) {
    articleGrid.addEventListener('click', function (e) {
      var tagEl = e.target.closest ? e.target.closest('.mini-tag') : null;
      if (tagEl) {
        var t = tagEl.textContent.trim().toLowerCase();
        var chips = tagFilterEl ? tagFilterEl.querySelectorAll('.chip') : [];
        for (var i = 0; i < chips.length; i++) {
          if (chips[i].getAttribute('data-tag').toLowerCase() === t) { chips[i].click(); return; }
        }
        return;
      }
      var card = e.target.closest ? e.target.closest('.article-card') : null;
      if (card) openArticleFromCard(card);
    });
  }

  function openArticleFromCard(card) {
    var articles = siteContent.articles || [];
    var title = card.dataset.title;
    var found = null;
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].title === title) { found = articles[i]; break; }
    }
    if (found) openArticleModal(found);
    else toast('找不到这篇文章的数据', 'success');
  }

  /* ================= 文章详情：Markdown 渲染 ================= */
  var modal = $('#articleModal');
  var modalBody = $('#modalBody');
  var modalClose = $('#modalClose');

  function openArticleModal(article) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = '<p class="md-loading">正在读取文章…</p>';
    modal.classList.add('show');
    document.body.classList.add('modal-open');

    fetch(article.file)
      .then(function (res) {
        if (!res.ok) throw new Error('not found');
        return res.text();
      })
      .then(function (md) {
        modalBody.innerHTML = renderMarkdown(md);
      })
      .catch(function () {
        modalBody.innerHTML =
          '<div class="md-error">' +
            '<div class="md-error-icon">😕</div>' +
            '<p>文章文件不存在，请检查 js/content.js 中的 file 路径。</p>' +
            '<code>' + escapeHtml(article.file) + '</code>' +
          '</div>';
      });
  }

  function closeArticleModal() {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  if (modalClose) modalClose.addEventListener('click', closeArticleModal);
  if (modal) modal.addEventListener('click', function (e) {
    if (e.target === modal) closeArticleModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeArticleModal();
  });

  /* 极简 Markdown 渲染器（不引外部库） */
  function renderMarkdown(md) {
    var lines = String(md || '').split(/\r?\n/);
    var html = '';
    var inCode = false;
    var codeBuf = [];
    var inList = false;

    function closeList() {
      if (inList) { html += '</ul>'; inList = false; }
    }
    function flushCode() {
      html += '<pre><code>' + codeBuf.map(escapeHtml).join('\n') + '</code></pre>';
      codeBuf = [];
    }
    function inline(s) {
      return escapeHtml(s)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    lines.forEach(function (line) {
      var trimmed = line.trim();

      if (trimmed.slice(0, 3) === '```') {
        if (!inCode) { closeList(); inCode = true; codeBuf = []; }
        else { inCode = false; flushCode(); }
        return;
      }
      if (inCode) { codeBuf.push(line); return; }

      if (trimmed === '') { closeList(); return; }

      if (/^###\s+/.test(trimmed)) { closeList(); html += '<h3>' + inline(trimmed.replace(/^###\s+/, '')) + '</h3>'; return; }
      if (/^##\s+/.test(trimmed)) { closeList(); html += '<h2>' + inline(trimmed.replace(/^##\s+/, '')) + '</h2>'; return; }
      if (/^#\s+/.test(trimmed)) { closeList(); html += '<h1>' + inline(trimmed.replace(/^#\s+/, '')) + '</h1>'; return; }

      if (/^[-*]\s+/.test(trimmed)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + inline(trimmed.replace(/^[-*]\s+/, '')) + '</li>';
        return;
      }
      if (/^\d+\.\s+/.test(trimmed)) {
        closeList();
        html += '<ol><li>' + inline(trimmed.replace(/^\d+\.\s+/, '')) + '</li></ol>';
        return;
      }

      closeList();
      html += '<p>' + inline(trimmed) + '</p>';
    });

    if (inCode) flushCode();
    closeList();
    return html;
  }

  /* ================= 项目页：按状态分组渲染 ================= */
  var projectGroups = $('#projectGroups');
  var projectEmpty = $('#projectEmpty');

  var STATUS_ORDER = ['已上线', '进行中', '计划中', '长期计划'];
  var STATUS_CLASS = { '已上线': 's-done', '进行中': 's-doing', '计划中': 's-plan', '长期计划': 's-long' };

  function renderProjects() {
    var projects = siteContent.projects || [];
    if (!projectGroups) return;

    projectGroups.innerHTML = '';
    if (projectEmpty) projectEmpty.style.display = projects.length ? 'none' : '';

    if (!projects.length) {
      if (projectEmpty) projectGroups.appendChild(projectEmpty);
      return;
    }

    STATUS_ORDER.forEach(function (status) {
      var groupList = projects.filter(function (p) { return (p.status || '') === status; });
      if (!groupList.length) return;
      var group = document.createElement('div');
      group.className = 'project-group';
      group.innerHTML = '<h3 class="block-title">' + escapeHtml(status) + ' <span class="proj-count">' + groupList.length + '</span></h3><div class="project-grid"></div>';
      var grid = group.querySelector('.project-grid');
      groupList.forEach(function (p) {
        var tags = (p.tech || []).map(function (t) { return '<span class="mini-tag">' + escapeHtml(t) + '</span>'; }).join('');
        var linkBtn = p.link ? '<a class="btn-sm" href="' + escapeHtml(p.link) + '" target="_blank" rel="noopener">访问</a>' : '';
        var repoBtn = p.repo ? '<a class="btn-sm" href="' + escapeHtml(p.repo) + '" target="_blank" rel="noopener">查看仓库</a>' : '';
        var card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML =
          '<div class="proj-top">' +
            '<h4 class="proj-name">' + escapeHtml(p.name) + '</h4>' +
            '<span class="proj-status ' + (STATUS_CLASS[status] || 's-plan') + '">' + escapeHtml(status) + '</span>' +
          '</div>' +
          '<p class="proj-desc">' + escapeHtml(p.description || '') + '</p>' +
          '<div class="proj-tags">' + tags + '</div>' +
          '<div class="proj-actions">' + linkBtn + repoBtn + '</div>';
        grid.appendChild(card);
      });
      projectGroups.appendChild(group);
    });
  }

  /* ================= 计划页：年 / 月 / 日三视图 ================= */
  var PLANNER_KEY = 'chenji_planner_data';
  var plannerState = (function () {
    var now = new Date();
    return { view: 'year', year: now.getFullYear(), month: now.getMonth(), date: dateStr(now.getFullYear(), now.getMonth(), now.getDate()) };
  })();

  function getPlanner() {
    try {
      var raw = localStorage.getItem(PLANNER_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function savePlanner(data) {
    try { localStorage.setItem(PLANNER_KEY, JSON.stringify(data)); } catch (e) {}
    refreshPlannerCache();
    renderHomeStats();
  }

  var yearView = $('#yearView');
  var monthView = $('#monthView');
  var dayView = $('#dayView');

  function setPlannerView(view) {
    plannerState.view = view;
    ['viewYear', 'viewMonth', 'viewDay'].forEach(function (id) {
      var b = $('#' + id);
      if (b) b.classList.toggle('active', id === 'view' + view.charAt(0).toUpperCase() + view.slice(1));
    });
    if (yearView) yearView.style.display = view === 'year' ? '' : 'none';
    if (monthView) monthView.style.display = view === 'month' ? '' : 'none';
    if (dayView) dayView.style.display = view === 'day' ? '' : 'none';
    renderPlanner();
  }

  function renderPlanner() {
    var titleEl = $('#plannerTitle');
    var data = getPlanner();
    var v = plannerState;

    if (titleEl) {
      if (v.view === 'year') titleEl.textContent = v.year + ' 年';
      else if (v.view === 'month') titleEl.textContent = v.year + ' 年 ' + (v.month + 1) + ' 月';
      else titleEl.textContent = v.date;
    }

    if (v.view === 'year') renderYearView(data);
    else if (v.view === 'month') renderMonthView(data);
    else renderDayView(data);
  }

  function countMonthStats(data, year, month) {
    var prefix = year + '-' + pad2(month + 1) + '-';
    var goal = 0, done = 0;
    for (var k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k) && k.indexOf(prefix) === 0) {
        goal++;
        if (data[k] && data[k].status === '已完成') done++;
      }
    }
    return { goal: goal, done: done };
  }

  function renderYearView(data) {
    if (!yearView) return;
    var y = plannerState.year;
    var months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    yearView.innerHTML = '';
    var grid = document.createElement('div');
    grid.className = 'year-grid';
    months.forEach(function (name, i) {
      var st = countMonthStats(data, y, i);
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'month-card';
      card.innerHTML =
        '<div class="month-name">' + name + '</div>' +
        '<div class="month-stats">' +
          '<span class="mstat goal">目标 ' + st.goal + '</span>' +
          '<span class="mstat done">完成 ' + st.done + '</span>' +
        '</div>';
      card.addEventListener('click', function () {
        plannerState.view = 'month';
        plannerState.month = i;
        setPlannerView('month');
      });
      grid.appendChild(card);
    });
    yearView.appendChild(grid);
  }

  function renderMonthView(data) {
    if (!monthView) return;
    var y = plannerState.year;
    var m = plannerState.month;
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var firstDay = new Date(y, m, 1).getDay();
    var offset = (firstDay + 6) % 7; // 周一开头
    var prefix = y + '-' + pad2(m + 1) + '-';

    monthView.innerHTML = '';
    var table = document.createElement('div');
    table.className = 'calendar';

    var week = document.createElement('div');
    week.className = 'cal-week cal-head';
    ['一', '二', '三', '四', '五', '六', '日'].forEach(function (w) {
      var cell = document.createElement('div');
      cell.className = 'cal-cell cal-head-cell';
      cell.textContent = w;
      week.appendChild(cell);
    });
    table.appendChild(week);

    var cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
    for (var i = 0; i < cellCount; i++) {
      if (i % 7 === 0) { week = document.createElement('div'); week.className = 'cal-week'; table.appendChild(week); }
      var dayNum = i - offset + 1;
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-cell';
      if (dayNum < 1 || dayNum > daysInMonth) {
        cell.classList.add('empty');
        cell.textContent = '';
        week.appendChild(cell);
        continue;
      }
      var ds = prefix + pad2(dayNum);
      var entry = data[ds];
      var now = new Date();
      if (ds === dateStr(now.getFullYear(), now.getMonth(), now.getDate())) cell.classList.add('today');
      if (entry) {
        cell.classList.add('has-plan');
        if (entry.status === '已完成') cell.classList.add('done');
      }
      cell.innerHTML =
        '<span class="cal-day">' + dayNum + '</span>' +
        (entry ? '<span class="cal-dot"></span>' : '') +
        (entry && entry.goal ? '<span class="cal-title">' + escapeHtml(entry.goal.slice(0, 8)) + '</span>' : '');
      cell.addEventListener('click', (function (dsv) {
        return function () {
          plannerState.date = dsv;
          setPlannerView('day');
        };
      })(ds));
      week.appendChild(cell);
    }
    monthView.appendChild(table);
  }

  function renderDayView(data) {
    if (!dayView) return;
    var d = plannerState.date;
    var dateLabel = $('#dayDate');
    if (dateLabel) dateLabel.textContent = d;
    var entry = data[d] || { goal: '', morning: '', afternoon: '', evening: '', review: '', status: '未开始' };

    var goalEl = $('#dayGoal');
    var morningEl = $('#dayMorning');
    var afternoonEl = $('#dayAfternoon');
    var eveningEl = $('#dayEvening');
    var reviewEl = $('#dayReview');
    var statusEl = $('#dayStatus');

    if (goalEl) goalEl.value = entry.goal || '';
    if (morningEl) morningEl.value = entry.morning || '';
    if (afternoonEl) afternoonEl.value = entry.afternoon || '';
    if (eveningEl) eveningEl.value = entry.evening || '';
    if (reviewEl) reviewEl.value = entry.review || '';
    if (statusEl) {
      var has = false;
      for (var i = 0; i < statusEl.options.length; i++) {
        if (statusEl.options[i].value === entry.status) { statusEl.selectedIndex = i; has = true; break; }
      }
      if (!has) statusEl.selectedIndex = 0;
    }
  }

  function readDayForm() {
    return {
      goal: ($('#dayGoal') || {}).value || '',
      morning: ($('#dayMorning') || {}).value || '',
      afternoon: ($('#dayAfternoon') || {}).value || '',
      evening: ($('#dayEvening') || {}).value || '',
      review: ($('#dayReview') || {}).value || '',
      status: ($('#dayStatus') || {}).value || '未开始'
    };
  }

  var daySaveBtn = $('#daySave');
  if (daySaveBtn) {
    daySaveBtn.addEventListener('click', function () {
      var data = getPlanner();
      data[plannerState.date] = readDayForm();
      savePlanner(data);
      toast('已保存 ' + plannerState.date + ' 的计划', 'success');
      renderPlanner();
    });
  }

  var dayDeleteBtn = $('#dayDelete');
  if (dayDeleteBtn) {
    dayDeleteBtn.addEventListener('click', function () {
      var data = getPlanner();
      if (!data[plannerState.date]) { toast('这一天还没有计划', 'success'); return; }
      if (!window.confirm('确定删除 ' + plannerState.date + ' 的计划吗？')) return;
      delete data[plannerState.date];
      savePlanner(data);
      toast('已删除当天的计划', 'success');
      renderPlanner();
    });
  }

  /* 计划视图切换按钮 */
  ['viewYear', 'viewMonth', 'viewDay'].forEach(function (id) {
    var b = $('#' + id);
    if (b) b.addEventListener('click', function () {
      setPlannerView(id.replace('view', '').toLowerCase());
    });
  });

  /* 年/月/日导航（上一个 / 下一个） */
  var prevBtn = $('#plannerPrev');
  var nextBtn = $('#plannerNext');
  if (prevBtn) prevBtn.addEventListener('click', function () {
    var v = plannerState;
    if (v.view === 'year') { v.year--; }
    else if (v.view === 'month') { v.month--; if (v.month < 0) { v.month = 11; v.year--; } }
    else { shiftDate(-1); }
    renderPlanner();
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    var v = plannerState;
    if (v.view === 'year') { v.year++; }
    else if (v.view === 'month') { v.month++; if (v.month > 11) { v.month = 0; v.year++; } }
    else { shiftDate(1); }
    renderPlanner();
  });

  function shiftDate(delta) {
    var parts = plannerState.date.split('-').map(Number);
    var dt = new Date(parts[0], parts[1] - 1, parts[2]);
    dt.setDate(dt.getDate() + delta);
    plannerState.date = dateStr(dt.getFullYear(), dt.getMonth(), dt.getDate());
    plannerState.year = dt.getFullYear();
    plannerState.month = dt.getMonth();
  }

  var todayBtn = $('#plannerToday');
  if (todayBtn) todayBtn.addEventListener('click', function () {
    var now = new Date();
    plannerState.year = now.getFullYear();
    plannerState.month = now.getMonth();
    plannerState.date = dateStr(now.getFullYear(), now.getMonth(), now.getDate());
    renderPlanner();
    toast('已回到今天', 'success');
  });

  /* 导出 / 导入 / 清空 */
  var exportBtn = $('#planExport');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      var data = getPlanner();
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'chenji-planner-' + plannerState.date + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast('已导出计划 JSON', 'success');
    });
  }

  var importBtn = $('#planImport');
  var importFile = $('#planImportFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', function () { importFile.click(); });
    importFile.addEventListener('change', function () {
      var file = importFile.files && importFile.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var parsed = JSON.parse(reader.result);
          if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('格式错误');
          savePlanner(parsed);
          toast('已导入计划数据', 'success');
          renderPlanner();
        } catch (e) {
          toast('导入失败：JSON 格式不正确', 'success');
        }
      };
      reader.readAsText(file);
      importFile.value = '';
    });
  }

  var clearBtn = $('#planClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (!window.confirm('确定清空浏览器里保存的全部本地计划吗？此操作不可撤销。')) return;
      savePlanner({});
      toast('已清空本地计划', 'success');
      renderPlanner();
    });
  }

  /* ================= 关于页渲染 ================= */
  var aboutIntro = $('#aboutIntro');
  if (aboutIntro) aboutIntro.textContent = ABOUT.intro;

  var focusList = $('#focusList');
  if (focusList) {
    ABOUT.focus.forEach(function (f) {
      var s = document.createElement('span');
      s.className = 'focus-chip';
      s.textContent = f;
      focusList.appendChild(s);
    });
  }

  var skillList = $('#skillList');
  if (skillList) {
    ABOUT.skills.forEach(function (s) {
      var row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML =
        '<span class="skill-name">' + escapeHtml(s.name) + '</span>' +
        '<div class="skill-track"><span class="skill-fill ' + (s.cls || '') + '" style="width:' + s.pct + '%"></span></div>' +
        '<span class="skill-val">' + s.pct + '%</span>';
      skillList.appendChild(row);
    });
  }

  var aboutTimeline = $('#aboutTimeline');
  if (aboutTimeline) {
    ABOUT.timeline.forEach(function (t) {
      var item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML =
        '<span class="tline-dot"></span>' +
        '<div class="tline-body">' +
          '<div class="tline-date">' + escapeHtml(t.date) + '</div>' +
          '<div class="tline-title">' + escapeHtml(t.title) + '</div>' +
          '<p>' + escapeHtml(t.desc) + '</p>' +
        '</div>';
      aboutTimeline.appendChild(item);
    });
  }

  var principleGrid = $('#principleGrid');
  if (principleGrid) {
    ABOUT.principles.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'principle-card';
      card.innerHTML =
        '<span class="p-icon">' + p.icon + '</span>' +
        '<b>' + escapeHtml(p.title) + '</b>' +
        '<p>' + escapeHtml(p.desc) + '</p>';
      principleGrid.appendChild(card);
    });
  }

  var contactList = $('#contactList');
  if (contactList) {
    ABOUT.contact.forEach(function (c) {
      if (c.href) {
        var a = document.createElement('a');
        a.className = 'contact-item';
        a.href = c.href;
        if (c.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
        a.textContent = c.icon + ' ' + c.label;
        contactList.appendChild(a);
      } else {
        var s = document.createElement('span');
        s.className = 'contact-item muted';
        s.textContent = c.icon + ' ' + c.label;
        contactList.appendChild(s);
      }
    });
  }

  /* ================= 通用演示按钮 Toast ================= */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-toast]') : null;
    if (btn) toast(btn.getAttribute('data-toast'), 'success');
  });

  /* ================= 侧边栏折叠 / 移动端抽屉 ================= */
  var sidebar = $('#sidebar');
  var collapseBtn = $('#sidebarCollapse');
  var hamburger = $('#hamburger');
  var backdrop = $('#sidebarBackdrop');

  function applyCollapsed(collapsed) {
    document.body.classList.toggle('side-collapsed', collapsed);
    if (collapseBtn) {
      var txt = collapseBtn.querySelector('.collapse-text');
      if (txt) txt.textContent = collapsed ? '' : '收起';
    }
  }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = !document.body.classList.contains('side-collapsed');
      applyCollapsed(collapsed);
      toast(collapsed ? '侧边栏已收起' : '侧边栏已展开', 'success');
    });
  }

  function openSidebarMobile() {
    document.body.classList.add('side-open');
    if (backdrop) backdrop.classList.add('show');
    if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  }
  function closeSidebarMobile() {
    document.body.classList.remove('side-open');
    if (backdrop) backdrop.classList.remove('show');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    if (document.body.classList.contains('side-open')) closeSidebarMobile();
    else openSidebarMobile();
  });
  if (backdrop) backdrop.addEventListener('click', closeSidebarMobile);

  /* ================= 返回顶部 ================= */
  var backTop = $('#backTop');
  function onScroll() {
    if (backTop) backTop.classList.toggle('show', (window.pageYOffset || 0) > 400);
  }
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ================= 年份 ================= */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ================= 深色 / 浅色主题切换 ================= */
  var themeBtn = $('#themeToggle');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('hub_theme', theme); } catch (e) {}
    if (!themeBtn) return;
    var icon = themeBtn.querySelector('.theme-icon');
    var txt = themeBtn.querySelector('.theme-text');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (txt) txt.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
      toast(cur === 'dark' ? '已切换到浅色模式' : '已切换到深色模式', 'success');
    });
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('hub_theme'); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  /* ================= 初始化 ================= */
  function init() {
    initTheme();
    renderHomeStats();
    buildFilters();
    renderArticles();
    renderProjects();
    setPlannerView('year');
    navigate(getHashPage(), false);
    onScroll();
  }

  if (typeof siteContent === 'undefined' || !siteContent) {
    // content.js 未加载时兜底，避免整站白屏
    window.siteContent = { articles: [], projects: [] };
  }
  init();
})();
