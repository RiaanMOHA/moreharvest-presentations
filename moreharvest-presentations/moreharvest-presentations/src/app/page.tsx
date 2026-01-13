'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TitleSlide } from '@/components/slides/TitleSlide'
import { SectionSlide } from '@/components/slides/SectionSlide'
import { ContentSlide } from '@/components/slides/ContentSlide'
import { DataSlide } from '@/components/slides/DataSlide'

type Language = 'en' | 'zh-CN' | 'zh-TW'

export default function Home() {
  const [content, setContent] = useState('')
  const [slides, setSlides] = useState<any[]>([])
  const [language, setLanguage] = useState<Language>('en')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const generate = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, language }),
      })
      if (!res.ok) throw new Error('Failed to generate slides')
      const data = await res.json()
      setSlides(data.slides || [])
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate slides.')
    } finally {
      setLoading(false)
    }
  }

  const update = async () => {
    if (!feedback.trim() || slides.length === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/update-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides, feedback, language }),
      })
      if (!res.ok) throw new Error('Failed to update slides')
      const data = await res.json()
      setSlides(data.slides || [])
      setFeedback('')
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update slides.')
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = async () => {
    if (slides.length === 0) return
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides }),
      })
      if (!res.ok) throw new Error('Failed to export PDF')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'moreharvest-presentation.pdf'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export PDF.')
    }
  }

  const renderSlide = (slide: any, index: number) => {
    const slideNumber = index + 1
    const totalSlides = slides.length
    switch (slide.type) {
      case 'title':
        return <TitleSlide key={index} title={slide.title} subtitle={slide.subtitle} slideNumber={slideNumber} totalSlides={totalSlides} />
      case 'section':
        return <SectionSlide key={index} section={slide.section} number={slide.number} title={slide.title} slideNumber={slideNumber} totalSlides={totalSlides} />
      case 'data':
        return <DataSlide key={index} title={slide.title} content={slide.content} metrics={slide.metrics || []} slideNumber={slideNumber} totalSlides={totalSlides} />
      default:
        return <ContentSlide key={index} title={slide.title} content={slide.content || ''} slideNumber={slideNumber} totalSlides={totalSlides} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900">MoreHarvest Presentations</h1>
          <p className="text-base text-gray-700 mt-2">AI-powered presentation builder</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Label htmlFor="language" className="text-base font-semibold mb-2 block">Language</Label>
          <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh-CN">简体中文</SelectItem>
              <SelectItem value="zh-TW">繁體中文</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6 mb-8">
          <Label htmlFor="content" className="text-base font-semibold mb-2 block">Paste your content</Label>
          <Textarea
            id="content"
            placeholder="Paste raw text, copy from Google Slides, or upload a PDF..."
            value={content}hange={(e) => setContent(e.target.value)}
            className="min-h-[200px] mb-4"
            disabled={loading}
          />
          <Button onClick={generate} disabled={loading || !content.trim()} className="bg-amber-500 hover:bg-orange-500 text-black font-semibold">
            {loading ? 'Generating...' : 'Generate Slides'}
          </Button>
        </Card>

        {slides.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">{slides.length} {slides.length === 1 ? 'Slide' : 'Slides'}</h2>
              <Button onClick={exportPDF} className="bg-amber-500 hover:bg-orange-500 text-black font-semibold">Download PDF</Button>
            </div>

            <Card className="p-6 mb-8">
              <Label htmlFor="feedback" className="text-base font-semibold mb-2 block">Update slides with feedback</Label>
              <div className="flex gap-2">
                <Input
                  id="feedback"
                  placeholder="E.g., 'Make the title shorter' or 'Add more data about Tokyo'"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      update()
                    }
                  }}
                  disabled={loading}
                />
                <Button onClick={update} disabled={loading || !feedback.trim()} className="bg-amber-500 hover:bg-orange-500 text-black font-semibold">Update</Button>
              </div>
            </Card>

            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                  {renderSlide(slide, index)}
                </div>
              ))}
            </div>
          </>
        )}

        {slides.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-2xl font-semibold text-gray-400 mb-4">No slides yet</div>
            <p className="text-base text-gray-600">Paste your content above and click Generate Slides to get started</p>
          </Card>
        )}
      </div>
    </div>
  )
}
