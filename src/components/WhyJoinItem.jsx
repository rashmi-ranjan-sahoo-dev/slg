import React from 'react';
import { User, Lightbulb, Megaphone, BookOpen, Users } from 'lucide-react';

const ICON_COMPONENTS = {
  User,
  Lightbulb,
  Megaphone,
  BookOpen,
  Users,
};

export default function WhyJoinItem({ item, itemRef }) {
  const IconComponent = ICON_COMPONENTS[item.icon] || User;

  return (
    <li
      ref={itemRef}
      className="flex items-center gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-5 py-1.5 lg:py-1.5 xl:py-2 transition-transform duration-200 hover:translate-x-1.5"
    >
      {/* Pastel circular badge */}
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-13 lg:h-13 xl:w-15 xl:h-15 rounded-full flex-shrink-0 flex items-center justify-center shadow-xs"
        style={{ backgroundColor: item.bgColor }}
      >
        <IconComponent
          className="w-6 h-6 sm:w-7 sm:h-7 lg:w-6.5 lg:h-6.5 xl:w-7.5 xl:h-7.5 stroke-[2.2]"
          style={{ color: item.iconColor }}
        />
      </div>
      <span className="text-base sm:text-lg md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.2rem] font-bold text-slate-700 leading-snug">
        {item.text}
      </span>
    </li>
  );
}
