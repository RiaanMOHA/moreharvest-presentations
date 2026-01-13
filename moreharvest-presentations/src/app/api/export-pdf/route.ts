import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
  try {
    const { slides } = await request.json()
    
    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json(
        { error: 'Slides array is required' }, 
        { status: 400 }
      )
    }
    
    // Generate HTML with MoreHarvest styling
    const html = generateHTML(slides)
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    
    await browser.close()
    
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=moreharvest-presentation.pdf',
      },
    })
    
  } catch (error) {
    console.error('PDF export error:', error)
    return NextResponse.json(
      { error: 'Failed to export PDF' }, 
      { status: 500 }
    )
  }
}

function generateHTML(slides: any[]): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MoreHarvest Presentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=REM:wght@400;600&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans JP', sans-serif;
      background: #FEFEFE;
      color: #25272C;
    }
    
    .slide {
      page-break-after: always;
      width: 297mm;
      height: 210mm;
      padding: 64px;
      position: relative;
      background: #FEFEFE;
    }
    
    .slide:last-child {
      page-break-after: avoid;
    }
    
    h1, h2, h3, h4, h5 {
      font-family: 'REM', sans-serif;
      font-weight: 600;
      letter-spacing: 0.0025em;
      line-height: 1.25;
    }
    
    h1 { font-size: 39.8px; margin-bottom: 24px; }
    h2 { font-size: 33.2px; margin-bottom: 32px; }
    h3 { font-size: 27.6px; margin-bottom: 24px; }
    
    p {
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.0025em;
      margin-bottom: 16px;
      max-width: 800px;
    }
    
    .subtitle {
      font-size: 19.2px;
      color: #5B616E;
      margin-bottom: 32px;
    }
    
    .section-header {
      font-size: 14px;
      color: #8E95A2;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
    }
    
    .slide-number {
      position: absolute;
      bottom: 32px;
      right: 64px;
      font-size: 13.3px;
      color: #8E95A2;
    }
    
    .metrics {
      display: flex;
      gap: 48px;
      margin-top: 32px;
    }
    
    .metric {
      flex: 1;
    }
    
    .metric-value {
      font-family: 'REM', sans-serif;
      font-size: 33.2px;
      font-weight: 600;
      color: #FBB931;
      margin-bottom: 8px;
    }
    
    .metric-label {
      font-size: 14px;
      color: #5B616E;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .brand-accent {
      width: 64px;
      height: 2px;
      background: #FBB931;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  ${slides.map((slide, index) => generateSlideHTML(slide, index + 1)).join('')}
</body>
</html>
`
}

function generateSlideHTML(slide: any, slideNumber: number): string {
  if (slide.type === 'title') {
    return `
  <div class="slide">
    <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
      <h1>${escapeHtml(slide.title)}</h1>
      ${slide.subtitle ? `<p class="subtitle">${escapeHtml(slide.subtitle)}</p>` : ''}
      <div class="brand-accent"></div>
    </div>
  </div>
    `
  }
  
  if (slide.type === 'section') {
    return `
  <div class="slide">
    <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
      <div class="section-header">${escapeHtml(slide.section)} | ${escapeHtml(slide.number)}</div>
      <h2>${escapeHtml(slide.title)}</h2>
      <div class="brand-accent"></div>
    </div>
    <div class="slide-number">${slideNumber}</div>
  </div>
    `
  }
  
  if (slide.type === 'data' && slide.metrics) {
    return `
  <div class="slide">
    <h2>${escapeHtml(slide.title)}</h2>
    ${slide.content ? `<p>${escapeHtml(slide.content)}</p>` : ''}
    <div class="metrics">
      ${slide.metrics.map((metric: any) => `
        <div class="metric">
          <div class="metric-value">${escapeHtml(metric.value)}</div>
          <div class="metric-label">${escapeHtml(metric.label)}</div>
          ${metric.description ? `<p style="font-size: 14px; margin-top: 8px;">${escapeHtml(metric.description)}</p>` : ''}
        </div>
      `).join('')}
    </div>
    <div class="slide-number">${slideNumber}</div>
  </div>
    `
  }
  
  // Default content slide
  return `
  <div class="slide">
    <h2>${escapeHtml(slide.title)}</h2>
    <p>${escapeHtml(slide.content || '')}</p>
    <div class="slide-number">${slideNumber}</div>
  </div>
  `
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}
