import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReadingProgress from '../../components/ReadingProgress';
import './CaseStudy.css';

function MoreHarvest() {
  const contentRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Scroll reveals for sections
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

    // Metric count-ups
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach((metric) => {
      const target = parseInt(metric.getAttribute('data-target'));
      const duration = metric.getAttribute('data-duration') || 2;
      
      ScrollTrigger.create({
        trigger: metric,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({ value: 0 }, {
            value: target,
            duration: duration,
            ease: 'power2.out',
            onUpdate: function() {
              metric.textContent = Math.round(this.targets()[0].value) + (metric.getAttribute('data-suffix') || '');
            }
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="case-study">
      <ReadingProgress />
      
      <article ref={contentRef} className="case-study-content">
        {/* Hero */}
        <section className="case-hero section">
          <div className="container">
            <h1 className="case-title">MoreHarvest Platform</h1>
            <p className="case-subtitle">
              Regulated fintech platform across five markets, delivering +47% comprehension, 83% task success, and 91% satisfaction.
            </p>
            <div className="case-meta">
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">Lead Product Designer</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Scope</span>
                <span className="meta-value">End-to-end product design, design system, research</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Markets</span>
                <span className="meta-value">Taiwan, Japan, Hong Kong, Singapore</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section 
          ref={(el) => sectionsRef.current[0] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Problem</h2>
            <div className="section-content">
              <p>
                Building a regulated investment platform that must comply with financial regulations across multiple APAC markets while maintaining clarity, trust, and usability for users navigating complex financial products.
              </p>
              <p>
                The challenge: deliver a product that meets strict regulatory requirements while ensuring users can successfully complete investment tasks without confusion or friction.
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section 
          ref={(el) => sectionsRef.current[1] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Approach</h2>
            <div className="section-content">
              <p>
                End-to-end product ownership in regulated environments. Research → validation → system design → delivery.
              </p>
              <p>
                Compliance-first, multi-language, cross-platform design built to scale markets and rules. Created a full fintech product, design system, and research practice from zero.
              </p>
              <p>
                Every design decision validated through testing before engineering begins building.
              </p>
            </div>
          </div>
        </section>

        {/* Key Decisions */}
        <section 
          ref={(el) => sectionsRef.current[2] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Key Decisions</h2>
            <div className="section-content">
              <ul className="decision-list">
                <li>
                  <strong>Compliance-first architecture:</strong> Designed regulatory requirements as first-class constraints, not afterthoughts.
                </li>
                <li>
                  <strong>Multi-language system:</strong> Built design system and components to handle Traditional Chinese, Simplified Chinese, Japanese, and English seamlessly.
                </li>
                <li>
                  <strong>Validation-driven process:</strong> Conducted 9 validation rounds before launch to ensure usability and comprehension.
                </li>
                <li>
                  <strong>Atomic design system:</strong> Created scalable component library with CI governance to maintain consistency across 3 product lines.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section 
          ref={(el) => sectionsRef.current[3] = el}
          className="case-metrics section"
        >
          <div className="container">
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value" data-target="47" data-suffix="%">0%</div>
                <div className="metric-label">Comprehension increase</div>
              </div>
              <div className="metric">
                <div className="metric-value" data-target="83" data-suffix="%">0%</div>
                <div className="metric-label">Task success rate</div>
              </div>
              <div className="metric">
                <div className="metric-value" data-target="91" data-suffix="%">0%</div>
                <div className="metric-label">User satisfaction</div>
              </div>
              <div className="metric">
                <div className="metric-value" data-target="9" data-suffix="">0</div>
                <div className="metric-label">Validation rounds</div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcome */}
        <section 
          ref={(el) => sectionsRef.current[4] = el}
          className="case-section section"
        >
          <div className="container">
            <h2 className="section-heading">Outcome</h2>
            <div className="section-content">
              <p>
                Successfully launched a regulated fintech platform serving five markets with measurable improvements in user comprehension, task success, and satisfaction.
              </p>
              <p>
                The platform demonstrates that compliance and usability are not mutually exclusive—through careful design, validation, and system thinking, we delivered a product that meets regulatory requirements while exceeding user expectations.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default MoreHarvest;
