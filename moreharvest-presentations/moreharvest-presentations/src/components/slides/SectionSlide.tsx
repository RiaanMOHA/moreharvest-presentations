import { SlideContainer } from './SlideContainer'

interface SectionSlideProps {
  section: string
  number: string
  title: string
  slideNumber?: number
  totalSlides?: number
}

export function SectionSlide({ 
  section, 
  number, 
  title, 
  slideNumber,
  totalSlides 
}: SectionSlideProps) {
  return (
    <SlideContainer slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col justify-center h-full">
        <div className="text-bodyS text-neutral-600 uppercase tracking-wider mb-4">
          {section} | {number}
        </div>
        
        <h2 className="text-h2 font-heading font-semibold text-neutral-950 mb-8">
          {title}
        </h2>
        
        <div className="h-[2px] w-16 bg-brand-amber mt-4" />
      </div>
    </SlideContainer>
  )
}
