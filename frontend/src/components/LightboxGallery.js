import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

const LightboxGallery = ({ images = [], isOpen: isOpenProp, onClose: onCloseProp, initialIndex = 0 }) => {
  // Self-managed mode: if isOpen prop is not provided (undefined), manage state internally
  const isSelfManaged = isOpenProp === undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalIndex, setInternalIndex] = useState(0);

  const isOpen = isSelfManaged ? internalOpen : isOpenProp;
  const onClose = isSelfManaged ? () => setInternalOpen(false) : onCloseProp;
  const effectiveInitialIndex = isSelfManaged ? internalIndex : initialIndex;

  const [current, setCurrent] = useState(effectiveInitialIndex);

  useEffect(() => {
    if (isOpen) setCurrent(effectiveInitialIndex);
  }, [isOpen, effectiveInitialIndex]);

  const goNext = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const handleThumbnailClick = (index) => {
    if (isSelfManaged) {
      setInternalIndex(index);
      setInternalOpen(true);
    }
    setCurrent(index);
  };

  // Self-managed mode: render a thumbnail grid when closed
  if (isSelfManaged && !isOpen) {
    if (images.length === 0) return null;
    return (
      <div className="lightbox-thumbnail-grid">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Photo ${idx + 1}`}
            className="lightbox-thumb clickable"
            style={{ cursor: 'pointer' }}
            onClick={() => handleThumbnailClick(idx)}
          />
        ))}
      </div>
    );
  }

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Galerie photo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Fermer la galerie"><FiX size={20} /></button>
        <div className="lightbox-counter">{current + 1} / {images.length}</div>

        <button className="lightbox-nav prev" aria-label="Photo precedente" onClick={(e) => { e.stopPropagation(); goPrev(); }}>
          <FiChevronLeft size={24} />
        </button>

        <motion.img
          key={current}
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="lightbox-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />

        <button className="lightbox-nav next" aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); goNext(); }}>
          <FiChevronRight size={24} />
        </button>

        <div className="lightbox-thumbnails" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx + 1}`}
              className={`lightbox-thumb ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

LightboxGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  initialIndex: PropTypes.number,
};

export default LightboxGallery;
