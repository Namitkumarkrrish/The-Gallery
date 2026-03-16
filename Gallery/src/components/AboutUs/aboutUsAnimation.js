import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
gsap.registerPlugin(ScrollTrigger);
 
/**
 * initAboutAnimations
 * Scroll-triggered entrance + parallax for the About Us section.
 * Uses gsap.context() for proper React cleanup.
 *
 * @returns {gsap.Context} - call ctx.revert() in useLayoutEffect cleanup
 */
export const initAboutAnimations = (section, image, text) => {
  if (!section || !image || !text) return null;
 
  const ctx = gsap.context(() => {
 
    /* ── Grab all text children for staggered entrance ── */
    const elements = text.querySelectorAll(
      "span, h2, .divider, p, .statItem"
    );
 
    /* ── 1. Main entrance timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   "top 72%",
        toggleActions: "play none none reverse",
      }
    });
 
    // Image slides in from the left
    tl.fromTo(
      image,
      { x: -80, opacity: 0, scale: 0.97 },
      { x: 0,   opacity: 1, scale: 1,   duration: 1.3, ease: "power4.out" }
    )
 
    // Text elements stagger in from below
    .fromTo(
      elements,
      { y: 35, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out"
      },
      "-=0.9"
    );
 
    /* ── 2. Image parallax scroll ── */
    gsap.to(image, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end:   "bottom top",
        scrub: 1.5,
      }
    });
 
    /* ── 3. Decorative borders drift on scroll ── */
    const decors = image.querySelectorAll("div");
    if (decors.length >= 2) {
      gsap.to(decors[0], {
        y: -20, x: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end:   "bottom top",
          scrub: 2,
        }
      });
      gsap.to(decors[1], {
        y: 20, x: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end:   "bottom top",
          scrub: 2,
        }
      });
    }
 
  }, section);
 
  return ctx;
};