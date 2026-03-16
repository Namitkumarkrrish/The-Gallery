import React, { useLayoutEffect, useRef } from "react";
import { initAboutAnimations } from "./aboutUsAnimation";
import styles from "./AboutUs.module.css";
import usPhoto from "../../assets/photo.jpeg";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const textRef    = useRef(null);

  useLayoutEffect(() => {
    const ctx = initAboutAnimations(
      sectionRef.current,
      imageRef.current,
      textRef.current
    );
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.container}>

        {/* ── Image Side ── */}
        <div className={styles.imageWrapper} ref={imageRef}>
          <div className={styles.imageDecor}   aria-hidden="true" />
          <div className={styles.imageDecor2}  aria-hidden="true" />
          <div className={styles.imageCorner}  aria-hidden="true" />
          <img src={usPhoto} alt="Shivaa & Krrish" className={styles.mainImage} />
          <div className={styles.imageShimmer} aria-hidden="true" />
        </div>

        {/* ── Content Side ── */}
        <div className={styles.contentWrapper} ref={textRef}>
          <span className={styles.subtitle}>Our Story</span>

          <h2 className={styles.title}>
            The Two of Us
            <em className={styles.titleAccent}>in every frame</em>
          </h2>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerDot}  />
            <div className={styles.dividerLine} />
          </div>

          <p className={styles.description}>
            Welcome to our <strong>digital scrapbook</strong>. This space is more than
            just a gallery — it's a collection of late-night laughs, spontaneous
            adventures, and the quiet moments that define us.
          </p>

          <p className={styles.description}>
            We built this to ensure that even as time moves forward, our
            favorite moments stay <strong>exactly as they were</strong>. Every photo
            here is a heartbeat in our journey together.
          </p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Moments</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Adventures</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Love</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
