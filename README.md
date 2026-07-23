# Abhishek Babariya — Portfolio

Professional cybersecurity portfolio built with pure HTML, CSS, and JavaScript. No build tools, no dependencies — just open `index.html` in a browser.

## Live Preview (locally)

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

Or on Termux:

```bash
cd ~/portfolio
python -m http.server 8000
```

## File Structure

```
portfolio/
├── index.html          # Main page
├── css/style.css       # All styles
├── js/main.js          # Interactivity (typing, scroll, counters)
├── assets/
│   └── Abhishek_Babariya_Resume.pdf
└── README.md
```

## Deploy to GitHub Pages (free hosting)

Your site will be live at: `https://abhiiibabariya-dev.github.io/portfolio/`

**Step 1 — Create the repo on GitHub**
1. Log into https://github.com/abhiiibabariya-dev
2. Click **New repository**
3. Name it `portfolio` (or `abhiiibabariya-dev.github.io` if you want it at the root URL)
4. Public, no README, no gitignore — leave empty
5. Click **Create repository**

**Step 2 — Push this folder to GitHub**

```bash
cd ~/portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/abhiiibabariya-dev/portfolio.git
git push -u origin main
```

You'll be asked for GitHub credentials — use a Personal Access Token (Settings → Developer settings → Personal access tokens) instead of your password.

**Step 3 — Enable GitHub Pages**
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, choose **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes — your site is live at the URL shown at the top of the Pages screen

## Deploy to Netlify (alternative — even easier)

1. Go to https://app.netlify.com/drop
2. Drag the entire `portfolio` folder onto the page
3. Done — you get a URL like `https://random-name.netlify.app`
4. To rename: Site settings → Change site name

## Custom Domain (optional)

Buy a domain (`.com` ~$12/yr on Namecheap, `.dev` on Google Domains). In GitHub Pages settings, add your custom domain and configure DNS records with your registrar.

## Customizing

- **Change colors:** Edit CSS variables at the top of `css/style.css` (look for `:root { --accent: ... }`)
- **Update content:** Edit `index.html` — sections are clearly commented
- **Replace resume:** Drop new PDF into `assets/` and update filename in `index.html` (two places: nav & contact CTA)
- **Add a photo:** Add `assets/profile.jpg` and drop `<img src="assets/profile.jpg" class="hero-avatar">` into the hero section

## What's Included

- Fully responsive (desktop, tablet, mobile)
- Dark cybersecurity-themed design (navy + cyan)
- Animated terminal, typing effects, scroll reveals, stat counters
- SEO meta tags & Open Graph tags for social sharing
- Accessible (semantic HTML, reduced-motion support, keyboard nav)
- Fast — no frameworks, no build, ~30KB total

## Sending to Companies

Once deployed, share the URL in:
- Your resume header
- Email signatures
- LinkedIn profile "Website" field
- Job application "Portfolio" fields
- GitHub profile README

Good luck with the applications!
