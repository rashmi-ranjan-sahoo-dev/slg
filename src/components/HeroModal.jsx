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

          {/* Orange accent divider */}
          <div className="mt-4 sm:mt-5 w-14 h-1.5 bg-orange-500 rounded-full" />

          {/* Real Content Body Paragraphs */}
          <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-4.5 text-sm sm:text-[15px] md:text-base text-slate-700 leading-relaxed font-normal">
            {content.paragraphs ? (
              content.paragraphs.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">{content.fullText || content.intro}</p>
            )}
          </div>

          {/* Key Real-World Knowledge Areas Pill Cloud */}
          {content.focusAreas && (
            <div className="mt-6 sm:mt-7 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="text-xs sm:text-sm font-bold text-[#0A1F4D] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                Real-World Knowledge Areas Covered
              </p>
              <div className="flex flex-wrap gap-2">
                {content.focusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-[#0A1F4D] shadow-2xs hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mission & Goal Callout */}
          {content.goalCallout && (
            <div className="mt-6 sm:mt-7 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-blue-50/60 border border-orange-200/90 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-wider mb-1">
                    Our Core Goal
                  </h4>
                  <p className="text-sm sm:text-[15px] md:text-base text-[#0A1F4D] leading-relaxed font-semibold">
                    {content.goalCallout}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50/95 border-t border-slate-100 flex items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-slate-500 hidden sm:block">
            {content.footerTagline || 'SLG Solutions — Connecting Experience with the Next Generation.'}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0B2A5B] hover:bg-[#0A1F4D] active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ml-auto cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
