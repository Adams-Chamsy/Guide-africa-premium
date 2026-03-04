import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import apiClient from '../api/apiClient';
import { FiBell } from 'react-icons/fi';

const NotificationBell = () => {
  const { isAuthenticated } = useAuth();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const fetchCount = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await apiClient.get('/notifications/count');
      setCount(res.data.count || 0);
    } catch {
      // silently fail
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 60000); // poll every 60s
    return () => clearInterval(interval);
  }, [fetchCount]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleRefresh = () => {
    fetchCount();
  };

  return (
    <div className="notification-bell-wrapper" ref={bellRef}>
      <button className="header-action-btn notification-bell" onClick={handleOpen} aria-label="Notifications">
        <FiBell size={18} />
        {count > 0 && (
          <span className="notification-badge">{count > 99 ? '99+' : count}</span>
        )}
      </button>
      {open && (
        <NotificationDropdown onClose={() => setOpen(false)} onRefresh={handleRefresh} />
      )}
    </div>
  );
};

export default NotificationBell;
