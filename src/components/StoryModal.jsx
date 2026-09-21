import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function StoryModal({ isOpen, onClose, extraContent }) {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'change'
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
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
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.96,
        y: 8,
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

    // Default to first tab on open
    setActiveTab('guide');
    previousFocusRef.current = document.activeElement;

    // Lock body scroll only on desktop to prevent mobile viewport shifts
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const originalOverflow = document.body.style.overflow;
    if (isDesktop) {
      document.body.style.overflow = 'hidden';
    }

    // Gentle focus on close button
    setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 50);

    // Smooth entrance animation
    if (prefersReducedMotion) {
      if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1 });
      if (modalRef.current) gsap.set(modalRef.current, { opacity: 1, scale: 1, y: 0 });
    } else {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.96, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'power2.out' }
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

  const modalContent = (
    <div
      id="story-popup-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex items-center justify-center overscroll-contain"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity cursor-pointer touch-none"
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden z-10 my-auto border border-slate-100 flex flex-col will-change-transform"
      >
        {/* Top Header Bar with Segmented Tabs & Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md flex-shrink-0">
          {/* Segmented Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all select-none ${
                activeTab === 'guide'
                  ? 'bg-white text-[#0A1F4D] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
              <span>Guide the Next Gen</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('change')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all select-none ${
                activeTab === 'change'
                  ? 'bg-white text-[#0A1F4D] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E5BD8]" />
              <span>Be Part of the Change</span>
            </button>
          </div>

          {/* Close Button Top-Right */}
          <button
            type="button"
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <X className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-7 md:p-8 overflow-y-auto overscroll-contain flex-1">
          {/* TAB 1: Guide the Next Generation */}
          {activeTab === 'guide' && guideGeneration && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column: Text Content */}
              <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 mb-2.5">
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
                <div className="mt-5 w-full p-4 rounded-xl bg-gradient-to-r from-orange-50/90 to-amber-50/60 border border-orange-200/80 shadow-xs">
                  <p className="text-xs sm:text-sm font-bold text-orange-600">
                    {guideGeneration.calloutTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                    {guideGeneration.calloutSubtext}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 font-normal italic">
                    {guideGeneration.footerTagline}
                  </p>
                </div>
              </div>

              {/* Right Column: Original Picture */}
              <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-2">
                <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-50">
                  <img
                    src={guideGeneration.image}
                    alt={guideGeneration.imageAlt || 'Mentor guiding students session'}
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                  <div className="p-2.5 bg-white/95 text-center border-t border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">
                      One story can inspire a better future
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Be Part of the Change */}
          {activeTab === 'change' && partOfTheChange && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column: Principles & Narrative */}
              <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#1E5BD8] mb-2.5">
                  Our Mission
                </span>

                <h3
                  id="story-modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1F4D] tracking-tight leading-tight"
                >
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
                <div className="mt-4 space-y-3 pt-3.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {partOfTheChange.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Right Column: Original Picture Collage */}
              <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-2">
                <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white p-2">
                  <img
                    src={partOfTheChange.image}
                    alt={partOfTheChange.imageAlt || 'Professionals and educators collage'}
                    className="w-full h-auto object-contain"
                    loading="eager"
                  />
                  <div className="p-2 text-center border-t border-slate-100 mt-1">
                    <p className="text-xs text-slate-500 font-medium">
                      Professionals • Educators • Entrepreneurs • Leaders • Experts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="px-4 sm:px-7 py-3 sm:py-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-3 flex-shrink-0">
          {activeTab === 'guide' ? (
            <button
              type="button"
              onClick={() => setActiveTab('change')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E5BD8] hover:text-[#0B2A5B] transition-colors"
            >
              <span>Next: Be Part of the Change</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Guide the Next Gen</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClose}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#0B2A5B] hover:bg-[#0A1F4D] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
