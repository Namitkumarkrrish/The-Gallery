import gsap from 'gsap';

/**
 * openModalAnim
 * Overlay fades in, modal slides up from below (mobile sheet feel),
 * then text elements stagger in.
 */
export const openModalAnim = (modalEl, contentEl) => {
    const isMobile = window.innerWidth <= 768;

    gsap.set(modalEl,   { display: 'flex', opacity: 0 });
    gsap.set(contentEl, {
        opacity: 0,
        y: isMobile ? 60 : 30,
        scale: isMobile ? 1 : 0.97,
    });

    const tl = gsap.timeline();

    tl.to(modalEl, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
    })
    .to(contentEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.55 : 0.5,
        ease: isMobile ? 'expo.out' : 'power3.out',
    }, '-=0.2');
};

/**
 * closeModalAnim
 * Content slides down / shrinks, overlay fades out.
 */
export const closeModalAnim = (modalEl, contentEl, onComplete) => {
    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline({ onComplete });

    tl.to(contentEl, {
        opacity: 0,
        y:     isMobile ? 50 : 20,
        scale: isMobile ? 1 : 0.97,
        duration: 0.35,
        ease: 'power2.in',
    })
    .to(modalEl, {
        opacity: 0,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => gsap.set(modalEl, { display: 'none' }),
    }, '-=0.15');
};