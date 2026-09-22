import React, { useRef, useState } from 'react';
import {
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
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

  // Active full card state - defaults to the spotlight story
  const [activeItem, setActiveItem] = useState(spotlight);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Combine spotlight and ticker items so all reviews are in ticker and selectable
  const allReviews = [
    {
      id: 'spotlight-default',
      ...spotlight,
    },
    ...tickerReviews,
  ];

  // Duplicate the array for seamless infinite vertical marquee
  const duplicatedReviews = [...allReviews, ...allReviews];

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, subheadRef.current, spotlightRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Initial ScrollTrigger entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        [leftLineRef.current, rightLineRef.current],
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
        )
        .fromTo(
          spotlightRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Handle clicking a card in the marquee to update the full feedback card
  const handleSelectReview = (review) => {
    if (activeItem.name === review.name) return;

    if (prefersReducedMotion) {
      setActiveItem(review);
      return;
    }

    const container = spotlightInnerRef.current;
    if (container) {
      // Smooth GSAP crossfade & subtle vertical shift
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

    // On phone / tablet viewports, smoothly scroll the full card into view
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

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

        {/* 2-Column Responsive Layout: Left Full Feedback Card + Right Infinite Review Ticker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
          {/* LEFT COLUMN: Full Feedback Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              ref={spotlightRef}
              className="relative bg-white/10 backdrop-blur-md rounded-[20px] p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col justify-between flex-grow overflow-hidden min-h-[380px] sm:min-h-[420px]"
            >
              {/* Background Ambient Glow Accents */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#1E5BD8]/25 rounded-full blur-3xl pointer-events-none" />

              {/* Animated Inner Content Container */}
              <div ref={spotlightInnerRef} className="flex flex-col justify-between h-full will-change-transform">
                <div>
                  {/* Top Badge & Rating Row */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-[13px] font-bold border uppercase tracking-wider transition-colors duration-200"
                      style={{
                        backgroundColor: `${activeItem.tagColor || '#16A34A'}25`,
                        color: activeItem.tagColor === '#16A34A' ? '#4ADE80' : activeItem.tagColor || '#FB923C',
                        borderColor: `${activeItem.tagColor || '#16A34A'}40`,
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{activeItem.tag}</span>
                    </span>

                    <div className="flex items-center gap-1" aria-label={`${activeItem.rating} out of 5 stars`}>
                      {[...Array(activeItem.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-orange-400 text-orange-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote with Icon */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400/40 mb-2 rotate-180" />
                    <p className="text-base sm:text-lg md:text-[19px] text-white font-medium leading-relaxed italic">
                      "{activeItem.fullQuote || activeItem.quote}"
                    </p>
                  </div>
                </div>

                {/* Student / Mentor Details */}
                <div className="pt-5 border-t border-white/15 mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                          {activeItem.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      </div>
                      <p className="text-sm sm:text-base text-orange-400 font-semibold truncate">
                        {activeItem.role}
                      </p>
                      {activeItem.college && (
                        <p className="text-xs sm:text-sm text-slate-300 truncate mt-0.5">
                          {activeItem.college}
                        </p>
                      )}
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0"
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
          <div className="lg:col-span-7 flex flex-col justify-center">
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
                style={{
                  willChange: 'transform',
                }}
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

                      <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed mb-3 line-clamp-2">
                        "{item.quote}"
                      </p>

                      <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-slate-300 text-xs">{item.role}</span>
                        </div>
                        <span className="text-orange-400 text-xs font-semibold inline-flex items-center gap-1 hover:underline">
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
      </div>
    </section>
  );
}
