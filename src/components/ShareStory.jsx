import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/content';
import WhyJoinItem from './WhyJoinItem';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ShareStory() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const barRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const dividerRef = useRef(null);
  const whyHeadingRef = useRef(null);
  const listItemsRef = useRef([]);
  const photoRef = useRef(null);
  const scriptTextRef = useRef(null);
  const swooshRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headingRef.current,
            barRef.current,
            paragraphRef.current,
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
      className="relative py-20 sm:py-24 md:py-28 bg-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Bar, Paragraph, Button */}
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

            <a
              ref={buttonRef}
              href={ABOUT_CONTENT.buttonLink}
              className="mt-9 sm:mt-10 inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-xl"
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
