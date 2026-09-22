import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// When the card opens → smoothly expand it, show the content, rotate the arrow, and adjust scrolling.
// When the card closes → smoothly collapse it, hide the content, and rotate the arrow back.

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let refreshTimer = null;
const debouncedScrollTriggerRefresh = (delay = 100) => {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
};

export function useExpandableCard({
  isOpen,
  panelRef,
  contentRef,
  arrowRef,
  cardRef,
}) {
  const isFirstRender = useRef(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    const arrow = arrowRef.current;
    const card = cardRef.current;

    if (!panel || !content) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isOpen) {
        gsap.set(panel, { height: 0, visibility: 'hidden' });
        gsap.set(content, { opacity: 0, y: 0 });
        if (arrow) gsap.set(arrow, { rotation: 0 });
        return;
      }
    }

    if (isOpen) {
      // KILL any running tweens before starting
      gsap.killTweensOf([panel, content]);
      if (arrow) gsap.killTweensOf(arrow);

      if (prefersReducedMotion) {
        gsap.set(panel, { height: 'auto', visibility: 'visible' });
        gsap.set(content, { opacity: 1, y: 0 });
        if (arrow) gsap.set(arrow, { rotation: -90 });
        debouncedScrollTriggerRefresh(50);
      } else {
        gsap.set(panel, { visibility: 'visible' });

        // Smooth open: animate height to "auto" so GSAP leaves height: auto
        gsap.to(panel, {
          height: 'auto',
          duration: 0.55,
          ease: 'power3.out',
          onComplete: () => {
            debouncedScrollTriggerRefresh(50);
          },
        });

        // Inner content fade up
        gsap.fromTo(
          content,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: 0.1,
            ease: 'power3.out',
          }
        );

        // Arrow rotates -90deg (pointing up)
        if (arrow) {
          gsap.to(arrow, {
            rotation: -90,
            duration: 0.4,
            ease: 'power2.out',
          });
        }

        // Phones auto-scroll gently into view if bottom extends below viewport
        if (typeof window !== 'undefined' && window.innerWidth < 768 && card) {
          const rect = card.getBoundingClientRect();
          const targetAdditionalHeight = panel.scrollHeight - (panel.offsetHeight || 0);
          const predictedBottom = rect.bottom + Math.max(0, targetAdditionalHeight);
          const viewportHeight = window.innerHeight;
          const stickyHeaderOffset = 80;
          const bottomMargin = 24;

          if (predictedBottom > viewportHeight) {
            const overflowBottom = predictedBottom - viewportHeight + bottomMargin;
            const maxScrollDown = rect.top - stickyHeaderOffset;
            const scrollByAmount = Math.min(overflowBottom, Math.max(0, maxScrollDown));

            if (scrollByAmount > 8) {
              gsap.to(window, {
                scrollTo: {
                  y: window.scrollY + scrollByAmount,
                  autoKill: true,
                },
                duration: 0.6,
                ease: 'power2.out',
              });
            }
          }
        }
      }
    } else {
      // CLOSE
      gsap.killTweensOf([panel, content]);
      if (arrow) gsap.killTweensOf(arrow);

      if (prefersReducedMotion) {
        gsap.set(panel, { height: 0, visibility: 'hidden' });
        gsap.set(content, { opacity: 0, y: 0 });
        if (arrow) gsap.set(arrow, { rotation: 0 });
        debouncedScrollTriggerRefresh(50);
      } else {
        // Fade content out slightly faster
        gsap.to(content, {
          opacity: 0,
          y: 8,
          duration: 0.25,
          ease: 'power2.inOut',
        });

        // Animate panel height down to 0 from current offsetHeight
        gsap.fromTo(
          panel,
          { height: panel.offsetHeight },
          {
            height: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(panel, { visibility: 'hidden', height: 0 });
              debouncedScrollTriggerRefresh(50);
            },
          }
        );

        // Arrow rotates back to 0deg (pointing right)
        if (arrow) {
          gsap.to(arrow, {
            rotation: 0,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      }
    }
  }, [isOpen, prefersReducedMotion]);
}
