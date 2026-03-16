import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * initJourneyAnimations
 *
 * Header children stagger in on scroll.
 * Each row: image slides from its side, content children stagger up.
 * On mobile (≤900px) everything slides up — no horizontal flying.
 *
 * Uses gsap.context() scoped to the section for clean React cleanup.
 */
export const initJourneyAnimations = (section) => {
    if (!section) return null;

    const isMobile = window.innerWidth <= 900;

    const ctx = gsap.context(() => {

        /* ── Header ── */
        const header = section.querySelector('[class*="header"]');
        if (header) {
            gsap.from([...header.children], {
                y: 30,
                opacity: 0,
                duration: 0.9,
                stagger: 0.13,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 86%',
                    toggleActions: 'play none none reverse',
                },
            });
        }

        /* ── Rows ── */
        const rows = section.querySelectorAll('[class*="journeyRow"]');

        rows.forEach((row) => {
            const isReversed = [...row.classList].some(c => c.includes('reverse'));
            const imageBox   = row.querySelector('[class*="imageBox"]');
            const contentBox = row.querySelector('[class*="contentBox"]');
            if (!imageBox || !contentBox) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: 'top 83%',
                    toggleActions: 'play none none reverse',
                },
            });

            if (isMobile) {
                // Mobile — simple upward fade for both
                tl.from(imageBox, {
                    y: 40, opacity: 0, duration: 0.95, ease: 'power3.out',
                })
                .from([...contentBox.children], {
                    y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
                }, '-=0.55');
            } else {
                // Desktop — image slides from its natural side
                const xImage = isReversed ? 70 : -70;
                const xText  = isReversed ? -40 : 40;

                tl.from(imageBox, {
                    x: xImage, opacity: 0, scale: 0.97,
                    duration: 1.1, ease: 'power4.out',
                })
                .from([...contentBox.children], {
                    x: xText, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out',
                }, '-=0.75');
            }
        });

    }, section); // scope to section — safe cleanup

    return ctx;
};