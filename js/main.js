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

  /* ================= 初始化 ================= */
  // 页面首次加载：从 hash 恢复路由；没 hash 时保持默认首页
  navigate(getHashPage(), false);
  onScroll();
})();
