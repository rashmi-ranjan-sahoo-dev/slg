import React from 'react';
import logoImg from '../assets/logo.png';
import logoWhiteImg from '../assets/logo-white.png';

export default function Logo({ className = 'h-14 sm:h-16 md:h-20 w-auto', variant = 'dark' }) {
  const src = variant === 'light' ? logoWhiteImg : logoImg;

  return (
    <a
      href="#home"
      aria-label="SLG Solutions Home"
      className="inline-flex items-center transition-transform duration-200 hover:opacity-90 active:scale-95"
    >
      <img
        src={src}
        alt="SLG Solutions - Job Placements, Career Growth, Success"
        className={`${className} object-contain transition-all duration-200`}
        loading="eager"
      />
    </a>
  );
}
