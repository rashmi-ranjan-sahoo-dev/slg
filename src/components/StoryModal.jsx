import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Users, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function StoryModal({ isOpen, onClose, extraContent }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isClosingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSection, setActiveSection] = useState('guide');

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
        duration: 0.18,
        ease: 'power2.in',
      });
    }

    if (modalRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: isMobile ? 0.99 : 0.97,
        y: isMobile ? 4 : 8,
        duration: 0.18,
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
    setActiveSection('guide');

    // Reset scroll position to top when opened
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

    // Smooth, glitch-free entrance animation
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
          { opacity: 0, scale: isMobile ? 0.98 : 0.96, y: isMobile ? 6 : 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }
        );
      }
    }

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

  if (!isOpen || !extraContent) return null;

  const { guideGeneration, partOfTheChange } = extraContent;

  const scrollToSection = (id) => {
    const container = scrollContainerRef.current;
    const target = document.getElementById(id);
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scrollOffset = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({
        top: Math.max(0, scrollOffset - 12),
        behavior: 'smooth',
      });
      setActiveSection(id === 'modal-section-change' ? 'change' : 'guide');
    }
  };

  const handleContainerScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const changeSection = document.getElementById('modal-section-change');
    if (changeSection) {
      const containerRect = container.getBoundingClientRect();
      const changeRect = changeSection.getBoundingClientRect();
      if (changeRect.top <= containerRect.top + 140) {
        setActiveSection('change');
      } else {
        setActiveSection('guide');
      }
    }
  };

  const modalContent = (
    <div
      id="story-popup-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-[9999] p-2.5 sm:p-6 md:p-8 flex items-center justify-center overscroll-contain"
    >
      {/* Backdrop with touch-none */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer touch-none"
        aria-hidden="true"
      />

      {/* Modal Dialog Card: Unified Scroll Layout */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[88vh] bg-white rounded-[20px] sm:rounded-[26px] shadow-2xl overflow-hidden z-10 my-auto border border-slate-100 flex flex-col will-change-transform"
      >
        {/* Sticky Header with Navigation Pills & Close Button */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-slate-100 bg-white/95 backdrop-blur-md flex-shrink-0 z-20">
          {/* Quick jump navigation pills with active scrollspy indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('modal-section-guide')}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all select-none ${
                activeSection === 'guide'
                  ? 'bg-orange-500 text-white shadow-xs ring-2 ring-orange-400/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guide Students</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('modal-section-change')}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all select-none ${
                activeSection === 'change'
                  ? 'bg-[#1E5BD8] text-white shadow-xs ring-2 ring-blue-400/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#1E5BD8]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Be Part of the Change</span>
            </button>
          </div>

          {/* Close Button Top-Right */}
          <button
            type="button"
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        {/* Scrollable Modal Content: Both sections continuous with original pictures */}
        <div
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className="p-4 sm:p-7 md:p-9 overflow-y-auto overscroll-contain flex-1 space-y-10 sm:space-y-12"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* SECTION 1: Guide the Next Generation */}
          {guideGeneration && (
            <div
              id="modal-section-guide"
              className="scroll-mt-4 pt-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left Column: Text & Pillars */}
                <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 mb-2">
                    {guideGeneration.subtitle || 'Share Your Story'}
                  </span>

                  <h3
                    id="story-modal-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1F4D] tracking-tight leading-tight"
                  >
                    {guideGeneration.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {guideGeneration.paragraph}
                  </p>

                  {/* 3 Pillars */}
                  <div className="mt-4 w-full space-y-2.5 pt-3 border-t border-slate-100">
                    {guideGeneration.pillars.map((pillar, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {pillar}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Callout Box */}
                  <div className="mt-4 sm:mt-5 w-full p-4 rounded-xl bg-gradient-to-r from-orange-50/95 to-amber-50/70 border border-orange-200/80 shadow-xs">
                    <p className="text-xs sm:text-sm font-bold text-orange-600">
                      {guideGeneration.calloutTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                      {guideGeneration.calloutSubtext}
                    </p>
                  </div>
                </div>

                {/* Right Column: Original Picture from Screenshot 1 */}
                <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-2 w-full">
                  <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-50">
                    <img
                      src={guideGeneration.image}
                      alt={guideGeneration.imageAlt || 'Mentor guiding students session'}
                      width="302"
                      height="300"
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    <div className="p-2 sm:p-2.5 bg-white/95 text-center border-t border-slate-100">
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        One story can inspire a better future
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Divider Line */}
          <div className="relative py-1">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 px-3 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Initiative
            </div>
          </div>

          {/* SECTION 2: Be Part of the Change */}
          {partOfTheChange && (
            <div
              id="modal-section-change"
              className="scroll-mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left Column: Principles & Narrative */}
                <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#1E5BD8] mb-2">
                    Our Mission
                  </span>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1F4D] tracking-tight leading-tight">
                    {partOfTheChange.title}
                  </h3>

                  {/* 3 Principles */}
                  <div className="mt-4 w-full space-y-2.5">
                    {partOfTheChange.guidingPrinciples.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#1E5BD8] flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {principle}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Narrative Paragraphs */}
                  <div className="mt-4 space-y-3.5 pt-3.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {partOfTheChange.paragraphs.map((paragraph, idx) => {
                      if (paragraph === 'That is why we invite you to be part of this initiative.') {
                        return (
                          <div
                            key={idx}
                            className="p-3 sm:p-3.5 rounded-xl bg-blue-50 border border-blue-200/80 text-[#0A1F4D] font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-2xs"
                          >
                            <Sparkles className="w-4 h-4 text-[#1E5BD8] flex-shrink-0" />
                            <span>{paragraph}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Original Picture Collage from Screenshot 2 */}
                <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-2 w-full">
                  <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white p-2">
                    <img
                      src={partOfTheChange.image}
                      alt={partOfTheChange.imageAlt || 'Professionals and educators collage'}
                      width="419"
                      height="346"
                      className="w-full h-auto object-contain"
                      loading="eager"
                    />
                    <div className="p-2 text-center border-t border-slate-100 mt-1">
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        Professionals • Educators • Entrepreneurs • Leaders • Experts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with Close Button */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50/95 border-t border-slate-100 flex items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-slate-500 hidden sm:block">
            SLG Solutions — Connecting Experience with the Next Generation
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
