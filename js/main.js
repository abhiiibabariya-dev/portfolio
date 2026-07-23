/* ============================================================
   SOC OPERATIONS CONSOLE — client-side script
   ============================================================ */

const GH_USER = 'abhiiibabariya-dev';
const SESSION_START = Date.now();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    initClock();
    initTypedRole();
    initSidebarToggle();
    initScrollSpy();
    initGitHubFeed();
});

/* ---------- Real-time UTC clock + uptime ---------- */
function initClock() {
    const clockEl = document.getElementById('clockVal');
    const uptimeEl = document.getElementById('uptimeVal');
    const tick = () => {
        const now = new Date();
        const utc = now.toISOString().substring(11, 19);
        if (clockEl) clockEl.textContent = utc;

        const secs = Math.floor((Date.now() - SESSION_START) / 1000);
        const h = String(Math.floor(secs / 3600)).padStart(2, '0');
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        if (uptimeEl) uptimeEl.textContent = `${h}:${m}:${s}`;
    };
    tick();
    setInterval(tick, 1000);
}

/* ---------- Typed role rotation ---------- */
function initTypedRole() {
    const el = document.getElementById('typedRole');
    if (!el) return;
    const roles = [
        'SOC Analyst',
        'Threat Hunter',
        'SIEM Specialist',
        'Digital Forensics Investigator',
        'Incident Responder',
        'Detection Engineer'
    ];
    let pi = 0, ci = 0, deleting = false;
    const tick = () => {
        const cur = roles[pi];
        if (!deleting) {
            el.textContent = cur.slice(0, ++ci);
            if (ci === cur.length) { deleting = true; return setTimeout(tick, 2200); }
            setTimeout(tick, 70);
        } else {
            el.textContent = cur.slice(0, --ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % roles.length; }
            setTimeout(tick, 35);
        }
    };
    tick();
}

/* ---------- Sidebar toggle (mobile) ---------- */
function initSidebarToggle() {
    const btn = document.getElementById('consoleToggle');
    const con = document.getElementById('console');
    if (!btn || !con) return;
    btn.addEventListener('click', () => con.classList.toggle('open'));
    document.querySelectorAll('.nav-item').forEach(a =>
        a.addEventListener('click', () => con.classList.remove('open')));
}

/* ---------- Scroll-spy for nav highlight ---------- */
function initScrollSpy() {
    const items = [...document.querySelectorAll('.nav-item')];
    const sections = items
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    const setActive = () => {
        const y = window.scrollY + 100;
        let current = sections[0]?.id;
        sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
        items.forEach(a => a.classList.toggle('active',
            a.getAttribute('href') === '#' + current));
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
}

/* ---------- GitHub LIVE_FEED (auto-updates on every visit) ---------- */
async function initGitHubFeed() {
    const listEl = document.getElementById('ghRepos');
    const statsEl = document.getElementById('ghStats');
    const syncEl = document.getElementById('ghSync');
    if (!listEl) return;

    const cacheKey = 'gh_feed_v1';
    const cacheMax = 10 * 60 * 1000; // 10 min client-side cache

    const setSync = (t) => { if (syncEl) syncEl.textContent = t; };

    // Try cache first for instant paint
    try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
            const cached = JSON.parse(raw);
            if (Date.now() - cached.at < cacheMax) {
                render(cached.profile, cached.repos);
                setSync(`cached &middot; ${humanTime(cached.at)}`);
            }
        }
    } catch (_) {}

    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`),
            fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`)
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error('gh api');

        const profile = await profileRes.json();
        const repos = (await reposRes.json())
            .filter(r => !r.fork && !r.archived)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 6);

        render(profile, repos);
        setSync(`live &middot; ${humanTime(Date.now())}`);
        localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), profile, repos }));
    } catch (err) {
        if (!listEl.innerHTML.trim()) {
            listEl.innerHTML = `<div class="feed-empty">
                <i class="fas fa-triangle-exclamation"></i>
                Unable to reach GitHub API right now.
                <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener">Visit profile directly →</a>
            </div>`;
            setSync('offline');
        }
    }

    function render(profile, repos) {
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="gh-stat"><span class="gh-num">${profile.public_repos ?? 0}</span><span class="gh-lbl">Repos</span></div>
                <div class="gh-stat"><span class="gh-num">${profile.followers ?? 0}</span><span class="gh-lbl">Followers</span></div>
                <div class="gh-stat"><span class="gh-num">${profile.following ?? 0}</span><span class="gh-lbl">Following</span></div>
            `;
        }
        if (!repos.length) {
            listEl.innerHTML = `<div class="feed-empty">No public repositories yet — <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener">check profile →</a></div>`;
            return;
        }
        listEl.innerHTML = repos.map(r => `
            <a class="repo" href="${r.html_url}" target="_blank" rel="noopener">
                <div class="repo-head">
                    <span class="repo-name"><i class="fab fa-github"></i> ${escapeHtml(r.name)}</span>
                    ${r.language ? `<span class="repo-lang">${escapeHtml(r.language)}</span>` : ''}
                </div>
                <p class="repo-desc">${escapeHtml(r.description || 'No description provided.')}</p>
                <div class="repo-meta">
                    <span><i class="fas fa-star"></i> ${r.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${r.forks_count}</span>
                    <span class="repo-updated">Updated ${humanTime(new Date(r.pushed_at))}</span>
                </div>
            </a>
        `).join('');
    }
}

/* ---------- helpers ---------- */
function humanTime(t) {
    const diff = Math.floor((Date.now() - new Date(t)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return `${Math.floor(diff / 2592000)}mo ago`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}
