import { NextRequest, NextResponse } from 'next/server'
import { generateSlides } from '@/lib/ai/anthropic'

export async function POST(request: NextRequest) {
  try {
    const { content, language } = await request.json()
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' }, 
        { status: 400 }
      )
    }
    
    const result = await generateSlides(content, language || 'en')
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate slides' }, 
      { status: 500 }
    )
  }
}
