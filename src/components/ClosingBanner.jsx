import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLOSING_CONTENT } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingBanner() {
  const bannerRef = useRef(null);
  const textContainerRef = useRef(null);
  const headlineRef = useRef(null);
  const orangePartRef = useRef(null);
  const subtextRef = useRef(null);
  const bgImageRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([headlineRef.current, subtextRef.current], { opacity: 1, y: 0 });
        return;
      }

      // Parallax on md and up
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to(bgImageRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Text reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          orangePartRef.current,
          { textShadow: '0 0 0px rgba(249,115,22,0)' },
          {
            textShadow: '0 0 20px rgba(249,115,22,0.6)',
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );

      return () => mm.revert();
    },
    { scope: bannerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="closing-banner"
      ref={bannerRef}
      className="relative min-h-[260px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] overflow-hidden flex items-center bg-[#0B2A5B] w-full"
    >
      {/* Background Skyline Image with Hiker, Sunset, and Skyline - Pinned to right */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={bgImageRef}
          src={CLOSING_CONTENT.image}
          alt={CLOSING_CONTENT.imageAlt}
          width="1364"
          height="278"
          loading="lazy"
          className="w-full h-full object-cover object-right"
        />

        {/* Soft navy transition on left for pristine text readability without washing out sunset */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #0B2A5B 0%, #0B2A5B 28%, rgba(11, 42, 91, 0.9) 40%, rgba(11, 42, 91, 0) 58%)',
          }}
        />
      </div>

      {/* Content Container */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14 md:py-16"
      >
        <div className="max-w-md sm:max-w-lg lg:max-w-xl text-left">
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.12]"
          >
            {CLOSING_CONTENT.headingPart1} <br className="hidden sm:inline" />
            <span ref={orangePartRef} className="text-orange-500 font-black">
              {CLOSING_CONTENT.headingPart2}
            </span>
          </h2>

          <p
            ref={subtextRef}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-200 font-semibold leading-relaxed max-w-md"
          >
            {CLOSING_CONTENT.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
