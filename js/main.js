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
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    links.classList.remove('open');
    document.body.classList.remove('nav-open');
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

  const nameEl  = form.querySelector('#cf-name');
  const emailEl = form.querySelector('#cf-email');
  const msgEl   = form.querySelector('#cf-msg');
  const hpEl    = form.querySelector('#cf-website');
  const btn     = form.querySelector('#cfSubmit');
  const notice  = document.getElementById('emailjsSetupNotice');
  const counter = document.getElementById('msgCounter');
  const errName = form.querySelector('#err-name');
  const errEmail = form.querySelector('#err-email');
  const errMsg  = form.querySelector('#err-msg');
  const btnLabelDefault = btn ? btn.innerHTML : '';

  // Setup notice retired — credentials are live. Hide it if present in old HTML.
  if (notice) { notice.hidden = true; notice.remove?.(); }

  const cfg = window.EMAILJS_CFG || {};
  if (window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init({ publicKey: cfg.publicKey }); }
    catch (e) { console.error('EmailJS init failed', e); }
  }

  let firstFocusAt = 0;
  const markFocus = () => { if (!firstFocusAt) firstFocusAt = Date.now(); };
  [nameEl, emailEl, msgEl].forEach(el => el && el.addEventListener('focus', markFocus, { once: true }));

  // Char counter + auto-resize
  const updateCounter = () => {
    if (!msgEl || !counter) return;
    const len = msgEl.value.length;
    counter.textContent = `${len} / 2000`;
    counter.classList.toggle('warn', len > 1800);
    counter.classList.toggle('err',  len > 2000);
    msgEl.style.height = 'auto';
    msgEl.style.height = Math.min(msgEl.scrollHeight, 320) + 'px';
  };
  if (msgEl) msgEl.addEventListener('input', updateCounter);
  updateCounter();

  // Keyboard UX — Enter in name/email jumps to next; Ctrl/Cmd+Enter submits from anywhere.
  const focusOrder = [nameEl, emailEl, msgEl].filter(Boolean);
  focusOrder.forEach((el, i) => {
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && !ev.shiftKey && el.tagName !== 'TEXTAREA') {
        ev.preventDefault();
        const next = focusOrder[i + 1];
        (next || btn).focus();
      }
      if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        form.requestSubmit();
      }
    });
  });

  // Strip HTML tags — belt-and-braces against injection in email body
  const stripTags = (s) => String(s || '').replace(/<[^>]*>/g, '').trim();

  // Cheap spam heuristic — reject obvious payload keywords
  const SPAM_RE = /\b(viagra|casino|crypto\s*airdrop|forex\s*signals|loan\s*offer|https?:\/\/[^\s]{15,}\s+https?:\/\/[^\s]{15,})\b/i;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setFieldError = (field, errEl, message) => {
    if (!errEl) return;
    errEl.textContent = message || '';
    errEl.classList.toggle('show', !!message);
    const wrap = field?.closest('.form-field');
    if (wrap) wrap.classList.toggle('has-error', !!message);
  };

  const validate = () => {
    let firstBad = null;
    const name  = stripTags(nameEl?.value);
    const email = stripTags(emailEl?.value);
    const msg   = stripTags(msgEl?.value);

    setFieldError(nameEl,  errName,  '');
    setFieldError(emailEl, errEmail, '');
    setFieldError(msgEl,   errMsg,   '');

    if (name.length < 2 || name.length > 100) {
      setFieldError(nameEl, errName, 'Please enter your name (2–100 characters).');
      firstBad = firstBad || nameEl;
    }
    if (!emailRe.test(email)) {
      setFieldError(emailEl, errEmail, 'Please enter a valid email address.');
      firstBad = firstBad || emailEl;
    }
    if (msg.length < 20 || msg.length > 2000) {
      setFieldError(msgEl, errMsg, 'Message must be 20–2000 characters.');
      firstBad = firstBad || msgEl;
    } else if (SPAM_RE.test(msg)) {
      setFieldError(msgEl, errMsg, 'Message flagged as spam. Please rephrase.');
      firstBad = firstBad || msgEl;
    }
    if (firstBad) firstBad.focus();
    return !firstBad;
  };

  // Staged button label — Encrypting → Connecting → Sending Secure Message → Message Delivered
  const setBtnStage = (icon, label, disabled = true) => {
    if (!btn) return;
    btn.disabled = disabled;
    btn.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${label}`;
    btn.setAttribute('aria-busy', disabled ? 'true' : 'false');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: silently succeed (bot never sees the toast)
    if (hpEl && hpEl.value.trim() !== '') {
      form.reset();
      updateCounter();
      return;
    }

    // Minimum typing time (3s) — traps auto-fill bots
    if (firstFocusAt && Date.now() - firstFocusAt < 3000) {
      showToast('Please take a moment to review your message before sending.', 'info');
      return;
    }

    // Cooldown (30s) — rate limit per session
    let last = 0;
    try { last = parseInt(sessionStorage.getItem('lastSent') || '0', 10) || 0; } catch (_) {}
    const wait = 30000 - (Date.now() - last);
    if (wait > 0) {
      showToast(`Please wait ${Math.ceil(wait / 1000)}s before sending another message.`, 'info');
      return;
    }

    if (!validate()) return;

    if (!window.emailjs || typeof emailjs.send !== 'function') {
      showToast('Email service unavailable. Please email me directly at abhibabariya007@gmail.com.', 'error');
      console.error('EmailJS SDK not loaded');
      return;
    }

    // Prevent duplicate submits during the send
    if (btn?.dataset.sending === '1') return;
    if (btn) btn.dataset.sending = '1';

    // Stage 1 — Encrypting
    setBtnStage('lock', 'Encrypting…');
    await sleep(450);

    // Stage 2 — Connecting
    setBtnStage('link', 'Connecting…');
    await sleep(350);

    // Stage 3 — Sending Secure Message
    setBtnStage('paper-plane', 'Sending Secure Message…');

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    const ua = navigator.userAgent || 'unknown';
    const now = new Date();
    const nameVal  = stripTags(nameEl.value);
    const emailVal = stripTags(emailEl.value);
    const msgVal   = stripTags(msgEl.value);
    const params = {
      // Primary template variables
      name:    nameVal,
      email:   emailVal,
      title:   'New Portfolio Contact — ' + nameVal,
      subject: 'New Portfolio Contact',
      message: msgVal,
      // Metadata
      browser: detectBrowser(ua),
      device:  detectDevice(ua),
      os:      detectOS(ua),
      tz,
      user_agent: ua,
      submitted_at: now.toISOString(),
      submitted_local: now.toLocaleString(),
      page_url: location.href,
      // Legacy aliases for older templates
      from_name:  nameVal,
      from_email: emailVal,
      reply_to:   emailVal,
    };

    try {
      await emailjs.send(cfg.serviceId, cfg.templateId, params);

      // Optional auto-reply — only fires if a 2nd template ID is configured
      if (cfg.autoReplyTemplateId) {
        try {
          await emailjs.send(cfg.serviceId, cfg.autoReplyTemplateId, params);
        } catch (autoErr) {
          console.warn('Auto-reply failed (main send succeeded):', autoErr);
        }
      }

      try { sessionStorage.setItem('lastSent', String(Date.now())); } catch (_) {}

      // Stage 4 — Delivered
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Message Delivered';
        btn.setAttribute('aria-busy', 'false');
      }

      showToast(
        'Secure message delivered. Thank you for reaching out — I\'ll get back to you shortly.',
        'success',
        5500
      );

      // Reset shortly after so the "Delivered" state stays visible
      setTimeout(() => {
        form.reset();
        firstFocusAt = 0;
        updateCounter();
        if (btn) {
          btn.innerHTML = btnLabelDefault;
          btn.disabled = false;
          delete btn.dataset.sending;
        }
      }, 1800);

      // Scroll form into view on small screens
      if (window.innerWidth < 900) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('EmailJS send failed:', err);
      showToast(
        'Delivery failed. Please retry, or email me directly at abhibabariya007@gmail.com.',
        'error',
        6500
      );
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = btnLabelDefault;
        btn.setAttribute('aria-busy', 'false');
        delete btn.dataset.sending;
      }
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
  if (/iPad|Tablet/i.test(ua)) return 'Tablet';
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'Mobile';
  return 'Desktop';
}
function detectOS(ua) {
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua) && !/Mobile/.test(ua)) return 'macOS';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Other';
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

  // Path helper — pages may live at root or under /projects/, adjust ../ prefix.
  const depth = (location.pathname.match(/\/projects\//) ? 1 : 0);
  const up = '../'.repeat(depth);
  const go = (page) => { location.href = up + page; };
  const openTab = (url) => window.open(url, '_blank', 'noopener');

  const commands = [
    { label: 'Home',            hint: 'page',   icon: 'fa-house',        action: () => go('index.html') },
    { label: 'About',           hint: 'page',   icon: 'fa-user',         action: () => go('about.html') },
    { label: 'Experience',      hint: 'page',   icon: 'fa-briefcase',    action: () => go('experience.html') },
    { label: 'Projects',        hint: 'page',   icon: 'fa-folder-open',  action: () => go('projects.html') },
    { label: 'Skills',          hint: 'page',   icon: 'fa-toolbox',      action: () => go('skills.html') },
    { label: 'Certifications',  hint: 'page',   icon: 'fa-award',        action: () => go('certifications.html') },
    { label: 'Resume',          hint: 'page',   icon: 'fa-file-lines',   action: () => go('resume.html') },
    { label: 'Contact',         hint: 'page',   icon: 'fa-envelope',     action: () => go('contact.html') },
    { label: 'APT Investigation',    hint: 'case study', icon: 'fa-user-secret',      action: () => go('projects/apt-investigation.html') },
    { label: 'SOC Automation Lab',   hint: 'case study', icon: 'fa-gears',            action: () => go('projects/soc-automation.html') },
    { label: 'CyberGuard Detection', hint: 'case study', icon: 'fa-code',             action: () => go('projects/cyberguard.html') },
    { label: 'Mobile & Cloud Forensics', hint: 'case study', icon: 'fa-magnifying-glass', action: () => go('projects/forensics.html') },
    { label: 'Download Resume', hint: 'action', icon: 'fa-arrow-down',   action: () => openTab(up + 'assets/Abhishek_Babariya_Resume.pdf') },
    { label: 'Copy Email',      hint: 'action', icon: 'fa-copy',         action: async () => {
        try { await navigator.clipboard.writeText('abhibabariya007@gmail.com'); showToast('Email copied to clipboard.', 'success'); }
        catch { showToast('Copy failed — email is abhibabariya007@gmail.com', 'error'); }
    }},
    { label: 'Open GitHub',     hint: 'action', icon: 'fa-github',       brand: true, action: () => openTab('https://github.com/abhiiibabariya-dev') },
    { label: 'Open LinkedIn',   hint: 'action', icon: 'fa-linkedin-in',  brand: true, action: () => openTab('https://www.linkedin.com/in/babariya-abhishek-0085691b4/') },
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

/* ==========================================================================
   Multi-page helpers — active nav, project filter+search, copy buttons, print
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initProjectFilters();
  initCopyButtons();
  initPrintButton();
});

/* Set .active on the nav link matching the current URL. */
function initActiveNav() {
  const links = document.querySelectorAll('#navLinks a[href]');
  if (!links.length) return;
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const inProjects = /\/projects\//.test(location.pathname);
  links.forEach(a => a.classList.remove('active'));
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    // Interior /projects/*.html should highlight the "Projects" nav link.
    if (inProjects && href === 'projects.html') a.classList.add('active');
    else if (href === here) a.classList.add('active');
  });
}

/* Project listing filter + live search. No-op on pages without the toolbar. */
function initProjectFilters() {
  const grid    = document.getElementById('projGrid');
  const search  = document.getElementById('projSearch');
  const filters = document.querySelectorAll('.proj-filters .fchip');
  const empty   = document.getElementById('projEmpty');
  if (!grid) return;

  let activeFilter = 'all';
  let query = '';

  const apply = () => {
    let shown = 0;
    grid.querySelectorAll('.proj-card').forEach(card => {
      const cat   = (card.dataset.category || '').toLowerCase();
      const title = (card.dataset.title    || '').toLowerCase();
      const desc  = (card.dataset.desc     || '').toLowerCase();
      const catOk = activeFilter === 'all' || cat.includes(activeFilter);
      const qOk   = !query || title.includes(query) || desc.includes(query);
      const show  = catOk && qOk;
      card.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  };

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = (btn.dataset.filter || 'all').toLowerCase();
      apply();
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      query = search.value.trim().toLowerCase();
      apply();
    });
  }
  apply();
}

/* Copy any text via data-copy attribute. Falls back to prompt() if clipboard API blocked. */
function initCopyButtons() {
  const btns = document.querySelectorAll('[data-copy]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(value);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1200);
        showToast('Copied to clipboard.', 'success', 2500);
      } catch (err) {
        console.warn('Clipboard blocked, prompting.', err);
        window.prompt('Copy this value:', value);
      }
    });
  });
}

/* Resume page: print button. */
function initPrintButton() {
  const btn = document.getElementById('printResume');
  if (!btn) return;
  btn.addEventListener('click', () => window.print());
}

/* ==========================================================================
   Premium visual polish — magnet cursor + button ripple position
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMagnet();
  initButtonRipple();
});

/* Elements with [data-magnet] pull toward the cursor within a small radius. */
function initMagnet() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('[data-magnet]');
  if (!targets.length) return;

  const strength = 0.28;
  const radius = 120;

  targets.forEach(el => {
    el.addEventListener('mousemove', (ev) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); return; }
      el.style.setProperty('--tx', (dx * strength).toFixed(1) + 'px');
      el.style.setProperty('--ty', (dy * strength).toFixed(1) + 'px');
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    });
  });
}

/* Position the amber button's glow at the pointer for a ripple feel. */
function initButtonRipple() {
  document.querySelectorAll('.btn-amber').forEach(btn => {
    btn.addEventListener('mousemove', (ev) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', ((ev.clientX - r.left) / r.width * 100) + '%');
      btn.style.setProperty('--ry', ((ev.clientY - r.top ) / r.height * 100) + '%');
    });
  });
}
