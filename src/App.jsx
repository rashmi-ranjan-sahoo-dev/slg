import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ShareStory from './components/ShareStory';
import Testimonials from './components/Testimonials';
import ClosingBanner from './components/ClosingBanner';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const isSkipLoader = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('skipLoader') === 'true';
  const [isLoaded, setIsLoaded] = useState(isSkipLoader);
  const activeId = useScrollSpy(['home', 'services', 'about', 'testimonials', 'contact'], 120);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* Page Loader */}
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Global Header */}
      <Header activeId={activeId} />

      {/* Main Content Landmarks */}
      <main className="flex-grow">
        <Hero isLoaded={isLoaded} />
        <Services />
        <ShareStory />
        <Testimonials />
        <ClosingBanner />
        <ContactUs />
      </main>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
