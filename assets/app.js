(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var projects = window.PROJECTS || [];
  var grid = document.getElementById('project-grid');
  var empty = document.getElementById('grid-empty');
  var home = document.getElementById('home');
  var page = document.getElementById('project-page');
  var body = document.getElementById('project-body');
  var status = document.getElementById('route-status');

  var filters = document.querySelectorAll('.chip');
  var activeFilter = 'all';
  var filtersContainer = document.getElementById('project-filters') || document.querySelector('.filters');
  var filtersIndicator = filtersContainer ? filtersContainer.querySelector('.filters-indicator') : null;

  function updateFiltersIndicator(immediate) {
    if (!filtersContainer || !filtersIndicator) return;
    var current = filtersContainer.querySelector('.chip.is-active');
    if (!current) {
      filtersIndicator.classList.remove('is-ready');
      return;
    }
    if (immediate) {
      filtersIndicator.style.transition = 'none';
    }
    filtersIndicator.style.transform = 'translateX(' + current.offsetLeft + 'px)';
    filtersIndicator.style.width = current.offsetWidth + 'px';
    filtersIndicator.classList.add('is-ready');
    if (immediate) {
      void filtersIndicator.offsetWidth;
      filtersIndicator.style.transition = '';
    }
  }

  var nav = document.getElementById('site-nav');
  var burger = document.querySelector('.nav-burger');
  var navLinks = document.querySelectorAll('.nav-pill a');

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (burger) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains('is-open'));
    });

    document.addEventListener('click', function (e) {
      if (nav && nav.classList.contains('is-open') && !nav.contains(e.target)) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
        setMenu(false);
      }
    });
  }

  var isNavClickScrolling = false;
  var navScrollTimer = null;

  function lockNavObserver(duration) {
    isNavClickScrolling = true;
    if (navScrollTimer) clearTimeout(navScrollTimer);
    navScrollTimer = setTimeout(function () {
      isNavClickScrolling = false;
    }, duration || 900);
  }

  window.addEventListener('wheel', function () {
    if (isNavClickScrolling) {
      isNavClickScrolling = false;
      if (navScrollTimer) clearTimeout(navScrollTimer);
    }
  }, { passive: true });

  window.addEventListener('touchstart', function () {
    if (isNavClickScrolling) {
      isNavClickScrolling = false;
      if (navScrollTimer) clearTimeout(navScrollTimer);
    }
  }, { passive: true });

  var navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', function (e) {
      setMenu(false);
      clearNav();
      lockNavObserver(800);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.hash === '#/' || location.hash === '') {
        e.preventDefault();
      }
    });
  }

  navLinks.forEach(function (a) {
    a.addEventListener('click', function () {
      setMenu(false);
      var href = a.getAttribute('href') || '';
      if (href.startsWith('#') && href.length > 1) {
        var id = href.slice(1);
        lockNavObserver(900);
        markNav(id);
      }
    });
  });

  var navMenu = document.getElementById('nav-menu');
  var navIndicator = navMenu ? navMenu.querySelector('.nav-indicator') : null;
  var currentNavId = null;

  function updateNavIndicator(immediate) {
    if (!navMenu || !navIndicator || window.innerWidth <= 860) return;
    var current = navMenu.querySelector('a.is-current');
    if (!current) {
      navIndicator.classList.remove('is-ready');
      return;
    }
    if (immediate) {
      navIndicator.style.transition = 'none';
    }
    navIndicator.style.transform = 'translateX(' + current.offsetLeft + 'px)';
    navIndicator.style.width = current.offsetWidth + 'px';
    navIndicator.classList.add('is-ready');
    if (immediate) {
      void navIndicator.offsetWidth;
      navIndicator.style.transition = '';
    }
  }

  function clearNav() {
    if (currentNavId === null) return;
    currentNavId = null;
    navLinks.forEach(function (a) {
      a.classList.remove('is-current');
    });
    updateNavIndicator();
  }

  function markNav(id, immediate) {
    if (!id || id === 'home' || id === 'hero') {
      clearNav();
      return;
    }
    var matched = false;
    navLinks.forEach(function (a) {
      var isTarget = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-current', isTarget);
      if (isTarget) matched = true;
    });
    if (matched) {
      if (currentNavId !== id || immediate) {
        currentNavId = id;
        updateNavIndicator(immediate);
      }
    } else {
      clearNav();
    }
  }

  window.addEventListener('resize', function () {
    updateNavIndicator(true);
    updateFiltersIndicator(true);
  }, { passive: true });

  // Scroll listener for fixed navigation shadow
  function handleScroll() {
    if (nav) {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    }
    if (!isNavClickScrolling && page.hidden) {
      var works = document.getElementById('works');
      if (works) {
        var worksRect = works.getBoundingClientRect();
        if (worksRect.top > window.innerHeight * 0.45 || window.scrollY < 60) {
          clearNav();
        }
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active menu link on scroll using IntersectionObserver
  var navObserver = null;
  function initNavObserver() {
    if (!('IntersectionObserver' in window)) return;
    var sectionIds = ['works', 'services', 'about', 'contact'];
    var sections = sectionIds.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    navObserver = new IntersectionObserver(function (entries) {
      if (isNavClickScrolling) return;
      if (!page.hidden) {
        markNav('works');
        return;
      }
      var works = document.getElementById('works');
      if (works && (works.getBoundingClientRect().top > window.innerHeight * 0.45 || window.scrollY < 60)) {
        clearNav();
        return;
      }
      var intersecting = entries.filter(function (e) { return e.isIntersecting; });
      if (intersecting.length > 0) {
        intersecting.sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        markNav(intersecting[0].target.id);
      }
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (sec) {
      navObserver.observe(sec);
    });
  }

  // Scroll reveal IntersectionObserver
  var revealObserver = null;
  function initReveal() {
    document.querySelectorAll('.steps li').forEach(function (li, idx) {
      li.style.setProperty('--i', idx);
    });

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    }

    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Soft cursor-following glow on cards (works, services, process steps)
  function initCardGlow() {
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
    var cards = document.querySelectorAll('.card, .service, .steps li');
    cards.forEach(function (card) {
      if (card._hasGlow) return;
      card._hasGlow = true;
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left).toFixed(1) + 'px';
        var y = (e.clientY - rect.top).toFixed(1) + 'px';
        card.style.setProperty('--mx', x);
        card.style.setProperty('--my', y);
      }, { passive: true });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--mx', '-999px');
        card.style.setProperty('--my', '-999px');
      }, { passive: true });
    });
  }

  // Desktop hero parallax
  function initHeroParallax() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    var hero = document.querySelector('.hero');
    var photo = document.querySelector('.ambient-hero') || document.querySelector('.hero-photo');
    if (!hero || !photo) return;

    var ticking = false;
    var px = 0;
    var py = 0;

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      px = ((x - 0.5) * 24).toFixed(2);
      py = ((y - 0.5) * 24).toFixed(2);

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          photo.style.setProperty('--px', px + 'px');
          photo.style.setProperty('--py', py + 'px');
          ticking = false;
        });
      }
    }, { passive: true });

    hero.addEventListener('mouseleave', function () {
      photo.style.setProperty('--px', '0px');
      photo.style.setProperty('--py', '0px');
    });
  }

  // Hero numbers animation (6 and 4)
  function animateHeroStats() {
    var statEls = document.querySelectorAll('.hero-stats .stat-num');
    var targets = [];
    statEls.forEach(function (el) {
      var val = parseInt(el.textContent.trim(), 10);
      if (!isNaN(val)) {
        targets.push({ el: el, target: val });
      }
    });
    if (!targets.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var statsContainer = document.querySelector('.hero-stats');
    if (!statsContainer) return;

    var started = false;
    function startCount() {
      if (started) return;
      started = true;
      targets.forEach(function (t) { t.el.textContent = '0'; });
      var startTime = null;
      var duration = 1200;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(1, elapsed / duration);
        var ease = 1 - Math.pow(1 - progress, 2);
        targets.forEach(function (t) {
          var current = Math.round(t.target * ease);
          t.el.textContent = String(current);
        });
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          targets.forEach(function (t) { t.el.textContent = String(t.target); });
        }
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startCount();
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      obs.observe(statsContainer);
    } else {
      startCount();
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function cardHtml(p, i, entering) {
    var stack = p.stack.slice(0, 4).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    var cls = 'card ' + (entering ? 'is-entering' : 'reveal');
    var thumb = p.image
      ? '<div class="card-thumb"><img src="' + esc(p.image) + '" alt="Скриншот проекта ' + esc(p.title) + '" loading="lazy"></div>'
      : '';
    return '<li class="' + cls + '" style="--i:' + i + '">' +
      '<div class="card-top"><span class="kind">' + esc(p.kind) + '</span><span class="num">' + pad(i + 1) + '</span></div>' +
      thumb +
      '<h3><a href="#/work/' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
      '<p>' + esc(p.summary) + '</p>' +
      '<ul class="stack">' + stack + '</ul>' +
      '<span class="card-cta" aria-hidden="true">Смотреть проект <span>→</span></span>' +
      '</li>';
  }

  var filterSwitchTimer = null;
  function renderGrid(animate) {
    var list = projects.filter(function (p) {
      return activeFilter === 'all' || p.kind === activeFilter;
    });

    if (filterSwitchTimer) {
      clearTimeout(filterSwitchTimer);
      filterSwitchTimer = null;
    }

    if (animate && grid && grid.children.length > 0) {
      grid.classList.add('is-switching');
      filterSwitchTimer = setTimeout(function () {
        grid.innerHTML = list.map(function (p, i) {
          return cardHtml(p, i, true);
        }).join('');
        empty.hidden = list.length > 0;
        initCardGlow();
        grid.classList.remove('is-switching');
        filterSwitchTimer = null;
      }, 90);
    } else {
      if (grid) {
        grid.classList.remove('is-switching');
        grid.innerHTML = list.map(function (p, i) {
          return cardHtml(p, i, animate ? true : false);
        }).join('');
      }
      empty.hidden = list.length > 0;
      initCardGlow();
      if (!animate) {
        initReveal();
      }
    }
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.card');
      if (!card) return;
      var link = card.querySelector('h3 a');
      if (link && !e.target.closest('a')) {
        link.click();
      }
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeFilter = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      updateFiltersIndicator(false);
      renderGrid(true);
    });
  });

  function projectHtml(p, index) {
    var prev = projects[(index - 1 + projects.length) % projects.length];
    var next = projects[(index + 1) % projects.length];
    var features = p.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('');
    var tech = p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    var links = p.links.map(function (l, i) {
      var cls = i === 0 ? 'btn btn-primary' : 'btn btn-ghost';
      return '<a class="' + cls + '" href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + '</a>';
    }).join('');

    var galleryHtml = '';
    if (p.gallery && p.gallery.length > 0) {
      var items = p.gallery.map(function (src, gIdx) {
        return '<figure class="gallery-item">' +
          '<img src="' + esc(src) + '" alt="Скриншот ' + (gIdx + 1) + ' — ' + esc(p.title) + '" decoding="async">' +
        '</figure>';
      }).join('');
      galleryHtml = '<div class="project-section project-gallery-section">' +
        '<h2>Скриншоты и материалы</h2>' +
        '<div class="project-gallery">' + items + '</div>' +
      '</div>';
    }

    return '<div class="project-head"><span class="kind">' + esc(p.kind) + '</span><span class="num">' + pad(index + 1) + ' / ' + pad(projects.length) + '</span></div>' +
      '<h1 id="project-title" tabindex="-1">' + esc(p.title) + '</h1>' +
      '<p class="project-lead">' + esc(p.lead) + '</p>' +
      '<div class="project-links">' + links + '</div>' +
      galleryHtml +
      '<div class="project-section"><h2>Что внутри</h2><ul class="feature-list">' + features + '</ul></div>' +
      '<div class="project-section"><h2>Как это сделано</h2><p>' + esc(p.detail) + '</p></div>' +
      '<div class="project-section"><h2>Стек</h2><ul class="tech">' + tech + '</ul></div>' +
      '<nav class="project-nav" aria-label="Другие работы">' +
        '<a href="#/work/' + esc(prev.slug) + '"><span class="label">Предыдущая</span>← ' + esc(prev.title) + '</a>' +
        '<a href="#/work/' + esc(next.slug) + '" style="text-align:right"><span class="label">Следующая</span>' + esc(next.title) + ' →</a>' +
      '</nav>';
  }

  function showHome() {
    home.hidden = false;
    page.hidden = true;
    document.title = 'Inexc — портфолио: сайты, боты, игры, Mini Apps';
  }

  function showProject(slug) {
    var index = -1;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].slug === slug) { index = i; break; }
    }
    home.hidden = true;
    page.hidden = false;
    markNav('works');

    // Retrigger entrance animation
    page.style.animation = 'none';
    void page.offsetHeight;
    page.style.animation = '';

    if (index === -1) {
      body.innerHTML = '<h1 class="notfound" id="project-title" tabindex="-1">Проект не найден</h1>' +
        '<p class="notfound">Такой работы нет в портфолио. <a href="#works">Вернуться к списку работ</a>.</p>';
      document.title = 'Проект не найден — Inexc';
      if (status) status.textContent = 'Проект не найден';
    } else {
      body.innerHTML = projectHtml(projects[index], index);
      document.title = projects[index].title + ' — проект Inexc';
      if (status) status.textContent = 'Открыт проект: ' + projects[index].title;
    }
    var h = document.getElementById('project-title');
    if (h) h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  function route() {
    var hash = location.hash || '#/';
    var m = hash.match(/^#\/work\/([a-z0-9-]+)$/i);
    if (m) {
      showProject(m[1].toLowerCase());
      return;
    }
    var leavingProject = !page.hidden;
    showHome();
    initReveal();
    var sectionIds = ['works', 'services', 'about', 'contact'];
    var id = hash.slice(1);
    if (sectionIds.indexOf(id) !== -1) {
      var target = document.getElementById(id);
      if (target) {
        lockNavObserver(900);
        markNav(id);
        target.scrollIntoView({ block: 'start' });
        if (leavingProject) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
      if (status) status.textContent = 'Открыт раздел страницы';
    } else {
      clearNav();
      window.scrollTo(0, 0);
      if (status) status.textContent = 'Главная страница';
    }
  }

  window.addEventListener('hashchange', route);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !page.hidden) {
      location.hash = '#works';
    }
  });

  // Continuous ambient background crossfader
  function initAmbientBackground() {
    var backdrop = document.querySelector('.ambient-backdrop');
    if (!backdrop) return;

    var layers = {
      hero: backdrop.querySelector('.ambient-hero'),
      works: backdrop.querySelector('.ambient-works'),
      services: backdrop.querySelector('.ambient-services'),
      about: backdrop.querySelector('.ambient-about'),
      contact: backdrop.querySelector('.ambient-contact')
    };

    var sectionIds = ['hero', 'works', 'services', 'about', 'contact'];
    var sectionEls = sectionIds.map(function (id) {
      return document.getElementById(id) || document.querySelector('.' + id);
    });

    var ticking = false;

    function updateBackdrop() {
      ticking = false;
      var homeEl = document.getElementById('home');
      if (homeEl && homeEl.hidden) return;

      var scrollY = window.scrollY || window.pageYOffset || 0;
      var vMid = scrollY + window.innerHeight * 0.5;

      var bounds = [];
      for (var i = 0; i < sectionEls.length; i++) {
        var el = sectionEls[i];
        if (!el) continue;
        var r = el.getBoundingClientRect();
        var top = r.top + scrollY;
        var h = r.height;
        bounds.push({
          id: sectionIds[i],
          top: top,
          bottom: top + h
        });
      }

      if (bounds.length < 5) return;

      // Section top boundaries
      var B = [
        bounds[1].top, // works top
        bounds[2].top, // services top
        bounds[3].top, // about top
        bounds[4].top  // contact top
      ];

      // Smooth transition zone around each boundary
      var zone = Math.min(360, window.innerHeight * 0.45);

      var opacities = { hero: 0, works: 0, services: 0, about: 0, contact: 0 };

      if (vMid < B[0] - zone) {
        opacities.hero = 1;
      } else if (vMid <= B[0] + zone) {
        var t = (vMid - (B[0] - zone)) / (2 * zone);
        var ease = t * t * (3 - 2 * t);
        opacities.hero = 1 - ease;
        opacities.works = ease;
      } else if (vMid < B[1] - zone) {
        opacities.works = 1;
      } else if (vMid <= B[1] + zone) {
        var t = (vMid - (B[1] - zone)) / (2 * zone);
        var ease = t * t * (3 - 2 * t);
        opacities.works = 1 - ease;
        opacities.services = ease;
      } else if (vMid < B[2] - zone) {
        opacities.services = 1;
      } else if (vMid <= B[2] + zone) {
        var t = (vMid - (B[2] - zone)) / (2 * zone);
        var ease = t * t * (3 - 2 * t);
        opacities.services = 1 - ease;
        opacities.about = ease;
      } else if (vMid < B[3] - zone) {
        opacities.about = 1;
      } else if (vMid <= B[3] + zone) {
        var t = (vMid - (B[3] - zone)) / (2 * zone);
        var ease = t * t * (3 - 2 * t);
        opacities.about = 1 - ease;
        opacities.contact = ease;
      } else {
        opacities.contact = 1;
      }

      for (var k in layers) {
        var layer = layers[k];
        if (!layer) continue;
        var val = opacities[k];
        if (val > 0.005) {
          layer.style.opacity = val.toFixed(3);
          layer.classList.add('is-active');
        } else {
          layer.style.opacity = '0';
          layer.classList.remove('is-active');
        }
      }
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBackdrop);
      }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    updateBackdrop();
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initNavObserver();
  initAmbientBackground();
  initHeroParallax();
  animateHeroStats();
  renderGrid();
  initCardGlow();
  route();
  updateNavIndicator(true);
  updateFiltersIndicator(true);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      updateNavIndicator(true);
      updateFiltersIndicator(true);
    });
  } else {
    updateNavIndicator(true);
    updateFiltersIndicator(true);
  }
})();
