import { SlideContainer } from './SlideContainer'

interface TitleSlideProps {
  title: string
  subtitle?: string
  slideNumber?: number
  totalSlides?: number
}

export function TitleSlide({ 
  title, 
  subtitle, 
  slideNumber,
  totalSlides 
}: TitleSlideProps) {
  return (
    <SlideContainer slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-h1 font-heading font-semibold text-neutral-950 mb-6">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-bodyL text-neutral-700 mb-8">
            {subtitle}
          </p>
        )}
        
        <div className="h-[2px] w-16 bg-brand-amber mt-4" />
      </div>
    </SlideContainer>
  )
}
