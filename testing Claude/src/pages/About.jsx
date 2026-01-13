import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

function About() {
  const contentRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
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
    <div className="about">
      <section className="about-hero section">
        <div className="container">
          <h1 className="page-title">About Riaan</h1>
          <p className="hero-description">
            Senior product designer & design systems lead.
          </p>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[0] = el}
        className="about-section section"
      >
        <div className="container">
          <h2 className="section-title">Background</h2>
          <div className="section-content">
            <p>
              With 10+ years as a sole, founding, and lead designer for APAC startups, I specialize in regulated fintech products for web and mobile. Currently leading product design at MoreHarvest, a regulated investment platform serving Taiwan, Japan, Hong Kong, and Singapore.
            </p>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[1] = el}
        className="about-section section"
      >
        <div className="container">
          <h2 className="section-title">Expertise</h2>
          <div className="section-content">
            <div className="expertise-list">
              <div className="expertise-item">
                <h3>Core expertise</h3>
                <p>End-to-end product ownership in regulated environments. Research → validation → system design → delivery</p>
              </div>
              <div className="expertise-item">
                <h3>Product focus</h3>
                <p>Sole designer delivering clarity, trust, and usability for complex, high-stakes regulated products.</p>
              </div>
              <div className="expertise-item">
                <h3>Design approach</h3>
                <p>Compliance-first, multi-language, cross-platform design built to scale markets and rules.</p>
              </div>
              <div className="expertise-item">
                <h3>System building</h3>
                <p>Created a full fintech product, design system, and research practice from zero.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => sectionsRef.current[2] = el}
        className="about-section section availability-section"
      >
        <div className="container">
          <h2 className="section-title">Availability</h2>
          <div className="section-content">
            <p className="availability-text">
              Product designer for fintech and AI platforms. Available for contract work.
            </p>
            <p className="location-text">
              Based in <strong>Taipei, Taiwan</strong>. Open to remote work and APAC timezone collaboration.
            </p>
            <div className="contact-cta">
              <a href="mailto:riaancjb@gmail.com" className="btn btn-primary">
                RiaanCJB@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
