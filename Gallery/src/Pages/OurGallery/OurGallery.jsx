import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import PhotoStory from "../../components/PhotoStory/PhotoStory";
import styles from "./OurGallery.module.css";

const API = import.meta.env.VITE_API_URL;

const OurGallery = () => {
  const [memories, setMemories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const galleryRef = useRef(null);

  useEffect(() => {
    fetchMemories();
  }, []);

  useEffect(() => {
    if (memories.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(`.${styles.masonryItem}`, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.2,
        });
      }, galleryRef);

      return () => ctx.revert();
    }
  }, [memories]);

  const fetchMemories = async () => {
    try {
      const res = await axios.get(`${API}/api/memories/all`);
      setMemories(res.data);
    } catch (err) {
      console.error("Gallery Error:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/api/memories/${deleteId}`);

      setMemories((prev) => prev.filter((m) => m._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert("Could not remove this memory.");
    }
  };

  return (
    <div className={styles.container} ref={galleryRef}>
      {/* Header */}
      <div className={styles.galleryHeader}>
        <div className={styles.headerBadge}>
          <span>✦</span> our memories <span>✦</span>
        </div>

        <h1>
          Captured <em>Moments</em>
        </h1>

        <p>Every picture tells a piece of our story</p>
      </div>

      {/* Grid */}
      {memories.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No memories yet</p>
          <span>Add your first moment together</span>
        </div>
      ) : (
        <div className={styles.masonryLayout}>
          {memories.map((m) => (
            <div key={m._id} className={styles.masonryItem}>
              <PhotoCard
                memory={m}
                onOpen={setSelected}
                onDeleteRequest={(e, id) => {
                  e.stopPropagation();
                  setDeleteId(id);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Photo Story Modal */}
      <PhotoStory selected={selected} onClose={() => setSelected(null)} />

      {/* Delete Confirmation */}
      {deleteId && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <h3>Remove Memory?</h3>

            <p>
              This moment will be gone forever.
              <br />
              Are you sure?
            </p>

            <div className={styles.confirmActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDeleteId(null)}
              >
                Keep It
              </button>

              <button
                className={styles.deleteBtn}
                onClick={confirmDelete}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurGallery;