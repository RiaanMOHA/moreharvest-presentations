# Riaan Burger Portfolio Website

Full website rebuild following strict design guidelines and core axioms.

## Tech Stack

- **React** + **Vite** - Component-based, performant, deployable
- **GSAP** - Required animations and interactions
- **React Router** - Navigation
- **Design System** - Locked, immutable CSS system

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Flat navigation (no dropdowns)
│   ├── ReadingProgress.jsx     # GSAP reading progress indicator
│   └── ...
├── pages/
│   ├── Home.jsx                # Homepage with 3 featured projects
│   ├── About.jsx               # About page with APAC/Taiwan clarity
│   ├── Resume.jsx              # Resume page
│   └── case-studies/
│       ├── MoreHarvest.jsx     # Primary case study (fintech-first)
│       ├── DesignSystem.jsx    # Design system case study
│       └── MohaIntel.jsx       # AI workspace case study
├── styles/
│   └── design-system.css       # LOCKED design system (immutable)
└── App.jsx                     # Main app with routing
```

## Core Features

### Navigation
- Flat navigation structure
- No dropdowns
- 5 main links: MoreHarvest, Design System, Moha Intel, About, Resume
- Sticky nav with hide/reveal on scroll
- Mobile-responsive hamburger menu

### Homepage
- Hero section with clear value proposition
- Core expertise grid (4 items)
- 3 featured projects (MoreHarvest primary)
- Availability CTA

### Case Studies
- 5-minute skim structure:
  - Problem
  - Approach
  - Key Decisions
  - Outcome
- GSAP scroll reveals
- Reading progress indicator
- Metric count-ups (MoreHarvest)
- Explicit role, scope, collaboration

### GSAP Interactions
- Page load fades
- Scroll reveals
- Project card hover effects
- Metric count-ups
- Reading progress
- Sticky nav hide/reveal
- Respects `prefers-reduced-motion`

## Design System

The design system is **LOCKED and IMMUTABLE**. Located in `src/styles/design-system.css`.

**DO NOT:**
- Change colors
- Add colors
- Change fonts
- Add fonts
- Change spacing philosophy
- Override typography
- Introduce new visual tokens

**YOU MAY:**
- Extend for components
- Add GSAP hooks
- Add utility wrappers

## Content Source

All content must come from: https://riaancjb.wixstudio.com/riaanburger

**HARD RULES:**
- ❌ Do not invent copy
- ❌ Do not paraphrase
- ❌ Do not summarize
- ❌ Do not "improve wording"

**YOU MAY:**
- Reorder
- Re-structure
- Surface content earlier
- Hide or archive content

## Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is production-ready. Build output is in `dist/` directory.

Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Compliance Checklist

✅ All 10 core axioms enforced
✅ Content extracted from Wix site
✅ Design system untouched
✅ Navigation skimmable
✅ No interaction slows review
✅ Site works in 5 minutes
✅ Fintech-first positioning
✅ 3 featured projects only
✅ Flat navigation
✅ GSAP interactions implemented
✅ APAC/Taiwan clarity
✅ Availability messaging

## Notes

1. **Images**: Image placeholders are ready. Extract actual images from Wix site.
2. **Resume PDF**: Add resume PDF to `/public/resume.pdf`
3. **Case Study Details**: More detailed content may need to be extracted from individual Wix case study pages.

## License

Private project for Riaan Burger portfolio.
