# Abhishek Babariya — SOC Operations Console

Live: **https://abhiiibabariya-dev.github.io/portfolio/**

Professional cybersecurity portfolio styled as a live SOC operations console. Pure HTML / CSS / JavaScript — no build step, no framework, ~40 KB total.

## Automation — what auto-updates itself

| Source | Auto-syncs? | How it works |
|---|---|---|
| **GitHub** repos, stars, followers, activity | ✅ Yes | The `LIVE_FEED` panel fetches `github.com/abhiiibabariya-dev` on every page load via the public GitHub API. Client-side, cached 10 minutes per visitor. Any new repo, push, or star appears within minutes. |
| **Site content** (any file you edit) | ✅ Yes | Push to `main` → GitHub Pages redeploys in ~60 seconds. No manual step. |
| **Daily refresh** | ✅ Yes | GitHub Actions workflow (`.github/workflows/refresh.yml`) runs every day at 03:00 UTC to invalidate the Pages CDN cache. |
| **LinkedIn** posts / profile | ❌ Not possible | LinkedIn shut down all public profile APIs years ago. Any scraper violates their ToS and gets IP-blocked. **Workaround:** manually reflect major LinkedIn updates in `index.html` — the site rebuilds the moment you push. |
| **Blog posts** (if you start one) | ✅ Possible | Any RSS feed (Medium, Dev.to, Hashnode, personal blog) can be added to `js/main.js` — same pattern as the GitHub feed. Ask me and I'll wire it up. |

### What the "LIVE_FEED" panel shows
- Total public repos, followers, following (auto)
- 6 most recently pushed repos with description, language, stars, forks, "last updated" (auto)
- "Sync status" badge showing when the data was last fetched

**No secrets, no server, no cost.** The GitHub API allows 60 unauthenticated requests per hour per visitor IP — plenty for a portfolio.

## Making the portfolio update itself when you get new work

Two patterns:

**Pattern 1 — Push to any repo (already automatic):**
Publish a security tool, write-up, or CTF solution → push to a public repo → it appears in `LIVE_FEED` on the next visit.

**Pattern 2 — Add a new hardcoded case file (for showcase pieces):**
Open `index.html`, copy an existing `<article class="case">` block in the `CASE_FILES` section, edit content, then:

```bash
cd ~/portfolio
git add . && git commit -m "add: new case file" && git push
```

Site updates within ~60 seconds.

## Local preview

```bash
cd ~/portfolio
python -m http.server 8000
# open http://localhost:8000
```

## File structure

```
portfolio/
├── index.html            # SOC console layout
├── css/style.css         # Tactical amber theme
├── js/main.js            # Clock, typed roles, GitHub live feed
├── assets/
│   ├── profile.png       # Photo
│   └── Abhishek_Babariya_Resume.pdf
├── .github/workflows/
│   └── refresh.yml       # Daily auto-refresh
└── README.md
```

## Customizing

- **Colors:** edit CSS variables at the top of `css/style.css` (search for `:root`). Change `--amber` to any hex — the whole site retints.
- **Update resume:** drop new PDF into `assets/` (same filename) → push.
- **Rotating role titles:** edit `roles = [...]` array in `js/main.js`.
- **Add sections:** duplicate a `<section class="panel">` block in `index.html`, add matching entry to the sidebar nav.

## Custom domain (recommended for job hunt)

A `.dev` or `.com` domain on a resume looks more professional than `.github.io`. ~$10–15/year:

1. Buy from Namecheap / Cloudflare Registrar
2. Repo → Settings → Pages → Custom domain → enter domain
3. Add DNS records at registrar (Pages settings page shows exactly which)
4. Wait ~10 minutes for HTTPS to provision

## Sharing

Drop the live URL on your resume, LinkedIn "Website" field, email signature, and job applications. The `og:` meta tags render a proper preview when the link is shared on WhatsApp / LinkedIn / Slack.
