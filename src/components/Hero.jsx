import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import heroStudentsImg from '../assets/images/hero-students.jpg';
import HeroModal from './HeroModal';

export default function Hero({ isLoaded }) {
  const containerRef = useRef(null);
  const verticalsRef = useRef(null);
  const headlineRef = useRef(null);
  const clarityRef = useRef(null);
  const underlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const barRef = useRef(null);
  const seeMoreRef = useRef(null);
  const imageContainerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isLoaded) return;

      if (prefersReducedMotion) {
        gsap.set(
          [
            verticalsRef.current,
            headlineRef.current,
            clarityRef.current,
            subtitleRef.current,
            barRef.current,
            seeMoreRef.current,
            imageContainerRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ delay: 0.05 });

      // Image and shadow remain completely static without animation
      gsap.set(imageContainerRef.current, { opacity: 1, scale: 1 });

      // 2. 3 Verticals fade up
      tl.fromTo(
        verticalsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.05
      );

      // 3. Headline masked reveal
      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.15
      );

      // 3. "Clarity" pops with subtle skew & scale
      tl.fromTo(
        clarityRef.current,
        { scale: 0.85, opacity: 0, skewX: -6 },
        { scale: 1, opacity: 1, skewX: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.35'
      );

      // 4. Orange underline draw under clarity
      tl.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.25'
      );

      // 5. Subtitle fade up
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // 6. Short orange bar draws
      tl.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.25'
      );

      // 6b. See more button fade up
      tl.fromTo(
        seeMoreRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );
    },
    { scope: containerRef, dependencies: [isLoaded, prefersReducedMotion] }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-20 pb-8 sm:pt-22 sm:pb-10 md:pt-22 md:pb-10 lg:pt-24 lg:pb-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 42%, #f4f8fe 75%, #eaf2fc 100%)',
      }}
    >
      {/* Standard Container matching all other sections */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Typography */}
          <div className="lg:col-span-5 z-10 text-left">
            {/* 3 Verticals on top of "From Confusion to Clarity" */}
            <div ref={verticalsRef} className="w-full mb-3 sm:mb-4 select-none">
              {/* Desktop: clean static line with responsive spacing and font */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs md:text-sm font-bold text-[#0A1F4D] tracking-[0.14em] uppercase whitespace-nowrap">
                <span>JOB PLACEMENTS</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span>CAREER GROWTH</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span>SUCCESS</span>
              </div>

              {/* Mobile phone screen: smooth infinite single-line marquee scrolling right to left */}
              <div
                className="md:hidden w-full overflow-hidden relative"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                }}
              >
                <div className="flex w-max animate-hero-marquee-rtl py-0.5">
                  {/* Group 1 (50% of track) */}
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0A1F4D] tracking-[0.16em] uppercase whitespace-nowrap pr-3 flex-shrink-0">
                    <span>JOB PLACEMENTS</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>CAREER GROWTH</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>SUCCESS</span>
                    <span className="text-orange-500 font-black px-1.5">•</span>
                    <span>JOB PLACEMENTS</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>CAREER GROWTH</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>SUCCESS</span>
                    <span className="text-orange-500 font-black px-1.5">•</span>
                  </div>

                  {/* Group 2 (50% of track, exact duplicate for seamless infinite loop) */}
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0A1F4D] tracking-[0.16em] uppercase whitespace-nowrap pr-3 flex-shrink-0" aria-hidden="true">
                    <span>JOB PLACEMENTS</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>CAREER GROWTH</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>SUCCESS</span>
                    <span className="text-orange-500 font-black px-1.5">•</span>
                    <span>JOB PLACEMENTS</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>CAREER GROWTH</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span>SUCCESS</span>
                    <span className="text-orange-500 font-black px-1.5">•</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.85rem] font-extrabold text-[#0A1F4D] tracking-tight leading-[1.12]">
              <span ref={headlineRef} className="block">
                {HERO_CONTENT.titlePrefix}
              </span>
              <span className="relative inline-block mt-1 sm:mt-1.5">
                <span
                  ref={clarityRef}
                  className="text-orange-500 font-black text-[48px] sm:text-[60px] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.75rem] leading-none block tracking-tight"
                >
                  {HERO_CONTENT.titleHighlight}
                </span>
                <span
                  ref={underlineRef}
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-1.5 sm:h-2 bg-orange-500 rounded-full"
                />
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-3 sm:mt-3.5 lg:mt-4 text-base sm:text-lg md:text-[1.15rem] lg:text-[1.25rem] font-semibold text-slate-800 max-w-xl leading-relaxed"
            >
              {HERO_CONTENT.subtitle}
            </p>

            <div
              ref={barRef}
              className="mt-3 sm:mt-3.5 w-16 sm:w-24 h-1.5 sm:h-2 bg-orange-500 rounded-full"
            />

            {/* See more button */}
            <button
              type="button"
              ref={seeMoreRef}
              id="hero-see-more-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
              className="see-more-btn mt-4 sm:mt-5 inline-flex items-center justify-center gap-2 sm:gap-2.5 min-h-[44px] sm:min-h-[48px] px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base md:text-base font-bold text-orange-500 font-['Poppins'] rounded-xl border border-orange-200/80 bg-white/80 backdrop-blur-sm hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 select-none transition-all active:scale-[0.97] shadow-xs hover:shadow-sm"
            >
              <span>See more</span>
              <span className="see-more-arrow-wrap inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8] origin-center" />
              </span>
            </button>
          </div>

          {/* Right Column: Hero Classroom Image - whole image visible without cropping */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-[820px] overflow-hidden rounded-xl md:rounded-2xl"
            >
              <img
                src={heroStudentsImg}
                alt="Students in classroom listening and learning"
                width="1400"
                height="870"
                className="w-full h-auto object-contain block scale-[1.06] origin-right md:scale-100 md:origin-center"
                loading="eager"
                fetchPriority="high"
              />

              {/* Left white shadow/gradient overlay for desktop / screens greater than phone only */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute inset-y-0 left-0 w-16 sm:w-20 lg:w-28 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0.92) 25%, rgba(255, 255, 255, 0.45) 65%, rgba(255, 255, 255, 0) 100%)',
                }}
              />

              {/* Top white shadow/gradient overlay for phone screens */}
              <div
                aria-hidden="true"
                className="md:hidden absolute inset-x-0 top-0 h-14 sm:h-18 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.4) 65%, rgba(255, 255, 255, 0) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Popup Modal */}
      <HeroModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={HERO_CONTENT.popupContent}
      />
    </section>
  );
}
