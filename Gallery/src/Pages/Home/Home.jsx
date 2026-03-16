import React, { useLayoutEffect, useRef } from 'react';
import AboutUs from '../../components/AboutUs/AboutUs';
import { initHomeAnimations } from './homeAnimation';
import styles from './Home.module.css';
import OurJourney from '../../components/OurJourney/OurJourney';

const Home = () => {
    const heroRef   = useRef(null);
    const badgeRef  = useRef(null);
    const titleRef  = useRef(null);
    const subtitleRef = useRef(null);
    const scrollRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = initHomeAnimations({
            hero:     heroRef.current,
            badge:    badgeRef.current,
            title:    titleRef.current,
            subtitle: subtitleRef.current,
            scroll:   scrollRef.current,
        });
        return () => ctx && ctx.revert();
    }, []);

    return (
        <main className={styles.homeContainer}>

            {/* ── Hero ── */}
            <section className={styles.heroSection} ref={heroRef}>

                {/* Floating petals */}
                <div className={styles.heroPetals}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={styles.petal} />
                    ))}
                </div>

                <div className={styles.heroBadge} ref={badgeRef}>
                    <span>✦</span> a love story <span>✦</span>
                </div>

                <h1 className={styles.heroTitle} ref={titleRef}>
                    Shivaa<br />&amp; <em>Krrish</em>
                </h1>

                <p className={styles.heroSubtitle} ref={subtitleRef}>
                    Our journey, captured in time
                </p>

                <div className={styles.heroScroll} ref={scrollRef}>
                    <div className={styles.scrollLine}></div>
                    <span>scroll</span>
                </div>
            </section>

            {/* ── About Us ── */}
            <AboutUs />
            <OurJourney />
            {/* ── Footer ── */}
            <footer className={styles.homeFooter}>
                <p className={styles.footerText}>Made with ❤️ for Our Memories</p>
            </footer>

        </main>
    );
};

export default Home;
