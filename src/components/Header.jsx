import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS } from '../data/content';

export default function Header({ activeId }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background styling (scrolled past hero top)
      setIsScrolled(currentScrollY > 20);

      // Keep header visible if mobile drawer is open
      if (isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Always show header at top of hero section
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        // Scrolling down past threshold -> hide header
        if (delta > 6) {
          setIsVisible(false);
        }
        // Scrolling up past threshold -> show header
        else if (delta < -6) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2 sm:py-2.5'
          : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100/90 py-2 sm:py-2.5 md:py-3'
        }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between relative min-h-[52px] sm:min-h-[56px] md:min-h-[60px]">
          {/* Logo on Left - prominent and clearly visible on all screens */}
          <div className="flex-shrink-0 z-10 flex items-center">
            <Logo className="h-10 sm:h-11 md:h-12 lg:h-13 xl:h-14 w-auto" />
          </div>

          {/* Desktop Navigation Centered in the Middle of Header */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 lg:gap-2.5 absolute left-1/2 -translate-x-1/2 z-10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative whitespace-nowrap px-3.5 py-1.5 lg:px-4 lg:py-2 text-[13.5px] lg:text-[15px] font-semibold rounded-full transition-all duration-200 tracking-wide select-none ${isActive
                    ? 'bg-[#0B2A5B] text-white shadow-xs'
                    : 'text-[#0B2A5B] hover:text-orange-500 hover:bg-slate-100/80 active:scale-95'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle on Right - sized comfortably for mobile header */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-[#0B2A5B] hover:bg-slate-200 active:scale-95 transition-all shadow-xs"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        activeId={activeId}
      />
    </header>
  );
}
