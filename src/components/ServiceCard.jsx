import React from 'react';
import { GraduationCap, Users, Briefcase, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Users: Users,
  Briefcase: Briefcase,
};

export default function ServiceCard({
  service,
  index,
  cardRef,
  badgeRef,
}) {
  const IconComponent = ICON_MAP[service.icon] || GraduationCap;

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-[14px] overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col items-center text-center cursor-pointer active:scale-[0.98] w-full"
    >
      {/* Top Image taking TOTAL WIDTH of the card */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-slate-100">
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
        className="-mt-10 sm:-mt-11 relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white shadow-md border-[4px] sm:border-[5px] border-white transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: service.badgeBg }}
      >
        <IconComponent className="w-10 h-10 sm:w-11 sm:h-11 stroke-[2.2]" />
      </div>

      {/* Body Content with larger font size */}
      <div className="p-6 sm:p-8 pt-4 flex flex-col items-center flex-grow w-full">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1F4D] tracking-tight mb-3">
          {service.title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-[320px] flex-grow font-normal">
          {service.description}
        </p>

        {/* Bottom Orange Arrow */}
        <div className="mt-6 text-orange-500 transition-transform duration-300 group-hover:translate-x-2 flex items-center justify-center w-9 h-9">
          <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.8]" />
        </div>
      </div>
    </div>
  );
}
