import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS } from '../data/content';

export default function Header({ activeId }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between relative min-h-[64px] sm:min-h-[72px]">
          {/* Logo on Left */}
          <div className="flex-shrink-0 z-10">
            <Logo className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto" />
          </div>

          {/* Desktop Navigation Centered in the Middle of Header */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-2 lg:gap-3 absolute left-1/2 -translate-x-1/2 z-10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative whitespace-nowrap px-5 py-2.5 text-base lg:text-lg font-semibold rounded-full transition-all duration-200 tracking-wide ${
                    isActive
                      ? 'bg-[#0B2A5B] text-white shadow-md'
                      : 'text-[#0B2A5B] hover:text-orange-500 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle on Right */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-[#0B2A5B] hover:bg-slate-200 active:scale-95 transition-all"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        activeId={activeId}
      />
    </header>
  );
}
