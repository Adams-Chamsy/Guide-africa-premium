import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SplashScreen = ({ onComplete }) => {
  const [hiding, setHiding] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const shown = sessionStorage.getItem('guideafrica_splash_shown');
    if (shown) {
      setShow(false);
      onComplete && onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setHiding(true);
      sessionStorage.setItem('guideafrica_splash_shown', 'true');
      setTimeout(() => {
        setShow(false);
        onComplete && onComplete();
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className={`splash-screen ${hiding ? 'hiding' : ''}`}>
      <div className="splash-logo-text">GUIDE AFRICA</div>
      <div className="splash-line"></div>
      <div className="splash-tagline">L'excellence culinaire africaine</div>
    </div>
  );
};

SplashScreen.propTypes = {
  onComplete: PropTypes.func,
};

export default SplashScreen;
