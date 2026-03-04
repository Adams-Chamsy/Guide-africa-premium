import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiMap, FiHeart, FiUser } from 'react-icons/fi';

const items = [
  { path: '/', icon: FiHome, label: 'Accueil' },
  { path: '/restaurants', icon: FiCompass, label: 'Explorer' },
  { path: '/carte', icon: FiMap, label: 'Carte' },
  { path: '/mes-favoris', icon: FiHeart, label: 'Favoris' },
  { path: '/profil', icon: FiUser, label: 'Profil' },
];

const BottomNav = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : true
  );
  const lastScrollRef = useRef(0);

  // Desktop detection via resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll handler using ref to avoid stale closure
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    setVisible(currentScroll < lastScrollRef.current || currentScroll < 100);
    lastScrollRef.current = currentScroll;
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, handleScroll]);

  // Don't render on desktop
  if (!isMobile) return null;

  return (
    <nav className={`bottom-nav ${!visible ? 'hidden' : ''}`}>
      {items.map(item => {
        const isActive = location.pathname === item.path ||
          (item.path !== '/' && location.pathname.startsWith(item.path));
        const Icon = item.icon;
        return (
          <Link key={item.path} to={item.path} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={22} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
