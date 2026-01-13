import { NextRequest, NextResponse } from 'next/server'
import { updateSlides } from '@/lib/ai/anthropic'

export async function POST(request: NextRequest) {
  try {
    const { slides, feedback, language } = await request.json()
    
    if (!slides || !feedback) {
      return NextResponse.json(
        { error: 'Slides and feedback are required' }, 
        { status: 400 }
      )
    }
    
    const result = await updateSlides(slides, feedback, language || 'en')
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Failed to update slides' }, 
      { status: 500 }
    )
  }
}
