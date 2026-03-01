import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const NotificationDropdown = ({ onClose, onRefresh }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiClient.get('/notifications');
        setNotifications(res.data || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, lue: true } : n))
      );
      onRefresh();
    } catch {
      // silently fail
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, lue: true })));
      onRefresh();
    } catch {
      // silently fail
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `Il y a ${Math.floor(diff / 86400)}j`;
    return date.toLocaleDateString('fr-FR');
  };

  const typeIcons = {
    RESERVATION: '\uD83D\uDCC5',
    AVIS: '\u2B50',
    SYSTEME: '\u2139\uFE0F',
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-dropdown-header">
        <h4>Notifications</h4>
        {notifications.some((n) => !n.lue) && (
          <button className="notification-mark-all" onClick={markAllAsRead}>
            Tout marquer lu
          </button>
        )}
      </div>

      <div className="notification-dropdown-list">
        {loading ? (
          <div className="notification-loading">Chargement...</div>
        ) : notifications.length === 0 ? (
          <div className="notification-empty">Aucune notification</div>
        ) : (
          notifications.slice(0, 20).map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${!notif.lue ? 'notification-unread' : ''}`}
              onClick={() => !notif.lue && markAsRead(notif.id)}
            >
              <span className="notification-item-icon">
                {typeIcons[notif.type] || '\uD83D\uDD14'}
              </span>
              <div className="notification-item-content">
                <p className="notification-item-title">{notif.titre}</p>
                <p className="notification-item-message">{notif.message}</p>
                <span className="notification-item-time">{formatTime(notif.createdAt)}</span>
              </div>
              {notif.lien && (
                <Link to={notif.lien} className="notification-item-link" onClick={onClose}>
                  Voir
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
