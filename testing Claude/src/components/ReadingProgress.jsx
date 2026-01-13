import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ReadingProgress.css';

function ReadingProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const article = document.querySelector('.case-study-content');
    if (!article) return;

    ScrollTrigger.create({
      trigger: article,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(progressRef.current, {
          width: `${progress * 100}%`,
          duration: 0.1,
          ease: 'none'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="reading-progress">
      <div ref={progressRef} className="reading-progress-bar"></div>
    </div>
  );
}

export default ReadingProgress;
