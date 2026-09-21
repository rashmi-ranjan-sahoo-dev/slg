import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoWhite from '../assets/logo-white.png';
import heroStudentsImg from '../assets/images/hero-students.jpg';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const [percent, setPercent] = useState(0);

  const readyRef = useRef(false);
  const timerDoneRef = useRef(false);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = 'hidden';

    // 1. Real readiness check (Fonts ready + Hero image preloaded)
    const checkReadiness = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
        const img = new Image();
        img.src = heroStudentsImg;
        if (img.decode) {
          await img.decode().catch(() => {});
        }
      } catch (e) {
        // continue gracefully
      } finally {
        readyRef.current = true;
      }
    };
    checkReadiness();

    // 2. Minimum duration timer (2.2s)
    const minTimer = setTimeout(() => {
      timerDoneRef.current = true;
    }, 2200);

    return () => {
      clearTimeout(minTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Fade in logo & elements
      tl.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate progress percentage
      const progressObj = { val: 0 };
      tl.to(
        progressObj,
        {
          val: 100,
          duration: 2.3,
          ease: 'power1.inOut',
          onUpdate: () => {
            const currentVal = Math.round(progressObj.val);
            setPercent(currentVal);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${currentVal}%`;
            }
          },
          onComplete: () => {
            // Check readiness condition
            const checkAndExit = () => {
              if (readyRef.current && timerDoneRef.current) {
                exitLoader();
              } else {
                setTimeout(checkAndExit, 100);
              }
            };
            checkAndExit();
          },
        },
        '-=0.2'
      );

      const exitLoader = () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          },
        });

        exitTl
          .to(logoRef.current, {
            scale: 1.05,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          })
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.85,
              ease: 'power4.inOut',
            },
            '-=0.15'
          );
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-label="Loading site content"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2A5B] select-none"
      style={{
        background: 'radial-gradient(circle at center, #123A7A 0%, #0B2A5B 70%, #061330 100%)',
      }}
    >
      <div className="flex flex-col items-center px-6 max-w-sm w-full">
        {/* Brand Logo */}
        <div ref={logoRef} className="mb-8 flex flex-col items-center">
          <img
            src={logoWhite}
            alt="SLG Solutions"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mb-3">
          <div
            ref={progressBarRef}
            className="h-full bg-orange-500 rounded-full transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Counter and status */}
        <div className="flex justify-between w-full text-xs font-medium text-white/70 tracking-wider">
          <span className="uppercase text-[11px] text-white/50">Loading Experience</span>
          <span ref={counterRef} className="font-mono text-orange-400 font-semibold">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
