/* ==========================================================================
   Abhishek Babariya — Portfolio JS
   Enhanced pass: EmailJS contact form, typewriter role rotator, back-to-top,
   reading progress, command palette (Ctrl/Cmd + K), toasts, existing
   cursor glow / threat feed / matrix / scrollspy / count-up.
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

const ROLES = [
  "SOC Analyst",
  "Threat Hunter",
  "Digital Forensics · DFIR",
  "Detection Engineer",
  "SIEM Engineer",
  "Cloud Security",
];

const REDUCE_MOTION = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  initTypewriter();
  initBackToTop();
  initReadingProgress();
  initCommandPalette();
  initReveal();
  initTilt();
  initHeroParallax();
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
    const open = btn.classList.toggle('open');
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
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
/*   Matrix rain canvas                                                       */
/* -------------------------------------------------------------------------- */
function initMatrixCanvas() {
  const wrap = document.getElementById('matrixBg');
  if (!wrap) return;
  if (REDUCE_MOTION()) { wrap.style.display = 'none'; return; }
  const canvas = wrap.querySelector('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const glyphSize = 16;
  const density = 0.55;
  const glyphs = "01AB<>{}#$%&/=?[]|+-*_ATTCKMITREKQLSIEMEDRDFIR".split('');
  const STEP_MS = 140;
  const FALL   = 0.55;
  let cols, drops, last = 0, running = true;

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

  const step = (ts) => {
    if (!running) return;
    if (ts - last < STEP_MS) { requestAnimationFrame(step); return; }
    last = ts;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.fillStyle = 'rgba(10,8,6,0.14)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${glyphSize}px 'JetBrains Mono', monospace`;
    for (let i = 0; i < cols; i++) {
      if (Math.random() > density) { drops[i] += FALL; continue; }
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const y  = drops[i] * glyphSize;
      const isHead = Math.random() > 0.86;
      if (isHead) {
        ctx.shadowColor = 'rgba(245,181,71,0.55)';
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = 'rgba(255,214,140,0.95)';
      } else {
        ctx.shadowBlur  = 0;
        const a = 0.18 + Math.random() * 0.32;
        ctx.fillStyle   = `rgba(176,110,42,${a})`;
      }
      ctx.fillText(ch, i * glyphSize, y);
      ctx.shadowBlur = 0;
      if (y > h && Math.random() > 0.985) drops[i] = 0;
      drops[i] += FALL;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) { last = 0; requestAnimationFrame(step); }
  });
}

/* -------------------------------------------------------------------------- */
/*   Live threat feed cycling                                                 */
/* -------------------------------------------------------------------------- */
function initThreatFeed() {
  const body = document.getElementById('threatBody');
  if (!body) return;

  let idx = 0;
  const render = () => {
    // Rebuild rows using textContent — never inject unsanitized text.
    body.innerHTML = '';
    const scan = document.createElement('div');
    scan.className = 'scan-line';
    body.appendChild(scan);
    for (let i = 0; i < 3; i++) {
      const t = THREAT_FEED[(idx + i) % THREAT_FEED.length];
      const row = document.createElement('div');
      row.className = 'row';
      row.style.opacity = (1 - i * 0.25).toFixed(2);
      const tEl = document.createElement('span'); tEl.className = 't'; tEl.textContent = t.time;
      const sEl = document.createElement('span'); sEl.className = 'sev ' + t.severity; sEl.textContent = t.severity;
      const mEl = document.createElement('span'); mEl.className = 'm'; mEl.textContent = t.msg;
      row.append(tEl, sEl, mEl);
      body.appendChild(row);
    }
  };
  render();
  setInterval(() => { idx = (idx + 1) % THREAT_FEED.length; render(); }, 2200);
}

/* -------------------------------------------------------------------------- */
/*   Cyber-card mouse tracking                                                */
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
/*   Count-up stats                                                           */
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
/*   Toast system — reusable, ARIA live, auto dismiss                         */
/* -------------------------------------------------------------------------- */
function showToast(message, kind = 'info', ttl = 4000) {
  const host = document.getElementById('toastContainer');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast toast-' + kind;
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  const icon = document.createElement('i');
  icon.className = kind === 'success' ? 'fa-solid fa-circle-check'
                : kind === 'error'   ? 'fa-solid fa-circle-exclamation'
                : 'fa-solid fa-circle-info';
  icon.setAttribute('aria-hidden', 'true');
  const txt = document.createElement('span');
  txt.textContent = message;
  const close = document.createElement('button');
  close.className = 'toast-close';
  close.setAttribute('aria-label', 'Dismiss');
  close.textContent = '×';
  close.addEventListener('click', () => remove());
  el.append(icon, txt, close);
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add('in'));
  const t = setTimeout(remove, ttl);
  function remove() {
    clearTimeout(t);
    el.classList.remove('in');
    setTimeout(() => el.remove(), 240);
  }
}

/* -------------------------------------------------------------------------- */
/*   Contact form — EmailJS w/ validation, honeypot, cooldown                 */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameEl = form.querySelector('#cf-name');
  const emailEl = form.querySelector('#cf-email');
  const msgEl = form.querySelector('#cf-msg');
  const hpEl = form.querySelector('#cf-website');
  const btn = form.querySelector('#cfSubmit');
  const notice = document.getElementById('emailjsSetupNotice');
  const counter = document.getElementById('msgCounter');
  const errName = form.querySelector('#err-name');
  const errEmail = form.querySelector('#err-email');
  const errMsg = form.querySelector('#err-msg');
  const btnLabelDefault = btn ? btn.innerHTML : '';

  const cfg = window.EMAILJS_CFG || {};
  const setupMode = !cfg.publicKey || cfg.publicKey === 'YOUR_PUBLIC_KEY';
  if (setupMode && notice) notice.hidden = false;

  // EmailJS init
  if (!setupMode && window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init({ publicKey: cfg.publicKey }); } catch (e) { console.error('EmailJS init failed', e); }
  }

  let firstFocusAt = 0;
  const markFocus = () => { if (!firstFocusAt) firstFocusAt = Date.now(); };
  [nameEl, emailEl, msgEl].forEach(el => el && el.addEventListener('focus', markFocus, { once: true }));

  // Char counter + auto-resize
  const updateCounter = () => {
    if (!msgEl || !counter) return;
    const len = msgEl.value.length;
    counter.textContent = `${len} / 2000`;
    counter.classList.toggle('over', len > 2000);
    // auto-resize (max 320px)
    msgEl.style.height = 'auto';
    msgEl.style.height = Math.min(msgEl.scrollHeight, 320) + 'px';
  };
  if (msgEl) msgEl.addEventListener('input', updateCounter);
  updateCounter();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validate = () => {
    let ok = true;
    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();
    const msg = (msgEl?.value || '').trim();
    errName && (errName.textContent = '');
    errEmail && (errEmail.textContent = '');
    errMsg && (errMsg.textContent = '');
    if (name.length < 2 || name.length > 80) {
      if (errName) errName.textContent = 'Please enter your name (2–80 chars).';
      ok = false;
    }
    if (!emailRe.test(email)) {
      if (errEmail) errEmail.textContent = 'Please enter a valid email address.';
      ok = false;
    }
    if (msg.length < 20 || msg.length > 2000) {
      if (errMsg) errMsg.textContent = 'Message must be 20–2000 characters.';
      ok = false;
    }
    return ok;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: silently succeed if filled
    if (hpEl && hpEl.value.trim() !== '') {
      form.reset();
      updateCounter();
      showToast('Message encrypted and delivered.', 'success');
      return;
    }

    // Min typing time (3s)
    if (firstFocusAt && Date.now() - firstFocusAt < 3000) {
      showToast('Take a breath — please review your message before sending.', 'info');
      return;
    }

    // Cooldown (30s)
    let last = 0;
    try { last = parseInt(sessionStorage.getItem('lastSent') || '0', 10) || 0; } catch (_) {}
    const wait = 30000 - (Date.now() - last);
    if (wait > 0) {
      showToast(`Please wait ${Math.ceil(wait / 1000)}s before sending another message.`, 'info');
      return;
    }

    if (!validate()) return;

    if (setupMode) {
      showToast('Contact form is in setup mode — see README-EMAILJS.md.', 'error');
      return;
    }

    if (!window.emailjs || typeof emailjs.send !== 'function') {
      showToast('Email service unavailable. Please email me directly.', 'error');
      console.error('EmailJS SDK not loaded');
      return;
    }

    // Loading state
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Encrypting & Sending…';
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    const ua = navigator.userAgent || 'unknown';
    const params = {
      from_name: nameEl.value.trim(),
      from_email: emailEl.value.trim(),
      message: msgEl.value.trim(),
      browser: detectBrowser(ua),
      device: detectDevice(ua),
      tz,
      user_agent: ua,
      submitted_at: new Date().toISOString(),
    };

    try {
      await emailjs.send(cfg.serviceId, cfg.templateId, params);
      try { sessionStorage.setItem('lastSent', String(Date.now())); } catch (_) {}
      showToast('Message encrypted and delivered.', 'success');
      form.reset();
      firstFocusAt = 0;
      updateCounter();
    } catch (err) {
      console.error('EmailJS send failed:', err);
      showToast('Something went wrong — please retry or email me directly.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = btnLabelDefault; }
    }
  });
}

function detectBrowser(ua) {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
  return 'Other';
}
function detectDevice(ua) {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

/* -------------------------------------------------------------------------- */
/*   Typewriter role rotator                                                  */
/* -------------------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('roleTypewriter');
  if (!el) return;
  if (REDUCE_MOTION()) {
    el.textContent = ROLES[0];
    return;
  }
  let i = 0;
  const type = async () => {
    while (true) {
      const word = ROLES[i % ROLES.length];
      for (let n = 1; n <= word.length; n++) {
        el.textContent = word.slice(0, n);
        await sleep(90);
      }
      await sleep(1400);
      for (let n = word.length; n >= 0; n--) {
        el.textContent = word.slice(0, n);
        await sleep(40);
      }
      i++;
    }
  };
  type();
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* -------------------------------------------------------------------------- */
/*   Back to top                                                              */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const onScroll = () => {
    const show = window.scrollY > 400;
    btn.hidden = !show;
    btn.classList.toggle('visible', show);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCE_MOTION() ? 'auto' : 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/*   Reading progress bar                                                     */
/* -------------------------------------------------------------------------- */
function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.width = p + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* -------------------------------------------------------------------------- */
/*   Command palette (Ctrl / Cmd + K)                                         */
/* -------------------------------------------------------------------------- */
function initCommandPalette() {
  const modal = document.getElementById('cmdPalette');
  const input = document.getElementById('cmdInput');
  const list  = document.getElementById('cmdList');
  if (!modal || !input || !list) return;

  const isIndex = !!document.getElementById('about');
  const goHash = (hash) => {
    if (isIndex) { location.hash = hash; }
    else { location.href = 'index.html' + hash; }
  };
  const commands = [
    { label: 'About',        hint: 'section',  icon: 'fa-user',        action: () => goHash('#about') },
    { label: 'Experience',   hint: 'section',  icon: 'fa-briefcase',   action: () => goHash('#experience') },
    { label: 'Work',         hint: 'section',  icon: 'fa-folder-open', action: () => goHash('#work') },
    { label: 'Skills',       hint: 'section',  icon: 'fa-toolbox',     action: () => goHash('#skills') },
    { label: 'Why Hire Me',  hint: 'section',  icon: 'fa-star',        action: () => goHash('#why') },
    { label: 'Credentials',  hint: 'section',  icon: 'fa-award',       action: () => goHash('#credentials') },
    { label: 'Contact',      hint: 'section',  icon: 'fa-envelope',    action: () => goHash('#contact') },
    { label: 'Case Studies', hint: 'page',     icon: 'fa-file-lines',  action: () => { location.href = isIndex ? 'work.html' : 'work.html'; } },
    { label: 'Download Resume', hint: 'action', icon: 'fa-arrow-down', action: () => window.open('assets/Abhishek_Babariya_Resume.pdf', '_blank', 'noopener') },
    { label: 'Copy Email',   hint: 'action',  icon: 'fa-copy',        action: async () => {
        try { await navigator.clipboard.writeText('abhibabariya007@gmail.com'); showToast('Email copied to clipboard.', 'success'); }
        catch { showToast('Copy failed — email is abhibabariya007@gmail.com', 'error'); }
    }},
    { label: 'Open GitHub',  hint: 'action',  icon: 'fa-github',      brand: true, action: () => window.open('https://github.com/abhiiibabariya-dev', '_blank', 'noopener') },
    { label: 'Open LinkedIn', hint: 'action', icon: 'fa-linkedin-in', brand: true, action: () => window.open('https://www.linkedin.com/in/babariya-abhishek-0085691b4/', '_blank', 'noopener') },
  ];

  let filtered = commands.slice();
  let active = 0;

  const render = () => {
    list.innerHTML = '';
    filtered.forEach((c, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.className = 'cmd-item' + (i === active ? ' active' : '');
      li.dataset.index = i;
      const ic = document.createElement('i');
      ic.className = (c.brand ? 'fa-brands ' : 'fa-solid ') + c.icon;
      ic.setAttribute('aria-hidden', 'true');
      const lbl = document.createElement('span');
      lbl.className = 'cmd-label';
      lbl.textContent = c.label;
      const hint = document.createElement('span');
      hint.className = 'cmd-hint';
      hint.textContent = c.hint;
      li.append(ic, lbl, hint);
      li.addEventListener('mouseenter', () => { active = i; render(); });
      li.addEventListener('click', () => { runActive(); });
      list.appendChild(li);
    });
    if (!filtered.length) {
      const empty = document.createElement('li');
      empty.className = 'cmd-empty';
      empty.textContent = 'No matches.';
      list.appendChild(empty);
    }
  };

  const fuzzy = (q, s) => {
    q = q.toLowerCase(); s = s.toLowerCase();
    let i = 0;
    for (const ch of s) { if (ch === q[i]) i++; if (i >= q.length) return true; }
    return i >= q.length;
  };
  const filter = (q) => {
    q = q.trim();
    filtered = !q ? commands.slice()
      : commands.filter(c => fuzzy(q, c.label) || fuzzy(q, c.hint));
    active = 0;
    render();
  };
  input.addEventListener('input', () => filter(input.value));

  const runActive = () => {
    const c = filtered[active];
    if (!c) return;
    close();
    setTimeout(() => c.action(), 40);
  };

  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('cmd-open');
    input.value = '';
    filter('');
    setTimeout(() => input.focus(), 20);
    document.addEventListener('keydown', onKey);
  };
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove('cmd-open');
    document.removeEventListener('keydown', onKey);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); render(); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(0, active - 1); render(); return; }
    if (e.key === 'Enter')     { e.preventDefault(); runActive(); return; }
    if (e.key === 'Tab') {
      // focus trap — keep focus inside input while palette open
      e.preventDefault();
      input.focus();
    }
  };

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modal.hidden) open(); else close();
    }
  });
  modal.querySelectorAll('[data-cmd-close]').forEach(el => el.addEventListener('click', close));
}

/* -------------------------------------------------------------------------- */
/*   Scroll reveal                                                            */
/* -------------------------------------------------------------------------- */
function initReveal() {
  const reduce = REDUCE_MOTION();
  const targets = document.querySelectorAll(
    '.section .container-x > *, .section .container-x > * > *, ' +
    '.hero .container-x > *, .cs-hero .container-x > *, ' +
    '.case .container-x > *'
  );
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('reveal-in'));
    return;
  }
  const groups = new Map();
  targets.forEach(t => {
    const parent = t.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    const i = groups.get(parent);
    t.classList.add('reveal');
    t.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
    groups.set(parent, i + 1);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-40px 0px' });
  targets.forEach(t => io.observe(t));
}

function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (REDUCE_MOTION()) return;
  const cards = document.querySelectorAll(
    '.cyber-card, .hero-frame, .repo-card, .work-card, .cred-card, .skill-card, .phase, .about-card, .why-card'
  );
  cards.forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform =
          `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-3px)`;
        card.style.setProperty('--mx', (x + 0.5) * 100 + '%');
        card.style.setProperty('--my', (y + 0.5) * 100 + '%');
      });
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    });
  });
}

function initHeroParallax() {
  if (REDUCE_MOTION()) return;
  const frame = document.querySelector('.hero-frame');
  const orbs  = document.querySelectorAll('.hero .orb');
  const boxes = document.querySelectorAll('.float-boxes span');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < 900) {
        if (frame) frame.style.transform = `translateY(${(y * -0.04).toFixed(1)}px)`;
        orbs.forEach((o, i) => {
          o.style.transform = `translate3d(0, ${(y * (i === 1 ? 0.08 : -0.06)).toFixed(1)}px, 0)`;
        });
        boxes.forEach((b, i) => {
          b.style.setProperty('--py', (y * ((i % 2) ? 0.05 : -0.05)).toFixed(1) + 'px');
        });
      }
      ticking = false;
    });
  }, { passive: true });
}
