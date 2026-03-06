import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SplashScreen = ({ onComplete }) => {
  const [hiding, setHiding] = useState(false);
  const [show, setShow] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const shown = sessionStorage.getItem('guideafrica_splash_shown');
    if (shown) {
      setShow(false);
      onCompleteRef.current?.();
      return;
    }

    const hideTimer = setTimeout(() => {
      setHiding(true);
      sessionStorage.setItem('guideafrica_splash_shown', 'true');
    }, 2000);

    const completeTimer = setTimeout(() => {
      setShow(false);
      onCompleteRef.current?.();
    }, 2800);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, []);

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
