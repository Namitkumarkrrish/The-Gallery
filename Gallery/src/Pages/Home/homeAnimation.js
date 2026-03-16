import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
gsap.registerPlugin(ScrollTrigger);
 
/**
 * initHomeAnimations
 * Animates the hero section elements on page load with a cinematic stagger.
 *
 * @param {Object} refs - { hero, badge, title, subtitle, scroll }
 * @returns {gsap.Context} - call ctx.revert() on cleanup
 */
export const initHomeAnimations = ({ hero, badge, title, subtitle, scroll }) => {
    const ctx = gsap.context(() => {
 
        /* ── 1. Master entrance timeline ── */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
 
        // Badge drops in from above
        tl.fromTo(
            badge,
            { y: -30, opacity: 0, scale: 0.9 },
            { y: 0,   opacity: 1, scale: 1, duration: 1.0 }
        )
 
        // Title rises with a split-like feel
        .fromTo(
            title,
            { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            { y: 0,  opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.4 },
            "-=0.5"
        )
 
        // Subtitle fades in
        .fromTo(
            subtitle,
            { y: 20, opacity: 0 },
            { y: 0,  opacity: 1, duration: 0.9 },
            "-=0.8"
        )
 
        // Scroll indicator fades in last
        .fromTo(
            scroll,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.3"
        );
 
        /* ── 2. Parallax: hero title drifts up as you scroll ── */
        gsap.to(title, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end:   "bottom top",
                scrub: 1.5,
            }
        });
 
        /* ── 3. Parallax: subtitle drifts a bit faster ── */
        gsap.to(subtitle, {
            y: -50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end:   "40% top",
                scrub: 1,
            }
        });
 
        /* ── 4. Badge fades out on scroll ── */
        gsap.to(badge, {
            opacity: 0,
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end:   "25% top",
                scrub: true,
            }
        });
 
        /* ── 5. Scroll indicator fades out ── */
        gsap.to(scroll, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "5% top",
                end:   "20% top",
                scrub: true,
            }
        });
 
    }, hero); // scope to hero element
 
    return ctx;
};