import React, { useRef, useEffect, useState } from 'react';

const ParallaxHero = ({ image, height = '60vh', children, overlay = true, className = '' }) => {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrolled = -rect.top * 0.4;
      setOffset(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className={`parallax-hero ${className}`} style={{ height, position: 'relative', overflow: 'hidden' }}>
      <div
        className="parallax-hero-image"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: '-20%',
          left: 0,
          width: '100%',
          height: '140%',
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }}
      />
      {overlay && <div className="parallax-hero-overlay" />}
      <div className="parallax-hero-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxHero;
