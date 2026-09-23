import React, { useRef, useState, useEffect } from 'react';
import {
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS_CONTENT } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const headingRef = useRef(null);
  const subheadRef = useRef(null);
  const spotlightRef = useRef(null);
  const spotlightInnerRef = useRef(null);
  const tickerContainerRef = useRef(null);

  const { badge, heading, subheading, spotlight, tickerReviews } = TESTIMONIALS_CONTENT;

  // Active full card state for desktop
  const [activeItem, setActiveItem] = useState(spotlight);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Combine spotlight and ticker items so all reviews are available
  const allReviews = [
    {
      id: 'spotlight-default',
      ...spotlight,
    },
    ...tickerReviews,
  ];

  // Duplicate the array for desktop vertical marquee
  const duplicatedReviews = [...allReviews, ...allReviews];

  // Mobile single card carousel state with clone for infinite right-to-left slide
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const resumeTimerRef = useRef(null);

  // Array with clone of first item at end for infinite right-to-left wrapping
  const mobileSlides = [...allReviews, allReviews[0]];

  // Auto-scroll mobile carousel right-to-left infinitely
  useEffect(() => {
    if (isMobilePaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      handleNextMobileSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [mobileIndex, isMobilePaused, prefersReducedMotion]);

  const handleNextMobileSlide = () => {
    setIsTransitioning(true);
    setMobileIndex((prev) => {
      const next = prev + 1;
      // Fallback timer: if the browser drops transitionend (e.g. low-power mode, background tab),
      // ensure we safely snap back to 0 so slides never drift into blank space
      if (next >= allReviews.length) {
        setTimeout(() => {
          setIsTransitioning(false);
          setMobileIndex(0);
        }, 750);
      }
      return next;
    });
  };

  const handlePrevMobileSlide = () => {
    if (mobileIndex === 0) {
      setIsTransitioning(false);
      setMobileIndex(allReviews.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setMobileIndex(allReviews.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setMobileIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    // When reached the clone at the end, immediately snap to 0 without animation
    if (mobileIndex >= allReviews.length) {
      setIsTransitioning(false);
      setMobileIndex(0);
    }
  };

  // Touch handlers for mobile swipe with safety guards
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsMobilePaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped left -> advance right to left
        handleNextMobileSlide();
      } else {
        // Swiped right -> go prev
        handlePrevMobileSlide();
      }
    }

    // Resume auto-scroll after 3.5s of no interaction
    resumeTimerRef.current = setTimeout(() => {
      setIsMobilePaused(false);
    }, 3500);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [headingRef.current, subheadRef.current, spotlightRef.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      // Check if desktop spotlight card is visible in layout
      const hasSpotlight = spotlightRef.current && window.innerWidth >= 768;

      // Initial ScrollTrigger entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        [leftLineRef.current, rightLineRef.current].filter(Boolean),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          headingRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          subheadRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

      if (hasSpotlight) {
        tl.fromTo(
          spotlightRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Handle clicking a card in desktop marquee to update spotlight
  const handleSelectReview = (review) => {
    if (activeItem.name === review.name) return;

    if (prefersReducedMotion) {
      setActiveItem(review);
      return;
    }

    const container = spotlightInnerRef.current;
    if (container) {
      gsap.to(container, {
        opacity: 0,
        y: -8,
        scale: 0.98,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          setActiveItem(review);
          gsap.fromTo(
            container,
            { opacity: 0, y: 10, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.out' }
          );
        },
      });
    } else {
      setActiveItem(review);
    }
  };

  const activeMobileIndex = mobileIndex % allReviews.length;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 bg-[#0B2A5B] text-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6">
            <span
              ref={leftLineRef}
              className="w-12 sm:w-20 md:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-right"
            />
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white"
            >
              {heading}
            </h2>
            <span
              ref={rightLineRef}
              className="w-12 sm:w-20 md:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-left"
            />
          </div>

          <p
            ref={subheadRef}
            className="mt-2.5 sm:mt-3 text-base sm:text-xl md:text-2xl font-medium text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            {subheading}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP & TABLET LAYOUT (screens greater than phone: md:grid) */}
        {/* 2-Column: Left Spotlight Card + Right Marquee Ticker           */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
          {/* LEFT COLUMN: Full Feedback Spotlight Card */}
          <div className="md:col-span-5 flex flex-col">
            <div
              ref={spotlightRef}
              className="relative bg-white/10 backdrop-blur-md rounded-[16px] sm:rounded-[20px] p-4 sm:p-7 md:p-8 border border-white/15 shadow-2xl flex flex-col justify-between flex-grow overflow-hidden min-h-0 sm:min-h-[380px] lg:min-h-[420px]"
            >
              {/* Background Ambient Glow Accents */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#1E5BD8]/25 rounded-full blur-3xl pointer-events-none" />

              {/* Animated Inner Content Container */}
              <div ref={spotlightInnerRef} className="flex flex-col justify-between h-full will-change-transform">
                <div>
                  {/* Top Badge & Rating Row */}
                  <div className="flex items-center justify-between gap-3 mb-3 sm:mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-[13px] font-bold border uppercase tracking-wider transition-colors duration-200"
                      style={{
                        backgroundColor: `${activeItem.tagColor || '#16A34A'}25`,
                        color: activeItem.tagColor === '#16A34A' ? '#4ADE80' : activeItem.tagColor || '#FB923C',
                        borderColor: `${activeItem.tagColor || '#16A34A'}40`,
                      }}
                    >
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{activeItem.tag}</span>
                    </span>

                    <div className="flex items-center gap-0.5 sm:gap-1" aria-label={`${activeItem.rating} out of 5 stars`}>
                      {[...Array(activeItem.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-400 text-orange-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote with Icon */}
                  <div className="relative mb-3 sm:mb-6">
                    <Quote className="w-6 h-6 sm:w-10 sm:h-10 text-orange-400/40 mb-1 sm:mb-2 rotate-180" />
                    <p className="text-[13.5px] sm:text-base md:text-lg lg:text-xl xl:text-[22px] text-white font-medium leading-relaxed italic">
                      "{activeItem.fullQuote || activeItem.quote}"
                    </p>
                  </div>
                </div>

                {/* Student / Mentor Details */}
                <div className="pt-3 sm:pt-5 border-t border-white/15 mt-3 sm:mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-white tracking-tight truncate">
                          {activeItem.name}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-[17px] text-orange-400 font-semibold truncate">
                        {activeItem.role}
                      </p>
                      {activeItem.college && (
                        <p className="text-[11px] sm:text-xs md:text-sm lg:text-sm text-slate-300 truncate mt-0.5">
                          {activeItem.college}
                        </p>
                      )}
                    </div>
                    <div
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-md flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${activeItem.tagColor || '#F97316'}, #1E5BD8)`,
                      }}
                    >
                      {activeItem.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Infinite Review Marquee Ticker */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Header info bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                Click Any Card to Read Full Story
              </span>
              <span className="text-xs text-slate-400">
                {isPaused ? '(Paused)' : 'Hover or tap to pause'}
              </span>
            </div>

            {/* Scrolling Viewport Container */}
            <div
              ref={tickerContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="relative max-h-[480px] sm:max-h-[520px] overflow-hidden rounded-[20px] bg-[#0A1F4D]/60 border border-white/10 p-3 sm:p-4"
            >
              {/* Gradient masks for smooth fade at top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#0B2A5B] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0B2A5B] to-transparent z-10 pointer-events-none" />

              {/* Ticker Track */}
              <div
                className={`flex flex-col gap-3.5 sm:gap-4 ${
                  !prefersReducedMotion && !isPaused ? 'animate-slg-ticker' : ''
                }`}
                style={{ willChange: 'transform' }}
              >
                {duplicatedReviews.map((item, idx) => {
                  const isActive = activeItem.name === item.name;

                  return (
                    <div
                      key={`${item.name}-${idx}`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      onClick={() => handleSelectReview(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectReview(item);
                        }
                      }}
                      className={`relative text-left rounded-xl p-4 sm:p-5 transition-all duration-200 backdrop-blur-sm cursor-pointer select-none active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                        isActive
                          ? 'bg-white/20 border-2 border-orange-400 shadow-lg ring-1 ring-orange-400/40'
                          : 'bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                          style={{ backgroundColor: item.tagColor || '#16A34A' }}
                        >
                          {item.tag}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(item.rating || 5)].map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className="w-3.5 h-3.5 fill-orange-400 text-orange-400"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          {isActive && (
                            <span className="text-[11px] font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-full hidden sm:inline">
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base md:text-base lg:text-[16px] xl:text-[17px] text-slate-100 font-normal leading-relaxed mb-3 line-clamp-2">
                        "{item.quote}"
                      </p>

                      <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-sm sm:text-base md:text-base font-bold text-white">{item.name}</span>
                          <span className="text-slate-300 text-xs sm:text-xs md:text-sm">{item.role}</span>
                        </div>
                        <span className="text-orange-400 text-xs sm:text-xs md:text-sm font-semibold inline-flex items-center gap-1 hover:underline">
                          <span>{isActive ? 'Showing' : 'View full'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PHONE SCREEN LAYOUT (md:hidden)                                */}
        {/* Single Full Feedback Card that Scrolls Right to Left Infinitely*/}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden w-full flex flex-col items-center">
          {/* Card Carousel Viewport */}
          <div
            className="w-full overflow-hidden rounded-[20px] relative select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsMobilePaused(true)}
            onMouseLeave={() => setIsMobilePaused(false)}
          >
            {/* Sliding Track - moves right to left smoothly */}
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex w-full ${
                isTransitioning ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : 'transition-none'
              }`}
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
                willChange: 'transform',
              }}
            >
              {mobileSlides.map((item, idx) => (
                <div key={`${item.name}-mobile-${idx}`} className="w-full flex-shrink-0 px-1">
                  <div className="relative bg-white/10 backdrop-blur-md rounded-[20px] p-5 sm:p-6 border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[360px]">
                    {/* Background Ambient Glow Accents */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#1E5BD8]/25 rounded-full blur-3xl pointer-events-none" />

                    <div>
                      {/* Top Badge & Rating Row */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider"
                          style={{
                            backgroundColor: `${item.tagColor || '#16A34A'}25`,
                            color: item.tagColor === '#16A34A' ? '#4ADE80' : item.tagColor || '#FB923C',
                            borderColor: `${item.tagColor || '#16A34A'}40`,
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{item.tag}</span>
                        </span>

                        <div className="flex items-center gap-1" aria-label={`${item.rating || 5} out of 5 stars`}>
                          {[...Array(item.rating || 5)].map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-4 h-4 fill-orange-400 text-orange-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quote with Icon */}
                      <div className="relative mb-5">
                        <Quote className="w-8 h-8 text-orange-400/40 mb-2 rotate-180" />
                        <p className="text-[15px] sm:text-base text-white font-medium leading-relaxed italic">
                          "{item.fullQuote || item.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Student / Mentor Details */}
                    <div className="pt-4 border-t border-white/15 mt-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                              {item.name}
                            </h3>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          </div>
                          <p className="text-xs sm:text-sm text-orange-400 font-semibold truncate">
                            {item.role}
                          </p>
                          {item.college && (
                            <p className="text-[11px] sm:text-xs text-slate-300 truncate mt-0.5">
                              {item.college}
                            </p>
                          )}
                        </div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.tagColor || '#F97316'}, #1E5BD8)`,
                          }}
                        >
                          {item.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls: Arrows + Dots + Counter */}
          <div className="w-full flex items-center justify-between mt-4 px-2 select-none">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevMobileSlide}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 active:scale-90 text-white flex items-center justify-center transition-all duration-200 border border-white/15 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5" aria-label="Testimonial navigation dots">
              {allReviews.map((_, dotIdx) => {
                const isActive = activeMobileIndex === dotIdx;
                return (
                  <button
                    key={`dot-${dotIdx}`}
                    onClick={() => {
                      setIsTransitioning(true);
                      setMobileIndex(dotIdx);
                    }}
                    aria-label={`Go to testimonial ${dotIdx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-6 h-2 bg-orange-500 shadow-sm'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextMobileSlide}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 active:scale-90 text-white flex items-center justify-center transition-all duration-200 border border-white/15 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Mobile swipe hint & counter */}
          <div className="mt-2 flex items-center justify-between w-full px-3 text-[11px] text-slate-400">
            <span>Swipe or auto-scroll</span>
            <span className="font-semibold text-orange-400">
              {`0${activeMobileIndex + 1} / 0${allReviews.length}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
