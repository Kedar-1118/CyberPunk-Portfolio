import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useIdleCursor } from './hooks/useIdleCursor';
import { useTheme } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
// New 3D and Section Components
import CyberpunkStartScreen from './components/CyberpunkStartScreen';
import CyberpunkEffects from './components/CyberpunkEffects';
import StickyNav from './components/StickyNav';
import Hero from './components/Hero';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import SpotifyWidget from './components/SpotifyWidget';
import './index.css';

// Lazy Load Heavy Components
const Scene3D = React.lazy(() => import('./components/Scene3D'));
const GitHubStats = React.lazy(() => import('./components/GitHubStats'));
const Timeline = React.lazy(() => import('./components/Timeline'));
const TechStack = React.lazy(() => import('./components/TechStack'));
const LearningNow = React.lazy(() => import('./components/LearningNow'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Contact = React.lazy(() => import('./components/Contact'));
const Guestbook = React.lazy(() => import('./components/Guestbook'));
const RetroMode = React.lazy(() => import('./components/RetroMode'));

function AppContent() {
  const { loading: dataLoading, error } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const { success: konamiActivated, reset: resetKonami } = useKonamiCode();
  const { toggleRetro } = useTheme();

  useSmoothScroll();
  useIdleCursor(10000); // Start idle animation after 10 seconds

  useEffect(() => {
    if (konamiActivated) {
      toggleRetro();
      resetKonami();
    }
  }, [konamiActivated, toggleRetro, resetKonami]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const isGlobalLoading = loading || dataLoading;

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-darker text-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-neon-pink mb-4">Connection Error</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Unable to connect to the portfolio server. Please ensure the backend is running.
        </p>
        <div className="bg-black/50 p-4 rounded-lg border border-neon-purple/30 font-mono text-sm text-neon-yellow mb-8">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-neon-purple text-white rounded-full font-bold hover:bg-neon-pink transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-cyber-darker text-white ${hasStarted ? 'no-cursor' : ''}`}>
      {/* Global Effects & Cursor - Always Visible */}
      <React.Suspense fallback={null}>
        <Scene3D />
      </React.Suspense>
      <CyberpunkEffects />
      <ScrollProgress />
      <SpotifyWidget />
      <CustomCursor />

      {!hasStarted ? (
        <CyberpunkStartScreen onStart={handleStart} />
      ) : (
        <>
          {isGlobalLoading && (
            <LoadingScreen onLoadingComplete={() => setLoading(false)} />
          )}

          {!isGlobalLoading && (
            <>
              {/* UI Components */}
              <ThemeToggle />
              <StickyNav />
              <CommandPalette />
              <RetroMode />

              <React.Suspense fallback={<div className="h-screen flex items-center justify-center text-neon-purple">Loading Portfolio...</div>}>
                <main className="relative z-10">
                  <Hero />
                  <About />
                  <Skills />
                  <TechStack />
                  <Projects />
                  <Timeline />
                  <Experience />
                  <LearningNow />
                  <GitHubStats />
                  <Certifications />
                  <Guestbook />
                  <Contact />
                </main>
              </React.Suspense>

              {/* Footer */}
              <footer className="relative py-8 border-t border-white/10 bg-cyber-dark z-10">
                <div className="container mx-auto px-6">
                  <div className="text-center space-y-4">
                    <p className="text-gray-400">
                      Designed & Built with{' '}
                      <span className="text-neon-pink">❤</span> by{' '}
                      <span className="text-neon-purple font-bold">Kedar Dhotre</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      © {new Date().getFullYear()} All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600">
                      Hint: Try the Konami code! ↑↑↓↓←→←→BA | Press Ctrl+K for commands
                    </p>
                  </div>
                </div>
              </footer>
            </>
          )}
        </>
      )
      }
    </div >
  );
}

function App() {
  return (
    <CustomizationProvider>
      <ThemeProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </ThemeProvider>
    </CustomizationProvider>
  );
}

export default App;


