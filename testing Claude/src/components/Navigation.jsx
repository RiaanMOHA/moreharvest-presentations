import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navigation.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sticky nav hide/reveal
    if (navRef.current) {
      let lastScroll = 0;
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down - hide
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          // Scrolling up - show
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        
        lastScroll = currentScroll;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      ref={navRef}
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            Riaan Burger
          </Link>
          
          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <Link 
                to="/moreharvest" 
                className={isActive('/moreharvest') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                MoreHarvest Platform
              </Link>
            </li>
            <li>
              <Link 
                to="/design-system" 
                className={isActive('/design-system') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Design System
              </Link>
            </li>
            <li>
              <Link 
                to="/moha-intel" 
                className={isActive('/moha-intel') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Moha Intel
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/resume" 
                className={isActive('/resume') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
