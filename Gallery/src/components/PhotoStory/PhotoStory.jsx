import React, { useLayoutEffect, useRef } from 'react';
import { openModalAnim, closeModalAnim } from './photostoryAnimation';
import styles from './PhotoStory.module.css';

const PhotoStory = ({ selected, onClose }) => {
    const modalRef   = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        if (selected && modalRef.current && contentRef.current) {
            openModalAnim(modalRef.current, contentRef.current);
        }
    }, [selected]);

    if (!selected) return null;

    const handleClose = () => {
        closeModalAnim(modalRef.current, contentRef.current, onClose);
    };

    const formattedDate = selected.dateOfMemory
        ? new Date(selected.dateOfMemory).toLocaleDateString('en-US', {
              year:  'numeric',
              month: 'long',
              day:   'numeric',
          })
        : null;

    return (
        <div className={styles.modalOverlay} ref={modalRef} onClick={handleClose}>

            {/* ✕ close for desktop */}
            <button className={styles.closeX} onClick={handleClose} aria-label="Close">✕</button>

            <div
                className={styles.modalContent}
                ref={contentRef}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Image ── */}
                <div className={styles.modalImageSection}>
                    <img
                        src={selected.imageUrl}
                        className={styles.modalFullImage}
                        alt={selected.title}
                    />
                </div>

                {/* ── Text ── */}
                <div className={styles.modalTextSection}>
                    {/* Meta */}
                    <div className={styles.blogMeta}>
                        {formattedDate && (
                            <span className={styles.dateTag}>{formattedDate}</span>
                        )}
                        {selected.location && (
                            <span className={styles.locationTag}>{selected.location}</span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className={styles.metaDivider}>
                        <div className={styles.metaDividerLine} />
                        <div className={styles.metaDividerDot}  />
                        <div className={styles.metaDividerLine} />
                    </div>

                    {/* Title */}
                    <h2 className={styles.blogTitle}>{selected.title}</h2>

                    {/* Caption */}
                    {selected.caption && (
                        <p className={styles.blogText}>{selected.caption}</p>
                    )}

                    {/* Close CTA */}
                    <button className={styles.closeBtn} onClick={handleClose}>
                        Back to Gallery
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoStory;
