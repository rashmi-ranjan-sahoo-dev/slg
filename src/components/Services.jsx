import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_CONTENT } from '../data/content';
import ServiceCard from './ServiceCard';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const headingRef = useRef(null);
  const subheadRef = useRef(null);
  const cardsRef = useRef([]);
  const badgesRef = useRef([]);

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            leftLineRef.current,
            rightLineRef.current,
            headingRef.current,
            subheadRef.current,
            cardsRef.current,
            badgesRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, scaleX: 1 }
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

      // 1. Heading lines expand from center
      tl.fromTo(
        [leftLineRef.current, rightLineRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Heading text fade up
      tl.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // 3. Subheading fade
      tl.fromTo(
        subheadRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // 4. Cards stagger up
      tl.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 5. Badges pop with back.out
      tl.fromTo(
        badgesRef.current,
        { scale: 0 },
        {
          scale: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.5'
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-28 bg-[#0B2A5B] text-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header with enlarged typography */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6">
            <span
              ref={leftLineRef}
              className="w-12 sm:w-20 md:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-right"
            />
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white"
            >
              {SERVICES_CONTENT.heading}
            </h2>
            <span
              ref={rightLineRef}
              className="w-12 sm:w-20 md:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-left"
            />
          </div>

          <p
            ref={subheadRef}
            className="mt-4 text-base sm:text-xl md:text-2xl font-medium text-slate-200 tracking-wide"
          >
            {SERVICES_CONTENT.subheading}
          </p>
        </div>

        {/* 3 Services Cards Grid - wider and taking total width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 w-full">
          {SERVICES_CONTENT.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
              badgeRef={(el) => (badgesRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
