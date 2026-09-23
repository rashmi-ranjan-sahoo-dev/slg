import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/content';
import WhyJoinItem from './WhyJoinItem';
import StoryModal from './StoryModal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const seeMoreBtnRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

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
      className="relative pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 bg-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Bar, Paragraph, Actions Row, Button */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] xl:text-[52px] 2xl:text-[58px] font-extrabold text-[#0A1F4D] tracking-tight leading-[1.12]"
            >
              Share Your Story. <br />
              Guide the Next Generation.
            </h2>

            <div
              ref={barRef}
              className="mt-3 sm:mt-4 w-20 sm:w-28 h-2 sm:h-2.5 bg-orange-500 rounded-full"
            />

            <p
              ref={paragraphRef}
              className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-[18px] xl:text-xl text-slate-600 leading-relaxed max-w-lg font-normal"
            >
              {ABOUT_CONTENT.paragraph}
            </p>

            {/* Actions Row: YouTube link on Left, See more popup button on Right */}
            <div
              ref={actionsRef}
              className="mt-4 sm:mt-5 w-full max-w-lg flex items-center justify-between gap-3 pt-2 sm:pt-3 pb-1 border-t border-slate-100"
            >
              {/* YouTube Link on Left */}
              <a
                href={ABOUT_CONTENT.youtubeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch how sharing your story impacts students on YouTube"
                className="youtube-card-btn inline-flex items-center gap-2 sm:gap-2.5 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2 sm:py-2.5 text-base sm:text-lg md:text-[18px] lg:text-[18px] xl:text-xl font-bold text-[#FF0000] hover:text-[#CC0000] font-['Poppins'] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all active:scale-[0.97] group/yt select-none"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[#FF0000] group-hover/yt:scale-110 transition-transform duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </span>
                <span>YouTube</span>
              </a>

              {/* See more button triggers StoryModal popup */}
              <button
                type="button"
                id="share-story-see-more-btn"
                ref={seeMoreBtnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                aria-haspopup="dialog"
                aria-expanded={isModalOpen}
                className="see-more-btn inline-flex items-center justify-center gap-2 sm:gap-2.5 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2 sm:py-2.5 text-base sm:text-lg md:text-[18px] lg:text-[18px] xl:text-xl font-bold text-orange-500 font-['Poppins'] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 select-none"
              >
                <span>See more</span>
                <span className="see-more-arrow-wrap inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8] origin-center" />
                </span>
              </button>
            </div>

            <a
              ref={buttonRef}
              href={ABOUT_CONTENT.buttonLink}
              className="mt-4 sm:mt-5 inline-flex items-center gap-3 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base md:text-base lg:text-base xl:text-lg tracking-wider uppercase transition-all shadow-md hover:shadow-xl"
            >
              <span>{ABOUT_CONTENT.buttonText}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.8]" />
            </a>
          </div>

          {/* Thin Vertical Divider (Desktop) / Horizontal (Mobile) */}
          <div className="lg:col-span-1 hidden lg:flex justify-center h-full self-stretch">
            <div
              ref={dividerRef}
              className="w-[1.5px] h-full min-h-[380px] bg-slate-200"
            />
          </div>
          <div className="lg:hidden w-full h-[1.5px] bg-slate-200 my-4" />

          {/* Right Column: Why Join Us? + List + Mentor Photo taking total width of right side */}
          <div className="lg:col-span-6 w-full">
            <h3
              ref={whyHeadingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-4xl font-extrabold text-[#0A1F4D] tracking-tight mb-4 sm:mb-5 text-left"
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
              <div className="sm:col-span-5 flex flex-col items-center sm:items-end mt-4 sm:mt-0 w-full">
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

      {/* Story Popup Modal with Original Pictures */}
      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        extraContent={ABOUT_CONTENT.extraContent}
      />
    </section>
  );
}
