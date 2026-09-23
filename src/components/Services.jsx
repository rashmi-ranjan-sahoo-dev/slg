import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_CONTENT, ALLOW_MULTIPLE_OPEN } from '../data/content';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';
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

  const [openCardIds, setOpenCardIds] = useState([]);
  const [popupService, setPopupService] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleToggleCard = (id) => {
    setOpenCardIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id);
      }
      return ALLOW_MULTIPLE_OPEN ? [...prev, id] : [id];
    });
  };

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
      className="relative py-12 md:py-16 lg:py-20 bg-[#0B2A5B] text-white overflow-hidden w-full scroll-mt-16"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header with enlarged typography */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6">
            <span
              ref={leftLineRef}
              className="w-12 sm:w-20 md:w-24 lg:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-right"
            />
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-extrabold tracking-tight text-white"
            >
              {SERVICES_CONTENT.heading}
            </h2>
            <span
              ref={rightLineRef}
              className="w-12 sm:w-20 md:w-24 lg:w-28 h-1 sm:h-1.5 bg-orange-500 rounded-full origin-left"
            />
          </div>

          <p
            ref={subheadRef}
            className="mt-3 sm:mt-3.5 text-base sm:text-lg md:text-xl font-medium text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            {SERVICES_CONTENT.subheading}
          </p>
        </div>

        {/* 3 Services Cards Grid - balanced and responsive across all screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
          {SERVICES_CONTENT.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isOpen={openCardIds.includes(service.id)}
              onToggle={() => handleToggleCard(service.id)}
              onOpenPopup={(svc) => {
                setOpenCardIds([]);
                setPopupService(svc);
              }}
              cardRef={(el) => (cardsRef.current[index] = el)}
              badgeRef={(el) => (badgesRef.current[index] = el)}
            />
          ))}
        </div>
      </div>

      {/* Popup Description Modal for Middle Card */}
      <ServiceModal
        service={popupService}
        isOpen={Boolean(popupService)}
        onClose={() => setPopupService(null)}
      />
    </section>
  );
}
