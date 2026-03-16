import React, { useRef, useEffect } from "react";
import * as animate from "./deletionactionAnimation";
import styles from "./DeletionAction.module.css";

const DeletionAction = ({ id, onDeleteRequest }) => {
  const btnRef  = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile && btnRef.current && glowRef.current) {
      // Desktop: spring-in reveal + float loop
      animate.revealBtn(btnRef.current, glowRef.current);
    } else if (glowRef.current) {
      // Mobile: just run the glow pulse (button is always visible via CSS)
      import("gsap").then(({ default: gsap }) => {
        gsap.to(glowRef.current, {
          opacity: 0.45,
          scale: 1.2,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }
  }, []);

  const handleHover = () => animate.hoverBtn(btnRef.current, glowRef.current);
  const handleLeave = () => animate.leaveBtn(btnRef.current, glowRef.current);

  return (
    <div className={styles.btnWrapper}>
      <div ref={glowRef} className={styles.pulseGlow} aria-hidden="true" />
      <button
        ref={btnRef}
        className={styles.cardDeleteBtn}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={(e) => onDeleteRequest(e, id)}
        aria-label="Delete memory"
      >
        <span className={styles.icon}>✕</span>
      </button>
    </div>
  );
};

export default DeletionAction;
