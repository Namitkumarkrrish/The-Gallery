import React, { useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as animate from "./addMemoryAnimation";
import styles from "./AddMemory.module.css";

const API = import.meta.env.VITE_API_URL;

const AddMemory = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    animate.animateCardEntrance(cardRef.current);
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    animate.animatePhotoPop(cardRef.current);
  };

  const confirmRemovePhoto = () => {
    animate.animatePhotoExit(cardRef.current);

    setFile(null);
    setPreview(null);
    setShowDeleteConfirm(false);

    const input = document.getElementById("fileInput");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please add a photo first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/api/memories/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload memory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card} ref={cardRef}>

        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.headerBadge}>
            <span>✦</span> new memory <span>✦</span>
          </div>

          <h2 className={styles.formHeading}>
            Capture a <em>Moment</em>
          </h2>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerDot} />
          <div className={styles.dividerLine} />
        </div>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Memory Title</label>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✦</span>

              <input
                type="text"
                className={styles.titleInput}
                placeholder="Give this moment a name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Where</label>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>◈</span>

              <input
                type="text"
                className={styles.locationInput}
                placeholder="Where did this happen?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Photo Upload */}
          {!preview ? (
            <label className={styles.dropzoneLabel} htmlFor="fileInput">
              <div className={styles.dropzoneBox}>
                <span className={styles.dropzoneIcon}>🌸</span>

                <span className={styles.uploadText}>
                  Drop a memory here,<br />or tap to choose one
                </span>

                <span className={styles.uploadHint}>jpg · png · webp</span>
              </div>

              <input
                id="fileInput"
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className={styles.previewContainer}>
              <button
                type="button"
                className={styles.removePhotoBtn}
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Remove photo"
              >
                ✕
              </button>

              <img
                src={preview}
                alt="preview"
                className={styles.previewImg}
              />
            </div>
          )}

          {/* Caption */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>The Story</label>

            <textarea
              className={styles.textarea}
              placeholder="Write the story behind this moment..."
              rows="4"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save to Our Gallery"}
          </button>

        </form>
      </div>

      {/* Confirm remove photo */}
      {showDeleteConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <h3>Remove Photo?</h3>

            <p>We can always pick a better one.</p>

            <div className={styles.confirmActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Keep It
              </button>

              <button
                className={styles.confirmDeleteBtn}
                onClick={confirmRemovePhoto}
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

export default AddMemory;