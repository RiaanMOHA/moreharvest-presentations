'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SlideContainerProps {
  children: React.ReactNode
  slideNumber?: number
  totalSlides?: number
  className?: string
}

export function SlideContainer({ 
  children, 
  slideNumber,
  totalSlides,
  className = '' 
}: SlideContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [slideNumber])

  return (
    <div 
      ref={ref}
      className={`min-h-screen w-full bg-base-white p-8 md:p-16 relative ${className}`}
    >
      <div className="max-w-[1440px] mx-auto h-full">
        {children}
      </div>
      
      {slideNumber && (
        <div className="absolute bottom-8 right-8 text-bodyS text-neutral-600">
          {slideNumber}
          {totalSlides && ` / ${totalSlides}`}
        </div>
      )}
    </div>
  )
}
