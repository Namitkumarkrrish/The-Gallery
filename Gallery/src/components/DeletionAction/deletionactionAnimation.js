import gsap from "gsap";

/**
 * revealBtn
 * Called once on mount — springs the button into view.
 * On desktop only, adds a subtle floating loop.
 * Glow pulses continuously on all devices.
 */
export const revealBtn = (btn, glow) => {
  if (!btn || !glow) return;

  gsap.set(btn, { scale: 0.8, opacity: 0 });

  const tl = gsap.timeline();

  tl.to(btn, {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.7)",
  });

  // Subtle float only on desktop (avoids jitter on mobile)
  if (window.innerWidth > 768) {
    tl.to(btn, {
      y: -3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Glow breathes on all devices
  gsap.to(glow, {
    opacity: 0.55,
    scale: 1.25,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

/**
 * hoverBtn
 * Rose/red glow on mouse enter.
 */
export const hoverBtn = (btn, glow) => {
  if (!btn || !glow) return;

  gsap.to(btn, {
    scale: 1.15,
    backgroundColor: "rgba(192, 57, 93, 0.88)",
    boxShadow: "0 0 20px rgba(232, 105, 138, 0.55)",
    borderColor: "rgba(232, 105, 138, 0.8)",
    duration: 0.28,
    ease: "power2.out",
  });

  gsap.to(glow, {
    opacity: 0.85,
    scale: 1.5,
    duration: 0.28,
  });
};

/**
 * leaveBtn
 * Resets button to resting state on mouse leave.
 */
export const leaveBtn = (btn, glow) => {
  if (!btn || !glow) return;

  gsap.to(btn, {
    scale: 1,
    backgroundColor: "rgba(10, 5, 14, 0.75)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
    borderColor: "rgba(232, 105, 138, 0.4)",
    duration: 0.28,
    ease: "power2.inOut",
  });

  gsap.to(glow, {
    opacity: 0.2,
    scale: 1,
    duration: 0.28,
  });
};