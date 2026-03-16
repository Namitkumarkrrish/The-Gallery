import React, { useRef } from 'react';
import * as animate from './photoCardAnimation';
import DeletionAction from '../DeletionAction/DeletionAction';
import styles from './PhotoCard.module.css';

const PhotoCard = ({ memory, onOpen, onDeleteRequest }) => {
    const cardRef      = useRef(null);
    const deleteBtnRef = useRef(null);

    const isTouch = () => window.matchMedia('(hover: none)').matches;

    const handleHover = () => {
        if (isTouch()) return;
        animate.hoverCard(cardRef.current);
        animate.showDeleteBtn(deleteBtnRef.current);
    };

    const handleLeave = () => {
        if (isTouch()) return;
        animate.leaveCard(cardRef.current);
        animate.hideDeleteBtn(deleteBtnRef.current);
    };

    return (
        <div
            className={styles.card}
            ref={cardRef}
            onClick={() => onOpen(memory)}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className={styles.grainTexture} aria-hidden="true" />

            {/* Delete button — always visible on mobile */}
            <div ref={deleteBtnRef} className={styles.deleteBtnWrapper}>
                <DeletionAction id={memory._id} onDeleteRequest={onDeleteRequest} />
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={memory.imageUrl}
                    className={styles.image}
                    alt={memory.title}
                    loading="lazy"
                />
            </div>

            <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{memory.title}</h3>
                <p className={styles.cardLocation}>{memory.location || 'Our Place'}</p>
            </div>
        </div>
    );
};

export default PhotoCard;
