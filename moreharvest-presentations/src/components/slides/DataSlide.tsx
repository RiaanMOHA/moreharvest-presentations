import { SlideContainer } from './SlideContainer'

interface Metric {
  label: string
  value: string
  description?: string
}

interface DataSlideProps {
  title: string
  content?: string
  metrics: Metric[]
  slideNumber?: number
  totalSlides?: number
}

export function DataSlide({ 
  title, 
  content, 
  metrics, 
  slideNumber,
  totalSlides 
}: DataSlideProps) {
  return (
    <SlideContainer slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="text-h2 font-heading font-semibold text-neutral-950 mb-8">
        {title}
      </h2>
      
      {content && (
        <p className="text-bodyM text-neutral-800 mb-12 max-w-3xl">
          {content}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {metrics.map((metric, i) => (
          <div key={i}>
            <div className="text-h2 font-heading font-semibold text-brand-amber mb-2">
              {metric.value}
            </div>
            <div className="text-bodyS text-neutral-600 uppercase tracking-wider mb-2">
              {metric.label}
            </div>
            {metric.description && (
              <p className="text-bodyS text-neutral-700">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SlideContainer>
  )
}
