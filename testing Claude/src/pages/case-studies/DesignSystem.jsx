import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReadingProgress from '../../components/ReadingProgress';
import './CaseStudy.css';

function DesignSystem() {
  const contentRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="case-study">
      <ReadingProgress />
      
      <article ref={contentRef} className="case-study-content">
        <section className="case-hero section">
          <div className="container">
            <h1 className="case-title">Design System</h1>
            <p className="case-subtitle">
              Atomic design system with CI governance. 3-year evolution, 3 product lines.
            </p>
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">Design Systems Lead</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Scope</span>
                <span className="meta-value">System architecture, component library, CI governance</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Timeline</span>
                <span className="meta-value">3 years, 3 product lines</span>
              </div>
            </div>
          </div>
        </section>

        <section 
          ref={(el) => sectionsRef.current[0] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Problem</h2>
            <div className="section-content">
              <p>
                Scaling design and development across multiple product lines and teams without sacrificing consistency, quality, or speed. Need for a systematic approach to component creation, documentation, and governance.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={(el) => sectionsRef.current[1] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Approach</h2>
            <div className="section-content">
              <p>
                Built an atomic design system from the ground up, implementing CI governance to ensure consistency and quality across all product lines.
              </p>
              <p>
                The system evolved over 3 years, supporting 3 distinct product lines while maintaining a single source of truth for design tokens, components, and patterns.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={(el) => sectionsRef.current[2] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Key Decisions</h2>
            <div className="section-content">
              <ul className="decision-list">
                <li>
                  <strong>Atomic architecture:</strong> Organized components from atoms to templates, enabling systematic composition and reuse.
                </li>
                <li>
                  <strong>CI governance:</strong> Automated checks and validation to prevent design drift and ensure system integrity.
                </li>
                <li>
                  <strong>Multi-product support:</strong> Designed system to scale across 3 product lines while maintaining consistency.
                </li>
                <li>
                  <strong>Documentation-first:</strong> Comprehensive documentation ensures designers and developers can effectively use and extend the system.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section 
          ref={(el) => sectionsRef.current[3] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Outcome</h2>
            <div className="section-content">
              <p>
                A mature design system that has supported 3 product lines over 3 years, reducing design and development time while ensuring consistency and quality across all products.
              </p>
              <p>
                The CI governance model prevents design drift and maintains system integrity, while the atomic architecture enables rapid iteration and scaling.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default DesignSystem;
