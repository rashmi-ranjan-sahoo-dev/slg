import React from 'react';
import {
  Mail,
  ArrowUp,
  MapPin,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';
import { FOOTER_CONTENT } from '../data/content';

export default function Footer() {
  const { tagline, scriptNote, quickLinks, servicesLinks, socials, copyright, legal } =
    FOOTER_CONTENT;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const renderSocialIcon = (name) => {
    if (name === 'YouTube') {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    }
    if (name === 'LinkedIn') {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.76-.79 1.76-1.76a1.76 1.76 0 0 0-3.52 0c0 .97.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      );
    }
    if (name === 'Instagram') {
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    }
    return <Mail className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />;
  };

  return (
    <footer className="relative bg-[#061330] text-white border-t border-white/10 overflow-hidden w-full">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E5BD8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pt-10 sm:pt-12 lg:pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 lg:pb-10 border-b border-white/10">
          {/* Column 1: Logo, Brand Mission, & Socials (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo variant="light" className="h-12 sm:h-14 w-auto mb-4" />

            <p className="text-base sm:text-lg md:text-[1.05rem] text-slate-200 leading-relaxed font-normal mb-3 max-w-sm">
              {tagline}
            </p>

            {/* Caveat Handwritten Script Note */}
            <p
              className="text-xl sm:text-2xl md:text-[1.75rem] text-orange-400 font-bold mb-5 tracking-wide"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              "{scriptNote}"
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 hover:bg-orange-500 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 border border-white/10 shadow-xs"
                >
                  {renderSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm sm:text-base md:text-[0.95rem] lg:text-[1rem] text-slate-300 hover:text-orange-400 transition-colors inline-block py-0.5 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E5BD8]" />
              <span>Our Pillars</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {servicesLinks.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-sm sm:text-base md:text-[0.95rem] lg:text-[1rem] text-slate-300 hover:text-orange-400 transition-colors inline-block py-0.5 font-medium"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Overview (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Contact Us</span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base md:text-[0.95rem] lg:text-[1rem] text-slate-200">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contact@slgsolutions.in"
                  className="hover:text-orange-400 transition-colors break-all"
                >
                  contact@slgsolutions.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/919861341427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  +91 98613 41427
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Bhubaneswar, Odisha, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-slate-300">
          <div>{copyright}</div>

          <div className="flex items-center gap-6">
            {legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white transition-all duration-200 active:scale-95 text-slate-200 text-sm sm:text-base font-semibold border border-white/10 cursor-pointer shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
