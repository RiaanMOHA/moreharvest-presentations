import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

function Home() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const expertiseRef = useRef(null);

  useEffect(() => {
    // Scroll reveals
    const elements = [
      heroRef.current,
      ...(projectsRef.current?.querySelectorAll('.project-card') || []),
      ...(expertiseRef.current?.querySelectorAll('.expertise-item') || [])
    ];

    elements.forEach((el) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
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
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero section">
        <div className="container">
          <h1 className="hero-title">
            Senior product designer & design systems lead.
          </h1>
          <p className="hero-description">
            With 10+ years as a sole, founding, and lead designer for APAC startups, I specialize in regulated fintech products for web and mobile. Currently leading product design at MoreHarvest, a regulated investment platform serving Taiwan, Japan, Hong Kong, and Singapore.
          </p>
          <div className="hero-cta">
            <Link to="/moreharvest" className="btn btn-primary">
              View Product Work
            </Link>
            <Link to="/about" className="btn btn-secondary">
              About & Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section ref={expertiseRef} className="expertise section">
        <div className="container">
          <h2 className="section-title">Core expertise</h2>
          <div className="expertise-grid">
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
            <div className="expertise-item">
              <h3>Proven results</h3>
              <p>9 validation rounds, 83% task success, and 91% user satisfaction at launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work - 3 Projects Only */}
      <section ref={projectsRef} className="featured-work section">
        <div className="container">
          <h2 className="section-title">Featured work</h2>
          <p className="section-description">
            Product design for regulated fintech and AI tools. Brand systems for luxury goods and industrial clients. Every design decision validated through testing before engineering begins building.
          </p>
          
          <div className="projects-grid">
            {/* MoreHarvest - Primary */}
            <ProjectCard
              title="MoreHarvest Platform"
              description="Regulated fintech platform across five markets, delivering +47% comprehension, 83% task success, and 91% satisfaction."
              link="/moreharvest"
              isPrimary={true}
            />
            
            {/* Design System */}
            <ProjectCard
              title="Design System"
              description="Atomic design system with CI governance. 3-year evolution, 3 product lines."
              link="/design-system"
            />
            
            {/* Moha Intel */}
            <ProjectCard
              title="Moha Intel"
              description="AI research workspace. Led product design and interaction frameworks."
              link="/moha-intel"
            />
          </div>
        </div>
      </section>

      {/* Availability CTA */}
      <section className="availability section">
        <div className="container">
          <h2 className="section-title">Let's work together</h2>
          <p className="availability-text">
            Product designer for fintech and AI platforms. Available for contract work.
          </p>
          <a href="mailto:riaancjb@gmail.com" className="btn btn-primary">
            RiaanCJB@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ title, description, link, isPrimary = false }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link to={link} className={`project-card ${isPrimary ? 'primary' : ''}`} ref={cardRef}>
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <span className="project-link">View Case Study →</span>
    </Link>
  );
}

export default Home;
