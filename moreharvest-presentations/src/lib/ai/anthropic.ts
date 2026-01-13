import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateSlides(content: string, language: string) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: `You are a presentation designer for MoreHarvest, a Japanese real estate investment company.

Create presentation slides from this content following MoreHarvest brand guidelines.

CONTENT:
${content}

LANGUAGE: ${language}

BRAND GUIDELINES:
- Left-align all text
- Use prose paragraphs, NOT bullet lists
- Maximum 1 concept per slide
- Professional, trustworthy tone
- Focus on data and credibility
- Generous white space

OUTPUT FORMAT:
Return ONLY valid JSON with NO markdown code fences:

{
  "slides": [
    {
      "type": "title",
      "title": "Main presentation title",
      "subtitle": "Brief subtitle or tagline"
    },
    {
      "type": "section",
      "section": "Section A",
      "title": "Section title",
      "number": "01"
    },
    {
      "type": "content",
      "title": "Slide headline",
      "content": "Body text as a prose paragraph. Keep it concise and focused on one idea.",
      "image": null
    },
    {
      "type": "data",
      "title": "Key metrics",
      "content": "Context for the data",
      "metrics": [
        {"label": "Metric name", "value": "¥5B", "description": "Brief context"}
      ]
    }
  ]
}

SLIDE TYPES:
- "title": Opening slide with main title and subtitle
- "section": Section divider with section letter/number and title
- "content": Standard content slide with headline and prose
- "data": Slide with key numbers/metrics and context
- "index": Table of contents

CRITICAL:
- Return ONLY the JSON object
- No markdown code fences
- No additional text before or after
- Valid JSON structure`
    }],
  })

  const text = message.content[0].type === 'text' ? message.content0].text : '{}'
  
  // Clean up any markdown code fences
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
  
  try {
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse JSON:', cleaned)
    throw new Error('Invalid JSON response from Claude')
  }
}

export async function updateSlides(slides: any[], feedback: string, language: string) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: `Update these MoreHarvest presentation slides based on client feedback.

CURRENT SLIDES:
${JSON.stringify(slides, null, 2)}

FEEDBACK:
${feedback}

LANGUAGE: ${language}

INSTRUCTIONS:
- Incorporate the feedback while maintaining MoreHarvest brand guidelines
- Keep left-aligned text and prose paragraphs
- Maintain professional tone
- Return updated slides in the same JSON format

OUTPUT:
Return ONLY valid JSON with NO markdown code fences:

{
  "slides": [...]
}`
    }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : '{}'
  
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
  
  try {
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse JSON:', cleaned)
    throw new Error('Invalid JSON response from Claude')
  }
}
