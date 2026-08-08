/* ============================================================
   chenji0421.github.io · 个人学习工作台交互脚本（基础骨架版）
   功能：hash 路由 / 菜单高亮 / 侧边栏折叠 / 移动端抽屉 /
        返回顶部 / toast。不依赖任何数据文件。
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 工具函数 ---------- */
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* ---------- 页面标题映射 ---------- */
  var PAGE_TITLES = {
    home: '首页',
    articles: '文章',
    plans: '计划',
    projects: '项目',
    games: '游戏',
    about: '关于',
    login: '登录'
  };
  var VALID_PAGES = Object.keys(PAGE_TITLES);

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

  /* ================= Hash 路由 ================= */
  function navigate(page, updateHash) {
    if (VALID_PAGES.indexOf(page) === -1) page = 'home';

    // 切换页面显示
    $all('.page').forEach(function (p) { p.classList.remove('active'); });
    var target = $('#page-' + page);
    if (target) target.classList.add('active');

    // 菜单高亮
    $all('.side-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });

    // 顶部标题
    var titleEl = $('#topbarTitle');
    if (titleEl) titleEl.textContent = PAGE_TITLES[page] || '首页';

    // 关闭移动端抽屉
    closeSidebarMobile();

    // 滚动到顶
    window.scrollTo(0, 0);

    // 更新 URL hash
    if (updateHash !== false && window.location.hash !== '#' + page) {
      window.location.hash = page;
    }
  }

  function getHashPage() {
    var h = (window.location.hash || '').replace('#', '');
    return h || 'home';
  }

  /* 点击导航链接 */
  $all('.side-link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      navigate(a.getAttribute('data-page'));
    });
  });

  /* 侧边栏底部登录按钮 */
  $all('.side-login-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigate('login');
    });
  });

  /* 首页按钮（hash 链接，交给默认行为即可，路由由 hashchange 接管） */

  window.addEventListener('hashchange', function () {
    navigate(getHashPage(), false);
  });

  /* ================= 文章筛选（简单版） ================= */
  var articleCards = $all('#articleGrid .article-card');
  var chipBtns = $all('#tagFilter .chip');
  var catSel = $('#categoryFilter');
  var monthSel = $('#monthFilter');
  var countEl = $('#articleCount');
  var filterState = { q: '', tag: 'all', cat: 'all', month: 'all' };

  function applyArticleFilter() {
    var shown = 0;
    articleCards.forEach(function (card) {
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
    if (countEl) countEl.textContent = shown + ' / ' + articleCards.length + ' 篇文章';
  }

  var searchInput = $('#articleSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterState.q = searchInput.value;
      applyArticleFilter();
    });
  }

  chipBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      chipBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterState.tag = btn.getAttribute('data-tag').toLowerCase();
      applyArticleFilter();
    });
  });

  if (catSel) {
    catSel.addEventListener('change', function () {
      filterState.cat = catSel.value;
      applyArticleFilter();
    });
  }
  if (monthSel) {
    monthSel.addEventListener('change', function () {
      filterState.month = monthSel.value;
      applyArticleFilter();
    });
  }

  /* 点文章卡片内标签也能筛选 */
  $all('#articleGrid .mini-tag').forEach(function (tagEl) {
    tagEl.addEventListener('click', function () {
      var t = tagEl.textContent.trim().toLowerCase();
      var target = chipBtns.filter(function (c) {
        return c.getAttribute('data-tag').toLowerCase() === t;
      })[0];
      if (target) target.click();
    });
  });

  /* ================= 通用演示按钮 Toast ================= */
  $all('[data-toast]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toast(btn.getAttribute('data-toast'), 'success');
    });
  });

  /* ================= 侧边栏折叠 / 移动端抽屉 ================= */
  var sidebar = $('#sidebar');
  var collapseBtn = $('#sidebarCollapse');
  var hamburger = $('#hamburger');
  var backdrop = $('#sidebarBackdrop');

  function applyCollapsed(collapsed) {
    document.body.classList.toggle('side-collapsed', collapsed);
    if (sidebar) sidebar.classList.toggle('collapsed', collapsed);
    if (collapseBtn) {
      var txt = collapseBtn.querySelector('.collapse-text');
      if (txt) txt.textContent = collapsed ? '' : '收起';
    }
  }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = !document.body.classList.contains('side-collapsed');
      applyCollapsed(collapsed);
    });
  }

  function openSidebarMobile() {
    document.body.classList.add('side-open');
    if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  }
  function closeSidebarMobile() {
    document.body.classList.remove('side-open');
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
    try { localStorage.setItem('workbench_theme', theme); } catch (e) {}
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
    try { saved = localStorage.getItem('workbench_theme'); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  /* ================= 计划表：localStorage 编辑 / 新增 / 删除 / 恢复模板 / 复制 ================= */
  var planBody = $('#planBody');
  var planStorageKey = 'workbench_plan_v1';
  var planTemplateHTML = planBody ? planBody.innerHTML : '';

  var TYPE_COLOR = {
    '生活': '#2f7d6d',
    '学习': '#1a73e8',
    '运动': '#e8590c',
    '调整': '#6b7280',
    '项目': '#9333ea'
  };
  var TYPE_ORDER = ['生活', '学习', '运动', '调整', '项目'];

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function buildTypeOptions(selected) {
    return TYPE_ORDER.map(function (t) {
      return '<option value="' + t + '"' + (t === selected ? ' selected' : '') + '>' + t + '</option>';
    }).join('');
  }

  function buildPlanRow(row) {
    var r = row || { time: '', task: '', note: '', type: '生活' };
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
      } catch (e) { /* 存档损坏则回退到静态模板 */ }
    }
    // 无存档：保留静态 HTML 模板，并给每行类型下拉加上彩色标识
    planBody.querySelectorAll('tr').forEach(tintType);
  }

  if (planBody) {
    // 输入即自动保存
    planBody.addEventListener('input', savePlan);
    planBody.addEventListener('change', function (e) {
      var tr = e.target.closest ? e.target.closest('tr') : null;
      if (tr) tintType(tr);
      savePlan();
    });
    // 删除行
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
      planBody.innerHTML = planTemplateHTML;
      planBody.querySelectorAll('tr').forEach(tintType);
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

  /* ================= 初始化 ================= */
  // 主题（深色/浅色，localStorage 记忆）
  initTheme();
  // 计划表（从 localStorage 恢复；无存档则保留静态模板）
  loadPlan();
  // 页面首次加载：从 hash 恢复路由；没 hash 时保持默认首页
  navigate(getHashPage(), false);
  onScroll();
})();
