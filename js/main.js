/* ==========================================================================
   Abhishek Babariya — Portfolio JS (vanilla port of React version)
   Ported behaviours: cursor glow, threat feed cycling, matrix canvas,
   nav scroll + toggle + scrollspy, cyber-card mouse tracking, count-up
   stats, contact form (localStorage), current year in footer.
   ========================================================================== */

const THREAT_FEED = [
  { time: "10:42:07", severity: "HIGH", msg: "T1059.001 · PowerShell obfuscation detected on WKST-142" },
  { time: "10:41:22", severity: "MED",  msg: "Multiple 4625 failures from 45.61.**.** — brute-force pattern" },
  { time: "10:39:58", severity: "LOW",  msg: "Sysmon Event 1 · rundll32 spawned from Word.exe" },
  { time: "10:37:11", severity: "HIGH", msg: "KQL match · SecurityEvent EventID 4672 rare admin logon" },
  { time: "10:35:03", severity: "MED",  msg: "MDE alert · LSASS access via non-signed binary" },
  { time: "10:33:44", severity: "LOW",  msg: "AbuseIPDB score 92 · 194.169.**.** blocked at edge" },
  { time: "10:30:19", severity: "HIGH", msg: "Wazuh rule 100003 · scheduled task persistence (T1053.005)" },
];

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initCursorGlow();
  initNavScroll();
  initNavToggle();
  initScrollSpy();
  initMatrixCanvas();
  initThreatFeed();
  initCyberCards();
  initCountUp();
  initContactForm();
});

/* -------------------------------------------------------------------------- */
/*   Footer year                                                              */
/* -------------------------------------------------------------------------- */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* -------------------------------------------------------------------------- */
/*   Cursor glow (desktop only)                                               */
/* -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    glow.style.display = 'none';
    return;
  }
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* -------------------------------------------------------------------------- */
/*   Nav scroll shadow                                                        */
/* -------------------------------------------------------------------------- */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* -------------------------------------------------------------------------- */
/*   Mobile nav toggle                                                        */
/* -------------------------------------------------------------------------- */
function initNavToggle() {
  const btn   = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    links.classList.remove('open');
  }));
}

/* -------------------------------------------------------------------------- */
/*   Scroll spy — highlights active section in nav                            */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
  const links = [...document.querySelectorAll('#navLinks a[href^="#"]')];
  if (!links.length) return;
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
}

/* -------------------------------------------------------------------------- */
/*   Matrix rain canvas (CyberBackground.jsx port)                            */
/* -------------------------------------------------------------------------- */
function initMatrixCanvas() {
  const wrap = document.getElementById('matrixBg');
  if (!wrap) return;
  const canvas = wrap.querySelector('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const glyphSize = 14;
  const density = 0.6;
  const glyphs = "01AB<>{}#$%&/=?[]|+-*_ATTCKMITREKQLSIEMEDRDFIR".split('');
  let cols, drops, raf;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.floor(w / glyphSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * (h / glyphSize));
  };
  resize();
  window.addEventListener('resize', resize);

  const step = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.fillStyle = 'rgba(10,10,11,0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${glyphSize}px 'JetBrains Mono', monospace`;
    for (let i = 0; i < cols; i++) {
      if (Math.random() > density) { drops[i] += 1; continue; }
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const y = drops[i] * glyphSize;
      const alpha = 0.15 + Math.random() * 0.35;
      ctx.fillStyle = `rgba(245,181,71,${alpha})`;
      ctx.fillText(ch, i * glyphSize, y);
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
    raf = requestAnimationFrame(step);
  };
  step();
}

/* -------------------------------------------------------------------------- */
/*   Live threat feed cycling (2.2s interval)                                 */
/* -------------------------------------------------------------------------- */
function initThreatFeed() {
  const body = document.getElementById('threatBody');
  if (!body) return;

  let idx = 0;
  const render = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const t = THREAT_FEED[(idx + i) % THREAT_FEED.length];
      const op = (1 - i * 0.25).toFixed(2);
      rows.push(`
        <div class="row" style="opacity:${op}">
          <span class="t">${t.time}</span>
          <span class="sev ${t.severity}">${t.severity}</span>
          <span class="m">${t.msg}</span>
        </div>
      `);
    }
    body.innerHTML = `<div class="scan-line"></div>` + rows.join('');
  };
  render();
  setInterval(() => { idx = (idx + 1) % THREAT_FEED.length; render(); }, 2200);
}

/* -------------------------------------------------------------------------- */
/*   Cyber-card mouse tracking (glow follows cursor)                          */
/* -------------------------------------------------------------------------- */
function initCyberCards() {
  document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    });
  });
}

/* -------------------------------------------------------------------------- */
/*   Count-up stats (About section)                                           */
/* -------------------------------------------------------------------------- */
function initCountUp() {
  const els = document.querySelectorAll('[data-countup]');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.textContent = el.dataset.countup);
    return;
  }
  const duration = 1400;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const target = el.dataset.countup;
      const num = parseFloat(target);
      if (isNaN(num)) { el.textContent = target; return; }
      const isFloat = target.includes('.');
      const suffix = target.replace(/[0-9.]/g, '');
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = num * eased;
        el.textContent = (isFloat ? cur.toFixed(2) : Math.round(cur)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

/* -------------------------------------------------------------------------- */
/*   Contact form — saves to localStorage (React version behaviour)           */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  const labelDefault = btn ? btn.innerHTML : '';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name  = (data.get('name')  || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const msg   = (data.get('msg')   || '').toString().trim();
    if (!name || !email || !msg) return;
    try {
      const saved = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      saved.push({ name, email, msg, at: new Date().toISOString() });
      localStorage.setItem('contact_messages', JSON.stringify(saved));
    } catch (_) {}
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fas fa-check"></i> Message queued — I'll respond within 24h`;
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = labelDefault;
        form.reset();
      }, 2600);
    } else {
      form.reset();
    }
  });
}
