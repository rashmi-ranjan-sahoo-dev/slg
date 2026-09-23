import React, { useRef, useState } from 'react';
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  MessageSquare,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_CONTENT } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const barRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: CONTACT_CONTENT.roles[0],
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const { badge, heading, highlight, subtitle, channels, roles } = CONTACT_CONTENT;

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([leftColRef.current, rightColRef.current], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
      ).fromTo(
        rightColRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    const messageText = `*New Query - SLG Solutions*

*Name:* ${formData.name.trim()}
*Email:* ${formData.email.trim()}
*Category / Role:* ${formData.role}
*Message:* ${formData.message.trim()}`;

    const url = `https://wa.me/919861341427?text=${encodeURIComponent(messageText)}`;
    setWhatsappLink(url);

    // Open WhatsApp in a new tab immediately (handles user gesture cleanly)
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Direct popup prevented, fallback button available', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      role: roles[0],
      message: '',
    });
    setWhatsappLink('');
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 bg-white overflow-hidden w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: Section Info & Direct Contact Cards */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start pt-1">
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-orange-100 text-orange-600 mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>{badge}</span>
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] xl:text-[52px] 2xl:text-[58px] font-extrabold text-[#0A1F4D] tracking-tight leading-[1.12]">
              {heading} <br />
              <span className="text-orange-500">{highlight}</span>
            </h2>

            {/* Orange bar */}
            <div
              ref={barRef}
              className="mt-3 sm:mt-4 w-20 sm:w-28 h-2 sm:h-2.5 bg-orange-500 rounded-full"
            />

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-lg lg:text-[18px] xl:text-xl text-slate-600 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Contact Information Cards */}
            <div className="mt-6 sm:mt-8 w-full space-y-3.5 sm:space-y-4">
              {channels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.link}
                  target={channel.id === 'location' ? '_blank' : undefined}
                  rel={channel.id === 'location' ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-orange-50/60 hover:border-orange-300 transition-all duration-200 shadow-xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-200 shadow-sm">
                    {channel.id === 'email' && <Mail className="w-5 h-5 stroke-[2.2]" />}
                    {channel.id === 'phone' && <PhoneCall className="w-5 h-5 stroke-[2.2]" />}
                    {channel.id === 'location' && <MapPin className="w-5 h-5 stroke-[2.2]" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-500">
                      {channel.title}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#0A1F4D] group-hover:text-orange-600 transition-colors">
                      {channel.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      {channel.hint}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Card */}
          <div ref={rightColRef} className="lg:col-span-7 w-full">
            <div className="bg-slate-50/90 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-lg relative overflow-hidden">
              {isSubmitted ? (
                /* Success Feedback Message */
                <div className="py-10 px-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1F4D] mb-2">
                    Redirecting to WhatsApp...
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#0A1F4D]">{formData.name}</span>! Your query has been compiled. If WhatsApp did not open automatically, click below to send your query directly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md">
                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base transition-all active:scale-95 shadow-md"
                      >
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Continue to WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2A5B] hover:bg-[#0A1F4D] text-white font-bold text-sm sm:text-base transition-all active:scale-95 shadow-md cursor-pointer"
                    >
                      <span>Send Another Query</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A1F4D] tracking-tight">
                      Send Us a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                    >
                      Your Full Name <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Role Category Selector Pills */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                      I am reaching out as a:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {roles.map((r) => {
                        const isSelected = formData.role === r;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setFormData({ ...formData, role: r })}
                            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all border flex items-center justify-between ${
                              isSelected
                                ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{r}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                    >
                      How can we help you? <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your questions, career goals, or collaboration ideas..."
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-xs resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[52px] px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold text-base tracking-wider uppercase transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Redirecting to WhatsApp...</span>
                    ) : (
                      <>
                        <span>Submit Query</span>
                        <ArrowRight className="w-5 h-5 stroke-[2.8]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
