import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import Logo from './Logo';

export default function MobileMenu({ isOpen, onClose, navItems, activeId }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.4,
          delay: 0.15,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (href) => {
    onClose();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 bg-[#0B2A5B] opacity-0 pointer-events-none flex flex-col justify-between p-6 sm:p-8 text-white"
    >
      {/* Top bar inside menu */}
      <div className="flex items-center justify-between">
        <Logo className="h-9 w-auto brightness-0 invert" variant="light" />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col items-center justify-center space-y-6 my-auto">
        {navItems.map((item, index) => {
          const isActive = activeId === item.href.replace('#', '');
          return (
            <a
              key={item.label}
              ref={(el) => (linksRef.current[index] = el)}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className={`text-2xl sm:text-3xl font-semibold tracking-wide transition-colors py-2 px-6 rounded-full ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Footer text inside menu */}
      <div className="text-center text-sm text-white/50 pb-4">
        SLG Solutions • Practical Learning. Real Opportunities.
      </div>
    </div>
  );
}
