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
      className="flex items-center gap-4 sm:gap-5 py-2 transition-transform duration-200 hover:translate-x-1.5"
    >
      {/* 56-64px pastel circular badge */}
      <div
        className="w-13 h-13 sm:w-16 sm:h-16 rounded-full flex-shrink-0 flex items-center justify-center shadow-xs"
        style={{ backgroundColor: item.bgColor }}
      >
        <IconComponent
          className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.2]"
          style={{ color: item.iconColor }}
        />
      </div>
      <span className="text-base sm:text-lg md:text-xl lg:text-[19px] xl:text-xl font-bold text-slate-700 leading-snug">
        {item.text}
      </span>
    </li>
  );
}
