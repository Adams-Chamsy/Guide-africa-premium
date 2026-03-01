import React, { useState, useEffect } from 'react';
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
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll < lastScroll || currentScroll < 100);
      setLastScroll(currentScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

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
