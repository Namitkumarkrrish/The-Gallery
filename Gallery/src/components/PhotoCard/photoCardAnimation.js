import gsap from 'gsap';
 
export const hoverCard = (card) => {
    if (!card) return;
    gsap.to(card, { y: -8, scale: 1.02, duration: 0.45, ease: 'power2.out' });
};
 
export const leaveCard = (card) => {
    if (!card) return;
    gsap.to(card, { y: 0, scale: 1, duration: 0.45, ease: 'power2.inOut' });
};
 
export const showDeleteBtn = (wrapper) => {
    if (!wrapper) return;
    gsap.killTweensOf(wrapper);
    gsap.to(wrapper, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
};
 
export const hideDeleteBtn = (wrapper) => {
    if (!wrapper) return;
    gsap.killTweensOf(wrapper);
    gsap.to(wrapper, { opacity: 0, y: -4, duration: 0.3, ease: 'power2.in' });
};
 