import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function HeroModal({ isOpen, onClose, content }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isClosingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClose = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (prefersReducedMotion) {
      isClosingRef.current = false;
      onCloseRef.current?.();
      return;
    }

    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }

    if (modalRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: isMobile ? 0.99 : 0.96,
        y: isMobile ? 4 : 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          isClosingRef.current = false;
          onCloseRef.current?.();
        },
      });
    } else {
      isClosingRef.current = false;
      onCloseRef.current?.();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      isClosingRef.current = false;
      return;
    }

    previousFocusRef.current = document.activeElement;

    // Reset scroll
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    // Lock body scroll only on desktop to prevent mobile viewport/address-bar jumps
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const originalOverflow = document.body.style.overflow;
    if (isDesktop) {
      document.body.style.overflow = 'hidden';
      // Focus close button on desktop only to avoid mobile focus scroll jumps
      setTimeout(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      }, 50);
    }

    // Entrance animation — deferred to next frame for glitch-free paint
    requestAnimationFrame(() => {
      if (prefersReducedMotion) {
        if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1 });
        if (modalRef.current) gsap.set(modalRef.current, { opacity: 1, scale: 1, y: 0 });
      } else {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.22, ease: 'power2.out' }
          );
        }
        if (modalRef.current) {
          gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: isMobile ? 0.99 : 0.96, y: isMobile ? 4 : 12 },
            { opacity: 1, scale: 1, y: 0, duration: isMobile ? 0.22 : 0.28, ease: 'power2.out' }
          );
        }
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (isDesktop) {
        document.body.style.overflow = originalOverflow;
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen, prefersReducedMotion]);

  if (!isOpen || !content) return null;

  const modalContent = (
    <div
      id="hero-popup-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-modal-title"
      className="fixed inset-0 z-[9999] p-2.5 sm:p-6 md:p-8 flex items-center justify-center overscroll-contain"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer touch-none"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-[20px] sm:rounded-[26px] shadow-2xl overflow-hidden z-10 my-auto border border-slate-100 flex flex-col will-change-transform"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-[#0B2A5B] to-[#1E3A6E] flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            <span className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">
              {content.badge}
            </span>
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close modal"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="p-5 sm:p-7 md:p-9 overflow-y-auto overscroll-contain flex-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Title + Tagline */}
          <h3
            id="hero-modal-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1F4D] tracking-tight leading-tight"
          >
            {content.title}
          </h3>
          <p className="mt-1.5 text-sm sm:text-base font-semibold text-orange-500">
            {content.tagline}
          </p>

          {/* Intro Paragraph */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
            {content.intro}
          </p>

          {/* Orange accent divider */}
          <div className="mt-6 sm:mt-7 w-12 h-1 bg-orange-500 rounded-full" />

          {/* Dynamic Sections */}
          {content.sections.map((section, sIdx) => (
            <div key={sIdx} className="mt-6 sm:mt-8">
              <h4 className="text-lg sm:text-xl font-extrabold text-[#0A1F4D] tracking-tight mb-4">
                {section.heading}
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <span
                      className="mt-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-[15px] font-bold text-[#0A1F4D] leading-snug">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mt-0.5 font-normal">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider between sections */}
              {sIdx < content.sections.length - 1 && (
                <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              )}
            </div>
          ))}

          {/* Closing Message */}
          <div className="mt-7 sm:mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0B2A5B]/5 to-orange-50/60 border border-slate-200/60">
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
              {content.closingMessage}
            </p>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-500 italic font-normal">
              {content.footerTagline}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50/95 border-t border-slate-100 flex items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-slate-500 hidden sm:block">
            SLG Solutions — One Platform for Clarity
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0B2A5B] hover:bg-[#0A1F4D] active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
