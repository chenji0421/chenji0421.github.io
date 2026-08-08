/* ============================================================
   chenji0421.github.io · 个人学习工作台交互脚本
   功能：hash 路由 / 菜单高亮 / 深浅主题 / 文章搜索筛选 /
        计划表 localStorage 编辑 / 返回顶部 / toast / 侧边栏折叠
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 工具函数 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var STORE_KEYS = {
    theme: 'workbench_theme',
    plan: 'workbench_plan_v1',
    sidebar: 'workbench_sidebar'
  };

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); return true; } catch (e) { return false; }
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* 忽略 */ }
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
    }, 2600);
  }

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

  /* ================= 1. 渲染静态区块 ================= */

  /* 首页统计卡 + 最近在做的事（HTML 已内置，无需渲染） */

  /* 文章页：筛选 chips */
  function renderFilters() {
    function buildChips(containerId, items, activeVal) {
      var box = $('#' + containerId);
      if (!box) return;
      box.innerHTML = items.map(function (item) {
        var cls = item === activeVal ? 'chip active' : 'chip';
        return '<button class="' + cls + '" data-fval="' + item + '">' + item + '</button>';
      }).join('');
    }
    buildChips('tagFilters', FILTER_TAGS, '全部');
    buildChips('categoryFilters', FILTER_CATEGORIES, '全部分类');
    buildChips('monthFilters', FILTER_MONTHS, '全部月份');
  }

  /* 当前筛选状态 */
  var filterState = { tag: '全部', category: '全部分类', month: '全部月份', keyword: '' };

  /* 判断文章是否匹配当前筛选 */
  function matchFilter(post) {
    if (filterState.tag !== '全部' && post.tags.indexOf(filterState.tag) === -1) return false;
    if (filterState.category !== '全部分类' && post.category !== filterState.category) return false;
    if (filterState.month !== '全部月份' && post.month !== filterState.month) return false;
    if (filterState.keyword) {
      var kw = filterState.keyword.toLowerCase();
      var hay = (post.title + ' ' + post.summary + ' ' + post.tags.join(' ')).toLowerCase();
      if (hay.indexOf(kw) === -1) return false;
    }
    return true;
  }

  /* 渲染文章卡片 */
  function renderArticles() {
    var grid = $('#articlesGrid');
    var empty = $('#articlesEmpty');
    if (!grid) return;
    var matched = POSTS.filter(matchFilter);
    grid.innerHTML = matched.map(function (post) {
      var tags = post.tags.map(function (t) {
        return '<button class="chip" data-tag-click="' + t + '">' + t + '</button>';
      }).join('');
      return '' +
        '<article class="article-card">' +
          '<div class="article-meta">' +
            '<span class="article-cat">' + post.category + '</span>' +
            '<span>' + post.date + '</span>' +
            '<span>' + post.readTime + '</span>' +
            '<span>👁 ' + post.views + '</span>' +
          '</div>' +
          '<h3 class="article-title">' + post.title + '</h3>' +
          '<p class="article-summary">' + post.summary + '</p>' +
          '<div class="article-tags">' + tags + '</div>' +
        '</article>';
    }).join('');
    if (empty) empty.hidden = matched.length > 0;
  }

  /* 渲染热门文章（按阅读量排序，取前 5） */
  function renderHot() {
    var list = $('#hotList');
    if (!list) return;
    var hot = POSTS.slice().sort(function (a, b) { return b.views - a.views; }).slice(0, 5);
    list.innerHTML = hot.map(function (post) {
      return '<li>' +
        '<span>' + post.title + '</span>' +
        '<span class="hot-rank">👁 ' + post.views + ' 次阅读</span>' +
      '</li>';
    }).join('');
  }

  /* 项目页：分组渲染 */
  function renderProjects() {
    var wrap = $('#projectGroups');
    if (!wrap) return;
    wrap.innerHTML = PROJECT_GROUPS.map(function (group) {
      var cards = group.projects.map(function (p) {
        var tags = p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
        return '' +
          '<div class="project-card">' +
            '<div class="project-card-top">' +
              '<h4 class="project-name">' + p.name + '</h4>' +
              '<span class="status-badge ' + p.statusClass + '">' + p.status + '</span>' +
            '</div>' +
            '<p class="project-desc">' + p.desc + '</p>' +
            '<div class="project-tags">' + tags + '</div>' +
            '<div class="project-btns">' +
              '<button class="p-btn" data-proj-name="' + p.name + '" data-action="detail">查看详情</button>' +
              '<button class="p-btn" data-action="repo">查看仓库</button>' +
              '<button class="p-btn" data-action="note">记录笔记</button>' +
            '</div>' +
          '</div>';
      }).join('');
      return '' +
        '<div class="project-group">' +
          '<h3>' + group.title + ' <span class="group-badge ' + group.badgeClass + '">' + group.projects.length + '</span></h3>' +
          '<div class="project-cards">' + cards + '</div>' +
        '</div>';
    }).join('');
  }

  /* 关于页：关注方向 / 技能 / 时间线 */
  function renderAbout() {
    var focusBox = $('#focusList');
    if (focusBox) {
      focusBox.innerHTML = FOCUS_ITEMS.map(function (item) {
        return '<li><span class="focus-dot">◆</span>' + item + '</li>';
      }).join('');
    }

    var skillBox = $('#skillBars');
    if (skillBox) {
      skillBox.innerHTML = SKILLS.map(function (s) {
        return '' +
          '<div class="skill-bar">' +
            '<div class="skill-bar-head"><span>' + s.name + '</span><span class="skill-pct" data-pct="' + s.pct + '">0%</span></div>' +
            '<div class="skill-track"><div class="skill-fill" data-w="' + s.pct + '"></div></div>' +
          '</div>';
      }).join('');
    }

    var tlBox = $('#aboutTimeline');
    if (tlBox) {
      tlBox.innerHTML = ABOUT_TIMELINE.map(function (item) {
        return '' +
          '<div class="tl-item">' +
            '<div class="tl-date">' + item.date + '</div>' +
            '<div class="tl-title">' + item.title + '</div>' +
            '<div class="tl-desc">' + item.desc + '</div>' +
          '</div>';
      }).join('');
    }
  }

  /* 计划页：读取本地计划（无则用模板） */
  function getPlanRows() {
    var raw = safeGet(STORE_KEYS.plan);
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) { /* 损坏则用模板 */ }
    }
    return PLAN_TEMPLATE.map(function (r) { return { time: r.time, task: r.task, note: r.note, type: r.type }; });
  }

  /* 渲染计划表格 */
  function renderPlanTable() {
    var tbody = $('#planTbody');
    if (!tbody) return;
    var rows = getPlanRows();
    tbody.innerHTML = rows.map(function (row, i) {
      return '' +
        '<tr data-row="' + i + '">' +
          '<td><input class="cell-input" data-field="time" value="' + row.time + '" aria-label="时间段" /></td>' +
          '<td><input class="cell-input" data-field="task" value="' + row.task + '" aria-label="要做什么" /></td>' +
          '<td><input class="cell-input" data-field="note" value="' + row.note + '" aria-label="重点说明" /></td>' +
          '<td><span class="type-badge type-' + row.type + '">' + row.type + '</span></td>' +
          '<td><button class="del-row-btn" data-del="' + i + '" title="删除这一行">✕</button></td>' +
        '</tr>';
    }).join('');
  }

  function collectPlanRows() {
    var tbody = $('#planTbody');
    if (!tbody) return [];
    return $all('tr[data-row]', tbody).map(function (tr) {
      return {
        time: $('.cell-input[data-field="time"]', tr).value,
        task: $('.cell-input[data-field="task"]', tr).value,
        note: $('.cell-input[data-field="note"]', tr).value,
        type: $('.type-badge', tr).textContent
      };
    });
  }

  function savePlan(silent) {
    var rows = collectPlanRows();
    var ok = safeSet(STORE_KEYS.plan, JSON.stringify(rows));
    var hint = $('#planSaveHint');
    if (hint) hint.textContent = '已保存 · ' + new Date().toLocaleTimeString();
    if (!silent) toast(ok ? '计划已保存到本地 ✅' : '保存失败（浏览器不允许存储）', ok ? 'success' : 'error');
  }

  /* ================= 2. 主题 ================= */
  var root = document.documentElement;
  var themeBtn = $('#themeToggle');
  var themeBtn2 = $('#themeToggle2');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0f1b2d' : '#f3f5f9');
    var label = theme === 'dark' ? '🌙 夜间' : '☀️ 日间';
    if (themeBtn) themeBtn.textContent = label;
    if (themeBtn2) themeBtn2.textContent = '🌓 日间/夜间';
    if (persist !== false) safeSet(STORE_KEYS.theme, theme);
  }

  function initTheme() {
    var saved = safeGet(STORE_KEYS.theme);
    var dark = saved ? saved === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(dark ? 'dark' : 'light', false);
  }

  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    toast(next === 'dark' ? '已切换到深色模式 🌙' : '已切换到浅色模式 ☀️');
  }

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeBtn2) themeBtn2.addEventListener('click', toggleTheme);

  /* ================= 3. Hash 路由 ================= */
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

  window.addEventListener('hashchange', function () {
    navigate(getHashPage(), false);
  });

  /* ================= 4. 侧边栏折叠 / 移动端抽屉 ================= */
  var sidebar = $('#sidebar');
  var collapseBtn = $('#sidebarCollapse');
  var hamburger = $('#hamburger');
  var backdrop = $('#sidebarBackdrop');

  function applyCollapsed(collapsed) {
    document.body.classList.toggle('side-collapsed', collapsed);
    if (sidebar) sidebar.classList.toggle('collapsed', collapsed);
    if (collapseBtn) collapseBtn.querySelector('.collapse-text').textContent = collapsed ? '' : '收起';
    safeSet(STORE_KEYS.sidebar, collapsed ? '1' : '0');
  }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = !document.body.classList.contains('side-collapsed');
      applyCollapsed(collapsed);
      toast(collapsed ? '侧边栏已折叠' : '侧边栏已展开');
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
  function toggleSidebarMobile() {
    var open = document.body.classList.contains('side-open');
    if (open) closeSidebarMobile(); else openSidebarMobile();
  }

  if (hamburger) hamburger.addEventListener('click', toggleSidebarMobile);
  if (backdrop) backdrop.addEventListener('click', closeSidebarMobile);

  // 桌面初始折叠状态恢复
  var savedCollapsed = safeGet(STORE_KEYS.sidebar);
  if (savedCollapsed === '1' && window.innerWidth > 860) {
    applyCollapsed(true);
  }

  // 缩放到桌面时恢复折叠态
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) {
      closeSidebarMobile();
      var collapsed = safeGet(STORE_KEYS.sidebar) === '1';
      applyCollapsed(collapsed);
    }
  });

  /* ================= 5. 文章筛选交互 ================= */
  function bindFilterClicks() {
    // 标签筛选 chips
    $('#tagFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      $all('#tagFilters .chip').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      filterState.tag = btn.getAttribute('data-fval');
      renderArticles();
    });

    $('#categoryFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      $all('#categoryFilters .chip').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      filterState.category = btn.getAttribute('data-fval');
      renderArticles();
    });

    $('#monthFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      $all('#monthFilters .chip').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      filterState.month = btn.getAttribute('data-fval');
      renderArticles();
    });

    // 文章卡片内的标签点击 → 切换标签筛选
    $('#articlesGrid').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-tag-click]');
      if (!btn) return;
      filterState.tag = btn.getAttribute('data-tag-click');
      $all('#tagFilters .chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-fval') === filterState.tag);
      });
      renderArticles();
    });

    // 搜索框（输入防抖）
    var input = $('#searchInput');
    if (input) {
      var debounce = null;
      input.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          filterState.keyword = input.value.trim();
          renderArticles();
        }, 180);
      });
    }

    // 清空筛选
    var resetBtn = $('#resetFilterBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        filterState = { tag: '全部', category: '全部分类', month: '全部月份', keyword: '' };
        var inputEl = $('#searchInput');
        if (inputEl) inputEl.value = '';
        renderFilters();
        renderArticles();
      });
    }
  }

  /* ================= 6. 计划页交互 ================= */
  function bindPlan() {
    var tbody = $('#planTbody');
    var resetBtn = $('#resetPlan');
    var saveBtn = $('#savePlan');
    var copyBtn = $('#copyPlan');
    var addBtn = $('#addRow');

    // 单元格编辑：输入后自动保存
    if (tbody) {
      tbody.addEventListener('input', function () {
        savePlan(true);
      });
      tbody.addEventListener('click', function (e) {
        var del = e.target.closest('[data-del]');
        if (!del) return;
        var rows = collectPlanRows();
        rows.splice(parseInt(del.getAttribute('data-del'), 10), 1);
        safeSet(STORE_KEYS.plan, JSON.stringify(rows));
        renderPlanTable();
        savePlan(true);
        toast('已删除该时间段');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        safeRemove(STORE_KEYS.plan);
        renderPlanTable();
        toast('已恢复默认计划模板 ♻️');
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', function () { savePlan(false); });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var rows = collectPlanRows();
        var text = 'Chenji 阶段冲刺计划\n===================\n' + rows.map(function (r, i) {
          return (i + 1) + '. [' + r.type + '] ' + r.time + ' · ' + r.task + '（' + r.note + '）';
        }).join('\n');
        var done = false;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            toast('计划已复制到剪贴板 📋', 'success');
          }).catch(function () { fallbackCopy(text); });
        } else {
          fallbackCopy(text);
        }
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var rows = collectPlanRows();
        rows.push({ time: '00:00 - 00:00', task: '新的时间段', note: '填写说明', type: '学习' });
        safeSet(STORE_KEYS.plan, JSON.stringify(rows));
        renderPlanTable();
        toast('已新增时间段，可编辑内容');
      });
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('计划已复制到剪贴板 📋', 'success'); }
    catch (e) { toast('复制失败，请手动复制', 'error'); }
    document.body.removeChild(ta);
  }

  /* ================= 7. 游戏页交互 ================= */
  function bindGames() {
    var stage = $('#gameStage');
    var reloadBtn = $('#reloadGame');
    var openBtn = $('#openGame');

    if (reloadBtn) {
      reloadBtn.addEventListener('click', function () {
        // 模拟刷新（真实游戏接入后可替换为 reload iframe）
        toast('游戏区域刷新中（当前为占位状态）');
      });
    }
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        toast('暂未接入真实游戏地址，无法新窗口打开');
      });
    }
  }

  /* ================= 8. 项目页按钮 ================= */
  function bindProjects() {
    var wrap = $('#projectGroups');
    if (!wrap) return;
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.p-btn');
      if (!btn) return;
      var action = btn.getAttribute('data-action');
      var name = btn.getAttribute('data-proj-name') || '';
      if (action === 'detail') {
        toast('「' + name + '」详情：当前为静态演示，详情页开发中');
      } else if (action === 'repo') {
        window.open('https://github.com/chenji0421', '_blank');
      } else if (action === 'note') {
        toast('已打开笔记面板（演示）——可在计划页记录');
      }
    });
  }

  /* ================= 9. 登录页（静态演示） ================= */
  function bindLogin() {
    var ghBtn = $('#ghLogin');
    var submitBtn = $('#loginSubmit');

    if (ghBtn) {
      ghBtn.addEventListener('click', function () {
        toast('这是静态演示，暂未接入真实登录系统。', 'success');
      });
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        toast('这是静态演示，暂未接入真实登录系统。');
      });
    }
  }

  /* ================= 10. 返回顶部 ================= */
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

  /* ================= 11. 技能条动画（关于页） ================= */
  function animateSkills() {
    var fills = $all('.skill-fill');
    if (!fills.length || !('IntersectionObserver' in window)) {
      fills.forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
      $all('.skill-pct').forEach(function (p) { p.textContent = p.getAttribute('data-pct') + '%'; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var fill = entry.target;
        var w = parseInt(fill.getAttribute('data-w'), 10) || 0;
        fill.style.width = w + '%';
        var head = fill.closest('.skill-bar');
        var pctEl = head && head.querySelector('.skill-pct');
        if (pctEl) {
          var cur = 0;
          var step = Math.max(1, Math.round(w / 30));
          var timer = setInterval(function () {
            cur += step;
            if (cur >= w) { cur = w; clearInterval(timer); }
            pctEl.textContent = cur + '%';
          }, 28);
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    fills.forEach(function (f) { io.observe(f); });
  }

  /* ================= 12. 年份 ================= */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ================= 初始化 ================= */
  function init() {
    initTheme();

    // 渲染数据区块
    renderFilters();
    renderArticles();
    renderHot();
    renderProjects();
    renderAbout();
    renderPlanTable();
    animateSkills();

    // 绑定交互
    bindFilterClicks();
    bindPlan();
    bindGames();
    bindProjects();
    bindLogin();

    // 路由
    navigate(getHashPage(), false);
    onScroll();
  }

  // 等 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
