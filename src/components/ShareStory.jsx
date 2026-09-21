import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/content';
import WhyJoinItem from './WhyJoinItem';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useExpandableCard } from '../hooks/useExpandableCard';

gsap.registerPlugin(ScrollTrigger);

export default function ShareStory() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const barRef = useRef(null);
  const paragraphRef = useRef(null);
  const actionsRef = useRef(null);
  const buttonRef = useRef(null);
  const dividerRef = useRef(null);
  const whyHeadingRef = useRef(null);
  const listItemsRef = useRef([]);
  const photoRef = useRef(null);
  const scriptTextRef = useRef(null);
  const swooshRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const seeMoreBtnRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useExpandableCard({
    isOpen: isExpanded,
    panelRef,
    contentRef,
    arrowRef,
    cardRef: sectionRef,
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isExpanded) {
      e.stopPropagation();
      setIsExpanded(false);
      seeMoreBtnRef.current?.focus();
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headingRef.current,
            barRef.current,
            paragraphRef.current,
            actionsRef.current,
            buttonRef.current,
            dividerRef.current,
            whyHeadingRef.current,
            listItemsRef.current,
            photoRef.current,
            scriptTextRef.current,
            swooshRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, scaleY: 1, scaleX: 1, strokeDashoffset: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Left Column
      tl.fromTo(
        headingRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
        .fromTo(
          barRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.35, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          paragraphRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.25'
        )
        .fromTo(
          actionsRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
          '-=0.2'
        );

      // Button gentle attention pulse
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 24px rgba(249, 115, 22, 0.45)',
        yoyo: true,
        repeat: -1,
        duration: 1.8,
        ease: 'sine.inOut',
        delay: 1.0,
      });

      // Divider & Right Column
      tl.fromTo(
        dividerRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
        .fromTo(
          whyHeadingRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          listItemsRef.current,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .fromTo(
          photoRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          scriptTextRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          swooshRef.current,
          { strokeDashoffset: 120 },
          { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      className="relative py-20 sm:py-24 md:py-28 bg-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Bar, Paragraph, Actions Row, Collapsible Panel, Button */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-extrabold text-[#0A1F4D] tracking-tight leading-[1.1]"
            >
              Share Your Story. <br />
              Guide the Next Generation.
            </h2>

            <div
              ref={barRef}
              className="mt-5 sm:mt-6 w-20 sm:w-28 h-2 sm:h-2.5 bg-orange-500 rounded-full"
            />

            <p
              ref={paragraphRef}
              className="mt-7 sm:mt-8 text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-lg font-normal"
            >
              {ABOUT_CONTENT.paragraph}
            </p>

            {/* Actions Row: YouTube link on Left, See more button on Right */}
            <div
              ref={actionsRef}
              className="mt-6 w-full max-w-lg flex items-center justify-between gap-3 pt-3 pb-1 border-t border-slate-100"
            >
              {/* YouTube Link on Left */}
              <a
                href={ABOUT_CONTENT.youtubeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch how sharing your story impacts students on YouTube"
                className="youtube-card-btn inline-flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-2.5 sm:px-3 py-2 text-[13px] sm:text-[14px] font-semibold text-[#FF0000] hover:text-[#CC0000] font-['Poppins'] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all active:scale-[0.97] group/yt select-none"
              >
                <span className="w-5 h-5 flex items-center justify-center text-[#FF0000] group-hover/yt:scale-110 transition-transform duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </span>
                <span>YouTube</span>
              </a>

              {/* See more / See less Button on Right */}
              <button
                type="button"
                id="share-story-see-more-btn"
                ref={seeMoreBtnRef}
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                aria-controls="share-story-panel"
                className="see-more-btn inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] px-2.5 sm:px-3 py-2 text-[13px] sm:text-[14px] font-semibold text-orange-500 font-['Poppins'] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 select-none"
              >
                <span className="relative inline-grid items-center justify-center">
                  <span
                    className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                      isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    See more
                  </span>
                  <span
                    className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                      isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    See less
                  </span>
                </span>

                <span className="see-more-arrow-wrap inline-flex items-center justify-center w-5 h-5">
                  <ArrowRight
                    ref={arrowRef}
                    className="w-5 h-5 stroke-[2.8] origin-center"
                  />
                </span>
              </button>
            </div>

            {/* Collapsible Panel with Structured Content from Screenshots */}
            <div
              id="share-story-panel"
              ref={panelRef}
              role="region"
              aria-labelledby="share-story-see-more-btn"
              aria-hidden={!isExpanded}
              inert={!isExpanded ? '' : undefined}
              className="w-full max-w-lg overflow-hidden"
              style={{ height: 0, visibility: 'hidden' }}
            >
              <div ref={contentRef} className="pt-4 pb-2 space-y-4">
                {/* Screenshot 1 Content: Guide the Next Generation */}
                {ABOUT_CONTENT.extraContent?.guideGeneration && (
                  <div className="bg-gradient-to-br from-orange-50/70 via-white to-amber-50/30 rounded-2xl p-5 sm:p-6 border border-orange-200/70 shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">
                        Guide the Next Gen
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#0A1F4D] tracking-tight leading-snug">
                      {ABOUT_CONTENT.extraContent.guideGeneration.title}
                    </h4>

                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {ABOUT_CONTENT.extraContent.guideGeneration.paragraph}
                    </p>

                    {/* 3 Pillars */}
                    <div className="mt-3.5 space-y-2 pt-3 border-t border-orange-100/90">
                      {ABOUT_CONTENT.extraContent.guideGeneration.pillars.map((pillar, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                            {pillar}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Callout box */}
                    <div className="mt-3.5 p-3.5 rounded-xl bg-white/95 border border-orange-100/80 shadow-xs">
                      <p className="text-xs sm:text-sm font-bold text-orange-600">
                        {ABOUT_CONTENT.extraContent.guideGeneration.calloutTitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium">
                        {ABOUT_CONTENT.extraContent.guideGeneration.calloutSubtext}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-normal italic">
                        {ABOUT_CONTENT.extraContent.guideGeneration.footerTagline}
                      </p>
                    </div>
                  </div>
                )}

                {/* Screenshot 2 Content: Be Part of the Change */}
                {ABOUT_CONTENT.extraContent?.partOfTheChange && (
                  <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 rounded-2xl p-5 sm:p-6 border border-blue-100/80 shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100/90 text-[#1E5BD8]">
                        Be Part of the Change
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#0A1F4D] tracking-tight leading-snug">
                      {ABOUT_CONTENT.extraContent.partOfTheChange.title}
                    </h4>

                    {/* 3 Principles */}
                    <div className="mt-3 space-y-2">
                      {ABOUT_CONTENT.extraContent.partOfTheChange.guidingPrinciples.map(
                        (principle, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#1E5BD8] flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                              {principle}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    {/* Narrative Paragraphs */}
                    <div className="mt-3.5 space-y-2.5 pt-3 border-t border-blue-100/60 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {ABOUT_CONTENT.extraContent.partOfTheChange.paragraphs.map(
                        (paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <a
              ref={buttonRef}
              href={ABOUT_CONTENT.buttonLink}
              className="mt-6 sm:mt-7 inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-xl"
            >
              <span>{ABOUT_CONTENT.buttonText}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.8]" />
            </a>
          </div>

          {/* Thin Vertical Divider (Desktop) / Horizontal (Mobile) */}
          <div className="lg:col-span-1 hidden lg:flex justify-center h-full self-stretch">
            <div
              ref={dividerRef}
              className="w-[1.5px] h-full min-h-[460px] bg-slate-200"
            />
          </div>
          <div className="lg:hidden w-full h-[1.5px] bg-slate-200 my-4" />

          {/* Right Column: Why Join Us? + List + Mentor Photo taking total width of right side */}
          <div className="lg:col-span-6 w-full">
            <h3
              ref={whyHeadingRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F4D] tracking-tight mb-8 text-left"
            >
              {ABOUT_CONTENT.whyJoinHeading}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8 items-end relative w-full">
              {/* 5 Why Join Items */}
              <div className="sm:col-span-7 z-10">
                <ul className="space-y-4 sm:space-y-5">
                  {ABOUT_CONTENT.benefits.map((item, index) => (
                    <WhyJoinItem
                      key={item.text}
                      item={item}
                      itemRef={(el) => (listItemsRef.current[index] = el)}
                    />
                  ))}
                </ul>
              </div>

              {/* Script Text + Mentor Photo - taking full right width */}
              <div className="sm:col-span-5 flex flex-col items-center sm:items-end mt-6 sm:mt-0 w-full">
                {/* Script handwritten text */}
                <div
                  ref={scriptTextRef}
                  className="script-badge relative z-20 mb-[-10px] sm:mb-[-15px] text-right"
                >
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A5B] leading-[1.0] tracking-wide"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Real People <br />
                    Real Stories <br />
                    Real Impact
                  </p>
                  {/* Hand-drawn swoosh underline */}
                  <svg
                    className="w-32 sm:w-40 h-4 mt-1 ml-auto overflow-visible"
                    viewBox="0 0 120 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={swooshRef}
                      d="M 5 10 C 35 2, 75 14, 115 5"
                      stroke="#F97316"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeDasharray="120"
                      strokeDashoffset="0"
                    />
                  </svg>
                </div>

                {/* Mentor Photo taking total width, bleeding nicely */}
                <div
                  ref={photoRef}
                  className="w-full rounded-none overflow-hidden "
                >
                  <img
                    src={ABOUT_CONTENT.image}
                    alt={ABOUT_CONTENT.imageAlt}
                    width="414"
                    height="400"
                    loading="lazy"
                    className="w-full h-auto object-cover rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
