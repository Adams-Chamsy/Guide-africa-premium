import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const LightboxGallery = ({ images = [], isOpen, onClose, initialIndex = 0 }) => {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrent(initialIndex);
  }, [isOpen, initialIndex]);

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

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="lightbox-close" onClick={onClose}><FiX size={20} /></button>
        <div className="lightbox-counter">{current + 1} / {images.length}</div>

        <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}>
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

        <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); goNext(); }}>
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

export default LightboxGallery;
