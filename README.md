# CampusPe – Landing Page

Pixel-matched, fully responsive recreation of the CampusPe Figma landing page.
Built with **Next.js 14 (App Router)**, **React 18** and **Tailwind CSS**.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel – ~2 min)
1. Push this folder to a new GitHub repo:
   ```bash
   git init && git add . && git commit -m "CampusPe landing page"
   git branch -M main
   git remote add origin https://github.com/<you>/campuspe-landing.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo, keep defaults (Next.js is auto-detected), click **Deploy**.

## Structure
- `app/` – layout, global styles, page
- `components/` – Navbar, Hero, Stats, Partners, Discovery, ResumeUpload, AudienceSection (Colleges/Employers), AppShowcase, DownloadSection, SupportCta, Footer, Modal
- `components/ui/` – reusable `Button`, `Pill`, `SectionBadge`
- `components/data.js` – all copy/content in one place
- `public/images/` – logo, partner logos, app screens (extracted from the Figma export)

## Interactions
- All CTAs: hover, `focus-visible` ring and active (press) states
- Hero: floating notification cards + mouse-parallax, card lift/icon tilt on hover
- Opportunity feed tabs filter the list; resume box supports drag & drop with validation
- App carousel: click, dots, swipe; Sign in / Sign up / Waitlist / Support open a modal
- Respects `prefers-reduced-motion`
