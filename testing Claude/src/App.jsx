import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/design-system.css';
import './App.css';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import MoreHarvest from './pages/case-studies/MoreHarvest';
import DesignSystem from './pages/case-studies/DesignSystem';
import MohaIntel from './pages/case-studies/MohaIntel';
import About from './pages/About';
import Resume from './pages/Resume';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    // Page load fade - ensure full opacity
    if (appRef.current) {
      gsap.fromTo(appRef.current, 
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  return (
    <Router>
      <div className="app" ref={appRef}>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/moreharvest" element={<MoreHarvest />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/moha-intel" element={<MohaIntel />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
