import gsap from 'gsap';
 
/**
 * Cinematic entrance — card rises from below with a spring,
 * orbs drift in slightly afterwards.
 */
export const animateEntrance = (card) => {
    // Start state
    gsap.set(card, { opacity: 0, y: 60, scale: 0.94, rotateX: 8 });
 
    gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.3,
        ease: 'expo.out',
        clearProps: 'rotateX', // clean up 3d after entrance
    });
};
 
/**
 * Shake on wrong credentials — horizontal wobble then settles.
 */
export const animateError = (card) => {
    // Flash a rose border tint
    gsap.to(card, {
        boxShadow: '0 0 0 2px rgba(232,105,138,0.6), 0 40px 80px rgba(0,0,0,0.5)',
        duration: 0.15,
        yoyo: true,
        repeat: 3,
    });
 
    gsap.timeline()
        .to(card, { x: -12, duration: 0.08, ease: 'power2.out' })
        .to(card, { x:  12, duration: 0.08 })
        .to(card, { x:  -8, duration: 0.07 })
        .to(card, { x:   8, duration: 0.07 })
        .to(card, { x:  -4, duration: 0.06 })
        .to(card, { x:   0, duration: 0.06, ease: 'power2.inOut' });
};
 
/**
 * Exit — card lifts and fades out as user is redirected.
 */
export const animateExit = (card, onComplete) => {
    gsap.to(card, {
        opacity: 0,
        y: -40,
        scale: 1.04,
        duration: 0.65,
        ease: 'power3.in',
        onComplete,
    });
};
 