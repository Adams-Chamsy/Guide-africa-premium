import React, { useEffect, useRef } from 'react';

const GoldCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);

  // Touch device detection
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => ring.classList.add('clicking');
    const handleMouseUp = () => ring.classList.remove('clicking');

    const animate = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      dot.style.left = `${dotX - 4}px`;
      dot.style.top = `${dotY - 4}px`;
      ring.style.left = `${ringX - 16}px`;
      ring.style.top = `${ringY - 16}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices or small screens
  if (isTouchDevice) return null;
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div ref={dotRef} className="gold-cursor-dot" />
      <div ref={ringRef} className="gold-cursor-ring" />
    </>
  );
};

export default GoldCursor;
