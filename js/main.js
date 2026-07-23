const GH_USER = 'abhiiibabariya-dev';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    initNavScroll();
    initNavToggle();
    initScrollSpy();
    initGitHubFeed();
});

function initNavScroll() {
    const nav = document.getElementById('nav');
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initNavToggle() {
    const btn = document.getElementById('navToggle');
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

function initScrollSpy() {
    const links = [...document.querySelectorAll('#navLinks a')];
    const sections = links
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);
    const setActive = () => {
        const y = window.scrollY + 120;
        let cur = sections[0]?.id;
        sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    };
    setActive();
    window.addEventListener('scroll', setActive, { passive: true });
}

async function initGitHubFeed() {
    const listEl = document.getElementById('ghRepos');
    const syncEl = document.getElementById('ghSync');
    if (!listEl) return;

    const cacheKey = 'gh_feed_v2';
    const cacheMax = 10 * 60 * 1000;

    const setSync = t => { if (syncEl) syncEl.textContent = t; };

    try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
            const c = JSON.parse(raw);
            if (Date.now() - c.at < cacheMax) {
                render(c.repos);
                setSync(`updated ${humanTime(c.at)}`);
            }
        }
    } catch (_) {}

    try {
        const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`);
        if (!res.ok) throw new Error('gh');
        const repos = (await res.json())
            .filter(r => !r.fork && !r.archived)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 6);
        render(repos);
        setSync(`updated ${humanTime(Date.now())}`);
        localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), repos }));
    } catch (err) {
        if (!listEl.querySelector('.repo:not(.skeleton)')) {
            listEl.innerHTML = `<div class="feed-empty">
                <i class="fas fa-triangle-exclamation"></i>
                Unable to reach GitHub right now.
                <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener">Visit profile →</a>
            </div>`;
            setSync('offline');
        }
    }

    function render(repos) {
        if (!repos.length) {
            listEl.innerHTML = `<div class="feed-empty">No public repositories yet. <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener">Visit profile →</a></div>`;
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
                    <span><i class="fas fa-star"></i>${r.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i>${r.forks_count}</span>
                    <span class="repo-updated">${humanTime(new Date(r.pushed_at))}</span>
                </div>
            </a>
        `).join('');
    }
}

function humanTime(t) {
    const d = Math.floor((Date.now() - new Date(t)) / 1000);
    if (d < 60)      return `${d}s ago`;
    if (d < 3600)    return `${Math.floor(d / 60)}m ago`;
    if (d < 86400)   return `${Math.floor(d / 3600)}h ago`;
    if (d < 2592000) return `${Math.floor(d / 86400)}d ago`;
    return `${Math.floor(d / 2592000)}mo ago`;
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
}
