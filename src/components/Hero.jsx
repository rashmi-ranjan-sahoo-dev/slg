import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Lightbulb,
  TrendingUp,
  GraduationCap,
  Settings,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
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
  const floatingIconsRef = useRef([]);

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

      // 1. Photo reveal with scale down (starts immediately so user sees hero image at once)
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        0
      );

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

      // 7. Floating icons pop in stagger
      tl.fromTo(
        floatingIconsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: 'back.out(2)',
        },
        '-=0.3'
      );

      // 8. Continuous gentle floating animation for icons
      floatingIconsRef.current.forEach((icon, idx) => {
        if (!icon) return;
        const duration = 2.8 + (idx % 3) * 0.6;
        const yDist = 5 + (idx % 2) * 4;
        gsap.to(icon, {
          y: `-=${yDist}`,
          rotation: (idx % 2 === 0 ? 1 : -1) * (2 + idx),
          duration: duration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: idx * 0.2,
        });
      });
    },
    { scope: containerRef, dependencies: [isLoaded, prefersReducedMotion] }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-28 pb-8 sm:pt-28 md:pt-26 lg:pt-22 overflow-hidden min-h-[90vh] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f7faff 45%, #e9f2fc 100%)',
      }}
    >
      {/* Full bleed grid on desktop */}
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left Column: Typography with generous padding */}
          <div className="lg:col-span-6 z-10 text-left px-6 sm:px-10 lg:pl-16 lg:pr-8 xl:pl-24">
            {/* 3 Verticals on top of "From Confusion to Clarity" */}
            <div ref={verticalsRef} className="w-full mb-4 sm:mb-6 select-none mt-1 sm:mt-0">
              {/* Desktop: clean static line */}
              <div className="hidden md:flex items-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm md:text-[15px] font-bold text-[#0A1F4D] tracking-[0.18em] uppercase">
                <span>JOB PLACEMENTS</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span>CAREER GROWTH</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span>SUCCESS</span>
              </div>

              {/* Mobile phone screen: smooth infinite single-line marquee scrolling left to right */}
              <div
                className="md:hidden w-full overflow-hidden relative"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                }}
              >
                <div className="flex w-max animate-hero-marquee-ltr py-0.5">
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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[76px] font-extrabold text-[#0A1F4D] tracking-tight leading-[1.08]">
              <span ref={headlineRef} className="block">
                {HERO_CONTENT.titlePrefix}
              </span>
              <span className="relative inline-block mt-2">
                <span
                  ref={clarityRef}
                  className="text-orange-500 font-black text-[56px] sm:text-[68px] md:text-[84px] lg:text-[96px] xl:text-[112px] leading-none block tracking-tight"
                >
                  {HERO_CONTENT.titleHighlight}
                </span>
                <span
                  ref={underlineRef}
                  className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-2 sm:h-2.5 bg-orange-500 rounded-full"
                />
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-slate-800 max-w-xl leading-snug"
            >
              {HERO_CONTENT.subtitle}
            </p>

            <div
              ref={barRef}
              className="mt-3 sm:mt-4 w-20 sm:w-28 h-2 sm:h-2.5 bg-orange-500 rounded-full"
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
              className="see-more-btn mt-4 sm:mt-5 inline-flex items-center justify-center gap-2 sm:gap-2.5 min-h-[48px] px-4 sm:px-5 py-2.5 sm:py-3 text-[14px] sm:text-[15px] md:text-base font-bold text-orange-500 font-['Poppins'] rounded-xl border border-orange-200/60 bg-white/70 backdrop-blur-sm hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 select-none transition-all active:scale-[0.97] shadow-sm hover:shadow-md"
            >
              <span>See more</span>
              <span className="see-more-arrow-wrap inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8] origin-center" />
              </span>
            </button>
          </div>

          {/* Right Column: Hero Classroom Image taking TOTAL WIDTH of right half */}
          <div className="lg:col-span-6 relative w-full h-full flex items-center justify-end">
            <div
              ref={imageContainerRef}
              className="relative w-full h-full min-h-[340px] sm:min-h-[440px] lg:min-h-[560px] xl:min-h-[620px] overflow-hidden hero-image-mask"
            >
              <img
                src={heroStudentsImg}
                alt="Students in classroom listening and learning"
                width="754"
                height="566"
                className="w-full h-full object-cover rounded-none"
                loading="eager"
                fetchPriority="high"
              />

              {/* Floating White Line-art Doodle Icons */}
              {/* 1. Lightbulb */}
              <div
                ref={(el) => (floatingIconsRef.current[0] = el)}
                className="absolute top-10 right-24 sm:right-32 lg:right-36 text-white pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 stroke-[2.2]" />
              </div>

              {/* 2. Bar chart / TrendingUp */}
              <div
                ref={(el) => (floatingIconsRef.current[1] = el)}
                className="absolute top-20 right-6 sm:right-12 lg:right-16 text-white pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <TrendingUp className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-[2.2]" />
              </div>

              {/* 3. Graduation Cap */}
              <div
                ref={(el) => (floatingIconsRef.current[2] = el)}
                className="absolute top-8 right-44 sm:right-60 lg:right-72 text-white pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] rotate-[-12deg]"
              >
                <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 stroke-[2.2]" />
              </div>

              {/* 4. Gear / Settings */}
              <div
                ref={(el) => (floatingIconsRef.current[3] = el)}
                className="absolute top-36 right-16 sm:right-24 lg:right-28 text-white pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <Settings className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 stroke-[2.2]" />
              </div>

              {/* 5. Briefcase */}
              <div
                ref={(el) => (floatingIconsRef.current[4] = el)}
                className="absolute top-44 right-32 sm:right-44 lg:right-52 text-white pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <Briefcase className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-[2.2]" />
              </div>
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
