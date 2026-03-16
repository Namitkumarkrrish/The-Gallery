import gsap from "gsap";
 
/**
 * animateNavEntrance
 * Cinematic entrance: nav bar slides down, logo fades in, links stagger in.
 *
 * @param {HTMLElement} nav
 * @param {HTMLElement} logo
 * @param {HTMLElement[]} links
 */
export const animateNavEntrance = (nav, logo, links) => {
  if (!nav) return;
 
  // Set initial states
  gsap.set(nav,   { y: -90, opacity: 0 });
  gsap.set(logo,  { x: -20, opacity: 0 });
  gsap.set(links, { y: -12, opacity: 0 });
 
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
 
  tl
    // Bar slides down
    .to(nav, {
      y: 0,
      opacity: 1,
      duration: 0.9,
    })
    // Logo drifts in from left
    .to(logo, {
      x: 0,
      opacity: 1,
      duration: 0.7,
    }, "-=0.55")
    // Links stagger in from above
    .to(links, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.5,
    }, "-=0.45");
};