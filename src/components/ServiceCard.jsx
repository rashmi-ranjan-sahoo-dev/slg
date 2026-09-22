import React, { useRef } from 'react';
import {
  GraduationCap,
  Users,
  Briefcase,
  BriefcaseBusiness,
  Presentation,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { useExpandableCard } from '../hooks/useExpandableCard';

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Users: Users,
  Presentation: Presentation,
  Lightbulb: Lightbulb,
  Briefcase: Briefcase,
  BriefcaseBusiness: BriefcaseBusiness,
};

export default function ServiceCard({
  service,
  index,
  isOpen = false,
  onToggle,
  onOpenPopup,
  cardRef,
  badgeRef,
}) {
  const isMiddleCard = index === 1 || service.id === 'expert-insights';

  const localCardRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const buttonRef = useRef(null);

  const IconComponent = ICON_MAP[service.icon] || GraduationCap;
  const titleId = `service-title-${service.id}`;
  const panelId = `service-panel-${service.id}`;
  const buttonId = `service-btn-${service.id}`;

  const setCardRef = (el) => {
    localCardRef.current = el;
    if (typeof cardRef === 'function') {
      cardRef(el);
    } else if (cardRef) {
      cardRef.current = el;
    }
  };

  // Only cards that expand inline use the accordion animation hook
  useExpandableCard({
    isOpen: isMiddleCard ? false : isOpen,
    panelRef,
    contentRef,
    arrowRef,
    cardRef: localCardRef,
  });

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isMiddleCard) {
      onOpenPopup?.(service);
    } else {
      onToggle?.();
    }
  };

  const handleKeyDown = (e) => {
    if (isMiddleCard) {
      return;
    }
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      onToggle?.();
      buttonRef.current?.focus();
    }
  };

  return (
    <div
      ref={setCardRef}
      onKeyDown={handleKeyDown}
      className="group relative bg-white rounded-[14px] overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col items-center text-center w-full"
    >
      {/* Top Image taking TOTAL WIDTH of the card */}
      <div className="relative w-full h-44 sm:h-48 md:h-48 lg:h-48 xl:h-52 overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.alt}
          width="480"
          height="280"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Overlapping Circular Badge */}
      <div
        ref={badgeRef}
        className="-mt-8 sm:-mt-9 relative z-10 w-16 h-16 sm:w-18 sm:h-18 lg:w-18 lg:h-18 rounded-full flex items-center justify-center text-white shadow-md border-[3.5px] sm:border-[4px] border-white transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: service.badgeBg }}
      >
        <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-6 lg:p-5 xl:p-6 pt-3 sm:pt-4 flex flex-col items-center flex-grow w-full">
        <h3
          id={titleId}
          className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold text-[#0A1F4D] tracking-tight mb-2 sm:mb-2.5"
        >
          {service.title}
        </h3>

        <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-slate-600 leading-relaxed max-w-[320px] flex-grow font-normal min-h-[48px] sm:min-h-[52px] flex items-center justify-center">
          {service.description}
        </p>

        {/* Actions Row: YouTube link on Left, See more button on Right */}
        <div className="mt-4 sm:mt-5 w-full flex items-center justify-between gap-2 px-1 sm:px-2 pt-2 border-t border-slate-100">
          {/* YouTube Link on Left */}
          <a
            href={service.youtubeUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${service.title} video on YouTube`}
            className="youtube-card-btn inline-flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-2.5 sm:px-3 py-2 text-[13px] sm:text-[14px] font-semibold text-[#FF0000] hover:text-[#CC0000] font-['Poppins'] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all active:scale-[0.97] group/yt select-none"
          >
            <span className="w-5 h-5 flex items-center justify-center text-[#FF0000] group-hover/yt:scale-110 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </span>
            <span>YouTube</span>
          </a>

          {/* Trigger Button: for middle card opens popup; for others toggles inline */}
          <button
            type="button"
            id={buttonId}
            ref={buttonRef}
            onClick={handleButtonClick}
            aria-expanded={isMiddleCard ? false : isOpen}
            aria-controls={isMiddleCard ? undefined : panelId}
            aria-haspopup={isMiddleCard ? 'dialog' : undefined}
            className="see-more-btn inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] px-2.5 sm:px-3 py-2 text-[13px] sm:text-[14px] font-semibold text-orange-500 font-['Poppins'] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 select-none"
          >
            <span className="relative inline-grid items-center justify-center">
              <span
                className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                  !isMiddleCard && isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                See more
              </span>
              {!isMiddleCard && (
                <span
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  See less
                </span>
              )}
            </span>

            <span className="see-more-arrow-wrap inline-flex items-center justify-center w-5 h-5">
              <ArrowRight
                ref={arrowRef}
                className="w-5 h-5 stroke-[2.8] origin-center"
              />
            </span>
          </button>
        </div>

        {/* Collapsible Panel Opens Below Button (only for non-popup cards) */}
        {!isMiddleCard && (
          <div
            id={panelId}
            ref={panelRef}
            role="region"
            aria-labelledby={titleId}
            aria-hidden={!isOpen}
            inert={!isOpen}
            className="w-full overflow-hidden"
            style={{ height: 0, visibility: 'hidden' }}
          >
            <div ref={contentRef} className="pt-4 flex flex-col items-center px-1 pb-2">
              {/* Thin short orange divider line (about 40px wide) with ~16px spacing */}
              <div className="w-10 h-[2px] bg-orange-500 rounded-full mb-3.5" />

              {/* Expanded Copy */}
              <div className="text-[13px] md:text-[14px] font-normal font-['Poppins'] text-slate-500 text-center leading-[1.65] max-w-[340px] space-y-2.5">
                {Array.isArray(service.moreParagraphs) ? (
                  service.moreParagraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : (
                  <p className="whitespace-pre-line">{service.moreText}</p>
                )}

                {service.tagline && (
                  <p className="font-semibold text-orange-600 text-[12.5px] sm:text-[13px] pt-1 tracking-wide">
                    {service.tagline}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
