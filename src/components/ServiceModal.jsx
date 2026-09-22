import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Users,
  Presentation,
  BriefcaseBusiness,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ICON_MAP = {
  GraduationCap,
  Users,
  Presentation,
  Briefcase,
  BriefcaseBusiness,
};

export default function ServiceModal({ service, isOpen, onClose }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isClosingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClose = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (prefersReducedMotion) {
      isClosingRef.current = false;
      onCloseRef.current?.();
      return;
    }

    // Exit animation: smooth fade and slight scale down
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }

    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.96,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          isClosingRef.current = false;
          onCloseRef.current?.();
        },
      });
    } else {
      isClosingRef.current = false;
      onCloseRef.current?.();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      isClosingRef.current = false;
      return;
    }

    previousFocusRef.current = document.activeElement;

    // Lock body scroll only on desktop to prevent mobile viewport/address-bar jumps
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const originalOverflow = document.body.style.overflow;
    if (isDesktop) {
      document.body.style.overflow = 'hidden';
    }

    // Focus close button gently without scroll jump
    setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 50);

    // Smooth, glitch-free entrance animation
    if (prefersReducedMotion) {
      if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1 });
      if (modalRef.current) gsap.set(modalRef.current, { opacity: 1, scale: 1, y: 0 });
    } else {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.96, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'power2.out' }
        );
      }
    }

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (isDesktop) {
        document.body.style.overflow = originalOverflow;
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen, prefersReducedMotion]);

  if (!isOpen || !service) return null;

  const IconComponent = ICON_MAP[service.icon] || Presentation;

  const modalContent = (
    <div
      id="service-popup-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
      aria-describedby="modal-service-desc"
      className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex items-center justify-center overscroll-contain"
    >
      {/* Backdrop with touch-none to prevent background scrolling on mobile */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity cursor-pointer touch-none"
        aria-hidden="true"
      />

      {/* Modal Dialog Card: max-h-[90vh] ensures it fits all mobile screens perfectly */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-[20px] shadow-2xl overflow-hidden z-10 my-auto border border-slate-100 flex flex-col will-change-transform"
      >
        {/* Top Header Image: slightly more compact on mobile to maximize copy space */}
        <div className="relative w-full h-36 sm:h-48 flex-shrink-0 bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.alt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Close Button Top-Right */}
          <button
            type="button"
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Circular Icon Badge */}
        <div
          className="-mt-8 sm:-mt-10 relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-lg border-[3px] sm:border-[4px] border-white flex-shrink-0"
          style={{ backgroundColor: service.badgeBg }}
        >
          <IconComponent className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.2]" />
        </div>

        {/* Modal Body Content: scrollable if on small phone screens */}
        <div className="p-5 sm:p-8 pt-2 flex flex-col items-center text-center overflow-y-auto overscroll-contain flex-1">
          <span className="inline-flex items-center px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1E5BD8] tracking-wider uppercase mb-1.5 sm:mb-2">
            Featured Service
          </span>

          <h3
            id="modal-service-title"
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A1F4D] tracking-tight"
          >
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm md:text-base font-medium text-orange-500 mt-1">
            {service.description}
          </p>

          {/* Orange Accent Divider */}
          <div className="w-10 sm:w-12 h-1 bg-orange-500 rounded-full my-3 sm:my-4 flex-shrink-0" />

          {/* Detailed Description */}
          <p
            id="modal-service-desc"
            className="text-slate-600 text-[13px] sm:text-[15px] font-normal font-['Poppins'] leading-relaxed text-center sm:text-left"
          >
            {service.moreText}
          </p>

          {/* Close Action Button */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 px-6 bg-[#0B2A5B] hover:bg-[#0A1F4D] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex-shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
