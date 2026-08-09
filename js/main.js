/* ============================================================
   Chenji Learning Hub · 交互脚本
   功能：数据渲染 / hash 路由 / 菜单高亮 / 侧边栏折叠 /
        深浅主题 / 文章搜索与筛选 / 计划表 localStorage 编辑 /
        toast / 返回顶部
   数据来自 js/data.js（NAV_ITEMS / HOME / POSTS / PLAN_* /
   PROJECT_GROUPS / TOOLS / GAME / ABOUT_*）
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

  /* ---------- Toast 提示 ---------- */
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(msg, type) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.className = 'toast';
    }, 2400);
  }

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

  $all('.side-login-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { navigate('login'); });
  });

  window.addEventListener('hashchange', function () {
    navigate(getHashPage(), false);
  });

  /* ================= 首页渲染：最近更新 ================= */
  var recentEl = $('#recentList');
  if (recentEl) {
    var recent = POSTS.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    }).slice(0, 4);
    recent.forEach(function (p) {
      var item = document.createElement('a');
      item.className = 'recent-item';
      item.href = '#articles';
      item.innerHTML =
        '<span class="recent-dot"></span>' +
        '<span class="recent-title">' + escapeHtml(p.title) + '</span>' +
        '<span class="recent-meta">' + escapeHtml(p.date) + ' · ' + escapeHtml(p.month) + '</span>';
      recentEl.appendChild(item);
    });
  }

  /* ================= 文章：分类徽章 class 映射 ================= */
  function catClass(cat) {
    return { '学习笔记': 'cat-learn', '项目记录': 'cat-project', '技术复盘': 'cat-review', '生活记录': 'cat-life' }[cat] || 'cat-learn';
  }

  /* 渲染筛选控件 */
  var tagFilterEl = $('#tagFilter');
  if (tagFilterEl) {
    FILTER_TAGS.forEach(function (t, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (i === 0 ? ' active' : '');
      b.setAttribute('data-tag', t);
      b.textContent = t;
      tagFilterEl.appendChild(b);
    });
  }
  var catSel = $('#categoryFilter');
  if (catSel) {
    FILTER_CATEGORIES.forEach(function (c, i) {
      var o = document.createElement('option');
      o.value = (i === 0 ? 'all' : c);
      o.textContent = c;
      catSel.appendChild(o);
    });
  }
  var monthSel = $('#monthFilter');
  if (monthSel) {
    FILTER_MONTHS.forEach(function (m, i) {
      var o = document.createElement('option');
      o.value = (i === 0 ? 'all' : m);
      o.textContent = m;
      monthSel.appendChild(o);
    });
  }

  /* 渲染文章卡片 */
  function buildArticleCard(p) {
    var card = document.createElement('article');
    card.className = 'article-card';
    card.dataset.title = p.title;
    card.dataset.cat = p.category;
    card.dataset.date = p.date;
    card.dataset.month = p.month;
    card.dataset.summary = p.summary;
    card.dataset.tags = p.tags.join(',');
    var tagsHtml = p.tags.map(function (t) {
      return '<span class="mini-tag">' + escapeHtml(t) + '</span>';
    }).join('');
    card.innerHTML =
      '<div class="article-meta">' +
        '<span class="badge ' + catClass(p.category) + '">' + escapeHtml(p.category) + '</span>' +
        '<span class="meta-item">' + escapeHtml(p.date) + '</span>' +
        '<span class="meta-item">' + escapeHtml(p.readTime) + '</span>' +
        '<span class="meta-item">👁 ' + p.views + '</span>' +
      '</div>' +
      '<h4 class="article-title">' + escapeHtml(p.title) + '</h4>' +
      '<p class="article-summary">' + escapeHtml(p.summary) + '</p>' +
      '<div class="article-tags">' + tagsHtml + '</div>';
    return card;
  }

  var articleGrid = $('#articleGrid');
  var pinnedList = $('#pinnedList');
  var hotList = $('#hotList');
  var countEl = $('#articleCount');
  var filterState = { q: '', tag: 'all', cat: 'all', month: 'all' };

  function renderHot() {
    if (!hotList) return;
    var top = POSTS.slice().sort(function (a, b) { return b.views - a.views; }).slice(0, 5);
    top.forEach(function (p, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hot-item';
      btn.setAttribute('data-toast', '文章详情页建设中');
      var rankCls = i === 0 ? ' r1' : (i === 1 ? ' r2' : (i === 2 ? ' r3' : ''));
      btn.innerHTML =
        '<span class="hot-rank' + rankCls + '">' + (i + 1) + '</span>' +
        '<span class="hot-name">' + escapeHtml(p.title) + '</span>' +
        '<span class="hot-views">' + p.views + ' 阅读</span>';
      hotList.appendChild(btn);
    });
  }

  function renderPinned() {
    if (!pinnedList) return;
    POSTS.filter(function (p) { return p.pinned; }).forEach(function (p) {
      var item = document.createElement('a');
      item.className = 'pinned-item';
      item.href = '#articles';
      item.innerHTML =
        '<span class="pin-flag">置顶</span>' +
        '<span class="pinned-title">' + escapeHtml(p.title) + '</span>' +
        '<span class="pinned-meta">' + escapeHtml(p.date) + ' · ' + p.views + ' 阅读</span>';
      pinnedList.appendChild(item);
    });
  }

  function renderArticles() {
    if (!articleGrid) return;
    articleGrid.innerHTML = '';
    POSTS.forEach(function (p) { articleGrid.appendChild(buildArticleCard(p)); });
  }

  /* 文章筛选 */
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
      if (ok && filterState.month !== 'all' && (card.dataset.month ? card.dataset.month : card.dataset.date).indexOf(filterState.month) !== 0) ok = false;
      card.classList.toggle('hide', !ok);
      if (ok) shown++;
    });
    if (countEl) countEl.textContent = shown + ' / ' + POSTS.length + ' 篇文章';
  }

  var searchInput = $('#articleSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterState.q = searchInput.value;
      applyArticleFilter();
    });
  }

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

  if (catSel) catSel.addEventListener('change', function () { filterState.cat = catSel.value; applyArticleFilter(); });
  if (monthSel) monthSel.addEventListener('change', function () { filterState.month = monthSel.value; applyArticleFilter(); });

  /* 点文章卡片内标签也能筛选（事件委托） */
  if (articleGrid) {
    articleGrid.addEventListener('click', function (e) {
      var tagEl = e.target.closest ? e.target.closest('.mini-tag') : null;
      if (!tagEl) return;
      var t = tagEl.textContent.trim().toLowerCase();
      var chips = tagFilterEl ? tagFilterEl.querySelectorAll('.chip') : [];
      var target = null;
      for (var i = 0; i < chips.length; i++) {
        if (chips[i].getAttribute('data-tag').toLowerCase() === t) { target = chips[i]; break; }
      }
      if (target) target.click();
    });
  }

  renderHot();
  renderPinned();
  renderArticles();
  applyArticleFilter();

  /* ================= 计划页渲染 ================= */
  var planCols = $('#planCols');
  if (planCols) {
    PLAN_CARDS.forEach(function (c) {
      var col = document.createElement('div');
      col.className = 'plan-col';
      col.innerHTML =
        '<h4 class="plan-col-title">' + c.icon + ' ' + escapeHtml(c.title) + '</h4>' +
        '<ul class="plan-col-list">' +
        c.items.map(function (it) { return '<li><span class="check">✓</span>' + escapeHtml(it) + '</li>'; }).join('') +
        '</ul>';
      planCols.appendChild(col);
    });
  }

  /* 计划表：localStorage 编辑 / 新增 / 删除 / 恢复模板 / 复制 / 保存 */
  var planBody = $('#planBody');
  var planStorageKey = 'hub_plan_v1';
  var TYPE_COLOR = {
    '生活': '#2f7d6d',
    '学习': '#1a73e8',
    '运动': '#e8590c',
    '调整': '#6b7280',
    '项目': '#9333ea'
  };
  var TYPE_ORDER = ['生活', '学习', '运动', '调整', '项目'];

  function buildTypeOptions(selected) {
    return TYPE_ORDER.map(function (t) {
      return '<option value="' + t + '"' + (t === selected ? ' selected' : '') + '>' + t + '</option>';
    }).join('');
  }

  function buildPlanRow(r) {
    r = r || { time: '', task: '', note: '', type: '生活' };
    var tr = document.createElement('tr');
    tr.dataset.type = r.type;
    tr.innerHTML =
      '<td><input class="cell-input" type="text" value="' + escapeHtml(r.time) + '" data-field="time" aria-label="时间段" placeholder="如 07:30 - 08:00"></td>' +
      '<td><input class="cell-input" type="text" value="' + escapeHtml(r.task) + '" data-field="task" aria-label="要做什么" placeholder="要做什么"></td>' +
      '<td><input class="cell-input" type="text" value="' + escapeHtml(r.note) + '" data-field="note" aria-label="说明" placeholder="重点 / 说明"></td>' +
      '<td><select class="cell-select" data-field="type" aria-label="类型">' + buildTypeOptions(r.type) + '</select></td>' +
      '<td class="cell-ops"><button type="button" class="row-del" title="删除该时间段" aria-label="删除">✕</button></td>';
    return tr;
  }

  function tintType(tr) {
    var sel = tr.querySelector('[data-field="type"]');
    if (!sel) return;
    sel.style.borderLeft = '3px solid ' + (TYPE_COLOR[sel.value] || '#6b7280');
  }

  function readPlanRows() {
    if (!planBody) return [];
    var rows = [];
    planBody.querySelectorAll('tr').forEach(function (tr) {
      var row = { time: '', task: '', note: '', type: '生活' };
      tr.querySelectorAll('[data-field]').forEach(function (inp) {
        row[inp.getAttribute('data-field')] = inp.value;
      });
      rows.push(row);
    });
    return rows;
  }

  function savePlan() {
    try { localStorage.setItem(planStorageKey, JSON.stringify(readPlanRows())); } catch (e) {}
  }

  function renderPlan(rows) {
    if (!planBody) return;
    planBody.innerHTML = '';
    rows.forEach(function (r) {
      var tr = buildPlanRow(r);
      tintType(tr);
      planBody.appendChild(tr);
    });
  }

  function loadPlan() {
    if (!planBody) return;
    var saved = null;
    try { saved = localStorage.getItem(planStorageKey); } catch (e) {}
    if (saved) {
      try {
        var rows = JSON.parse(saved);
        if (Array.isArray(rows) && rows.length) {
          renderPlan(rows);
          return;
        }
      } catch (e) { /* 存档损坏则回退到模板 */ }
    }
    renderPlan(PLAN_TEMPLATE);
  }

  if (planBody) {
    planBody.addEventListener('input', savePlan);
    planBody.addEventListener('change', function (e) {
      var tr = e.target.closest ? e.target.closest('tr') : null;
      if (tr) tintType(tr);
      savePlan();
    });
    planBody.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.row-del') : null;
      if (!btn) return;
      var tr = btn.closest('tr');
      if (tr) {
        tr.remove();
        savePlan();
        toast('已删除该时间段', 'success');
      }
    });
  }

  var planAddBtn = $('#planAddRow');
  if (planAddBtn && planBody) {
    planAddBtn.addEventListener('click', function () {
      var tr = buildPlanRow({ time: '', task: '', note: '', type: '生活' });
      planBody.appendChild(tr);
      tintType(tr);
      savePlan();
      toast('已新增时间段，填写后自动保存', 'success');
      var first = tr.querySelector('.cell-input');
      if (first) first.focus();
    });
  }

  var planResetBtn = $('#planReset');
  if (planResetBtn && planBody) {
    planResetBtn.addEventListener('click', function () {
      renderPlan(PLAN_TEMPLATE);
      savePlan();
      toast('已恢复为默认模板', 'success');
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  var planCopyBtn = $('#planCopy');
  if (planCopyBtn) {
    planCopyBtn.addEventListener('click', function () {
      var rows = readPlanRows();
      var lines = ['Chenji 的阶段冲刺计划', ''];
      rows.forEach(function (r) {
        lines.push(r.time + ' | ' + r.task + ' | ' + r.note + ' | ' + r.type);
      });
      var text = lines.join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          toast('已复制计划文本到剪贴板', 'success');
        }, function () {
          fallbackCopy(text);
          toast('已复制计划文本到剪贴板', 'success');
        });
      } else {
        fallbackCopy(text);
        toast('已复制计划文本到剪贴板', 'success');
      }
    });
  }

  var planSaveBtn = $('#planSave');
  if (planSaveBtn) {
    planSaveBtn.addEventListener('click', function () {
      savePlan();
      toast('已保存到浏览器 localStorage', 'success');
    });
  }

  loadPlan();

  /* ================= 项目页渲染 ================= */
  var projectGroups = $('#projectGroups');
  if (projectGroups) {
    PROJECT_GROUPS.forEach(function (g) {
      var group = document.createElement('div');
      group.className = 'project-group';
      var cards = g.projects.map(function (p) {
        return (
          '<article class="project-card">' +
            '<div class="proj-top">' +
              '<h4 class="proj-name">' + escapeHtml(p.name) + '</h4>' +
              '<span class="proj-status ' + p.statusClass + '">' + escapeHtml(p.status) + '</span>' +
            '</div>' +
            '<p class="proj-desc">' + escapeHtml(p.desc) + '</p>' +
            '<div class="proj-tags">' + p.tags.map(function (t) { return '<span class="mini-tag">' + escapeHtml(t) + '</span>'; }).join('') + '</div>' +
            '<div class="proj-actions">' +
              '<button type="button" class="btn-sm" data-toast="详情页建设中">查看详情</button>' +
              '<button type="button" class="btn-sm" data-toast="仓库地址建设中">查看仓库</button>' +
              '<button type="button" class="btn-sm ghost" data-toast="笔记记录建设中">记录笔记</button>' +
            '</div>' +
          '</article>'
        );
      }).join('');
      group.innerHTML =
        '<h3 class="block-title">' + escapeHtml(g.title) + '</h3>' +
        '<div class="project-grid">' + cards + '</div>';
      projectGroups.appendChild(group);
    });
  }

  /* ================= 工具箱页渲染 ================= */
  var toolGrid = $('#toolGrid');
  if (toolGrid) {
    TOOLS.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'tool-card';
      card.innerHTML =
        '<span class="tool-icon">' + t.icon + '</span>' +
        '<h3 class="tool-title">' + escapeHtml(t.title) + '</h3>' +
        '<p class="tool-desc">' + escapeHtml(t.desc) + '</p>' +
        '<ul class="tool-points">' + t.points.map(function (p) { return '<li>' + escapeHtml(p) + '</li>'; }).join('') + '</ul>' +
        '<span class="tool-tag">' + escapeHtml(t.tag) + '</span>';
      toolGrid.appendChild(card);
    });
  }

  /* ================= 游戏页渲染 ================= */
  var gameCards = $('#gameCards');
  if (gameCards) {
    GAME.cards.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = '<h4>' + c.icon + ' ' + escapeHtml(c.title) + '</h4><p>' + escapeHtml(c.desc) + '</p>';
      gameCards.appendChild(card);
    });
  }

  /* ================= 关于页渲染 ================= */
  var aboutIntro = $('#aboutIntro');
  if (aboutIntro) aboutIntro.textContent = ABOUT_INTRO;

  var focusList = $('#focusList');
  if (focusList) {
    FOCUS_ITEMS.forEach(function (f) {
      var s = document.createElement('span');
      s.className = 'focus-chip';
      s.textContent = f;
      focusList.appendChild(s);
    });
  }

  var skillList = $('#skillList');
  if (skillList) {
    SKILLS.forEach(function (s) {
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
    ABOUT_TIMELINE.forEach(function (t) {
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
    LEARNING_PRINCIPLES.forEach(function (p) {
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
    CONTACT.forEach(function (c) {
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
  initTheme();
  navigate(getHashPage(), false);
  onScroll();
})();
