# MoreHarvest Presentations

AI-powered presentation builder following MoreHarvest brand guidelines.

## Setup

1. Install dependencies (already done if you followed all steps)
2. Add your Anthropic API key to `.env.local`:
```
   ANTHROPIC_API_KEY=sk-ant-xxxxx
```
3. Run development server:
```bash
   npm run dev
```
4. Open http://localhost:3000

## Usage

1. Select language (English, 简体中文, or 繁體中文)
2. Paste content into text area
3. Click "Generate Slides"
4. Review generated slides
5. Add feedback to update slides
6. Click "Download PDF" to export

## Features

- ✅ AI-powered slide generation
- ✅ MoreHarvest brand guidelines enforced
- ✅ 3-language support (EN/ZH-CN/ZH-TW)
- ✅ Instant feedback updates
- ✅ PDF export
- ✅ GSAP animations
- ✅ shadcn/ui components
- ✅ Fully responsive
- ✅ No localStorage (in-memory state only)

## Brand Guidelines

- No gradients (solid colors only)
- Left-aligned text
- 8px spacing system
- REM font for headiose paragraphs (no bullet lists)
- 1 concept per slide

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- GSAP
- Anthropic Claude API
- Puppeteer
