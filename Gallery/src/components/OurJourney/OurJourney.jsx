import React, { useEffect, useRef } from 'react';
import  journeyData  from './journeyData';
import { initJourneyAnimations } from './ourJourneyAnimation';
import styles from './OurJourney.module.css';

/**
 * Renders the story paragraphs split on \n\n so you can write
 * multi-paragraph stories in journeyData.js simply by leaving a blank line.
 */
const StoryText = ({ text }) => (
    <div className={styles.description}>
        {text.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
        ))}
    </div>
);

const OurJourney = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = initJourneyAnimations(sectionRef.current);
        return () => ctx && ctx.revert();
    }, []);

    return (
        <section className={styles.journeySection} ref={sectionRef}>

            {/* ── Header ── */}
            <div className={styles.header}>
                <div className={styles.headerBadge}>
                    <span>✦</span> our timeline <span>✦</span>
                </div>
                <h2 className={styles.mainTitle}>
                    Our <em>Journey</em> Together
                </h2>
                <div className={styles.headerDivider}>
                    <div className={styles.headerDividerLine} />
                    <div className={styles.headerDividerDot}  />
                    <div className={styles.headerDividerLine} />
                </div>
            </div>

            {/* ── Spine line (desktop) ── */}
            <div className={styles.spine} aria-hidden="true" />

            {/* ── Rows ── */}
            <div className={styles.journeyContainer}>
                {journeyData.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.journeyRow}${index % 2 !== 0 ? ` ${styles.reverse}` : ''}`}
                    >
                        {/* Image */}
                        <div className={styles.imageBox}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.image}
                                loading="lazy"
                            />
                            <div className={styles.imageShimmer} aria-hidden="true" />
                        </div>

                        {/* Content */}
                        <div className={styles.contentBox}>
                            {item.tag && (
                                <div className={styles.tagPill}>{item.tag}</div>
                            )}
                            <span className={styles.indexNum}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={styles.date}>{item.date}</span>
                            <h3 className={styles.title}>{item.title}</h3>
                            <div className={styles.contentDivider}>
                                <div className={styles.contentDividerLine} />
                                <div className={styles.contentDividerDot}  />
                            </div>
                            <StoryText text={item.desc} />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default OurJourney;
