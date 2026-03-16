import gsap from 'gsap';

/**
 * Card entrance — rises and unblurs on mount.
 */
export const animateCardEntrance = (card) => {
    if (!card) return;
    gsap.fromTo(
        card,
        { opacity: 0, y: 44, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)', duration: 1.3, ease: 'expo.out' }
    );
};

/**
 * Subtle spring pop when a photo is chosen.
 */
export const animatePhotoPop = (card) => {
    if (!card) return;
    gsap.fromTo(
        card,
        { scale: 0.985 },
        { scale: 1, duration: 0.65, ease: 'back.out(1.6)' }
    );
};

/**
 * Tiny shake when photo is removed.
 */
export const animatePhotoExit = (card) => {
    if (!card) return;
    gsap.timeline()
        .to(card, { x: -6, duration: 0.06, ease: 'power2.out' })
        .to(card, { x:  6, duration: 0.06 })
        .to(card, { x: -4, duration: 0.05 })
        .to(card, { x:  4, duration: 0.05 })
        .to(card, { x:  0, duration: 0.07, ease: 'power2.inOut' });
};