import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReadingProgress from '../../components/ReadingProgress';
import './CaseStudy.css';

function MohaIntel() {
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
            <h1 className="case-title">Moha Intel</h1>
            <p className="case-subtitle">
              AI research workspace. Led product design and interaction frameworks.
            </p>
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">Lead Product Designer</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Scope</span>
                <span className="meta-value">Product design, interaction frameworks</span>
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
                Designing an AI research workspace that enables researchers to effectively interact with complex AI systems, manage research workflows, and extract insights from large datasets.
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
                Led product design and developed interaction frameworks specifically tailored for AI research workflows.
              </p>
              <p>
                Focused on creating intuitive interfaces that make complex AI interactions accessible, while maintaining the flexibility needed for advanced research use cases.
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
                  <strong>Research-first interaction design:</strong> Built interaction patterns specifically for AI research workflows, not generic UI patterns.
                </li>
                <li>
                  <strong>Flexible frameworks:</strong> Created interaction frameworks that support both novice and advanced users.
                </li>
                <li>
                  <strong>Workspace architecture:</strong> Designed workspace to handle complex, multi-step research processes efficiently.
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
                Delivered an AI research workspace with custom interaction frameworks that enable researchers to effectively work with AI systems and manage complex research workflows.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default MohaIntel;
