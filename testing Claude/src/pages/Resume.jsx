import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Resume.css';

function Resume() {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div className="resume">
      <section className="resume-hero section">
        <div className="container">
          <h1 className="page-title">Resume</h1>
          <p className="hero-description">
            Download my resume or view details below.
          </p>
          <div className="resume-cta">
            <a 
              href="/resume.pdf" 
              download 
              className="btn btn-primary"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <section ref={contentRef} className="resume-content section">
        <div className="container">
          <div className="resume-section">
            <h2 className="section-title">Experience</h2>
            
            <div className="resume-item">
              <h3>Lead Product Designer</h3>
              <div className="resume-meta">
                <span className="company">MoreHarvest</span>
                <span className="date">Current</span>
              </div>
              <p>
                Leading product design for a regulated investment platform serving Taiwan, Japan, Hong Kong, and Singapore. Built design system, research practice, and end-to-end product from zero.
              </p>
              <ul className="resume-list">
                <li>Delivered +47% comprehension, 83% task success, and 91% satisfaction</li>
                <li>Created atomic design system with CI governance supporting 3 product lines</li>
                <li>Conducted 9 validation rounds before launch</li>
              </ul>
            </div>

            <div className="resume-item">
              <h3>Product Designer</h3>
              <div className="resume-meta">
                <span className="company">Moha Intel</span>
                <span className="date">Previous</span>
              </div>
              <p>
                Led product design and interaction frameworks for AI research workspace.
              </p>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Design</h3>
                <ul className="skill-list">
                  <li>Product Design</li>
                  <li>Design Systems</li>
                  <li>UX Research</li>
                  <li>Prototyping</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Specialization</h3>
                <ul className="skill-list">
                  <li>Regulated Fintech</li>
                  <li>Multi-language Design</li>
                  <li>Compliance-first Design</li>
                  <li>APAC Markets</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> <a href="mailto:riaancjb@gmail.com">riaancjb@gmail.com</a>
              </p>
              <p>
                <strong>Location:</strong> Taipei, Taiwan
              </p>
              <p>
                <strong>Availability:</strong> Available for contract work
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
