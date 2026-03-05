import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { eventApi } from '../api/apiClient';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const Events = () => {
  usePageTitle('\u00c9v\u00e9nements');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await eventApi.getAll({ page: 0, size: 20 });
        setEvents(res.data.content || res.data || []);
      } catch (err) {
        // silently handle
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getCategoryLabel = (cat) => {
    const map = {
      DEGUSTATION: 'D\u00e9gustation', MASTERCLASS: 'Masterclass',
      DINER_EXCLUSIF: 'D\u00eener exclusif', FESTIVAL: 'Festival', VISITE: 'Visite guid\u00e9e'
    };
    return map[cat] || cat;
  };

  return (
    <>
      <SEOHead title="Événements" description="Événements gastronomiques en Afrique" />
      <div className="events-page">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="luxury-subtitle">Exp\u00e9riences exclusives</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--ivory)' }}>
              \u00c9v\u00e9nements & Exp\u00e9riences
            </h1>
            <p style={{ color: 'var(--ivory-muted)', maxWidth: 600, margin: '12px auto 0' }}>
              D\u00eeners exclusifs, masterclass, d\u00e9gustations et festivals gastronomiques \u00e0 travers l'Afrique
            </p>
          </div>

          {loading ? (
            <div className="page-loading"><div className="loading-spinner"></div></div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80 }}>
              <FiCalendar size={48} style={{ color: 'var(--gold)', opacity: 0.5, marginBottom: 16 }} />
              <h3 style={{ color: 'var(--ivory-muted)', fontFamily: 'Playfair Display, serif' }}>Bient\u00f4t disponible</h3>
              <p style={{ color: 'var(--ivory-subtle)', fontSize: '0.9rem' }}>
                De nouveaux \u00e9v\u00e9nements seront annonc\u00e9s prochainement
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {events.map((event, idx) => (
                <motion.div
                  key={event.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="event-card">
                    {event.imageCouverture && (
                      <img src={event.imageCouverture} alt={event.titre} className="event-card-image" loading="lazy" />
                    )}
                    <div className="event-card-content">
                      <div className="event-card-date">
                        <span style={{ marginRight: 12 }}><FiCalendar size={13} style={{ verticalAlign: -2 }} /> {formatDate(event.dateDebut)}</span>
                        <span className="user-badge explorer">{getCategoryLabel(event.categorie)}</span>
                      </div>
                      <h3 className="event-card-title">{event.titre}</h3>
                      <p style={{ color: 'var(--ivory-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: '8px 0' }}>
                        {event.description && event.description.substring(0, 200)}
                        {event.description && event.description.length > 200 ? '...' : ''}
                      </p>
                      <div className="event-card-location">
                        <FiMapPin size={14} /> {event.lieu} \u2014 {event.adresse}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <div className="event-card-price">
                          {event.prix > 0 ? `${event.prix} \u20ac` : 'Gratuit'}
                        </div>
                        <div style={{ color: 'var(--ivory-subtle)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <FiUsers size={14} /> {event.placesTotal - event.placesReservees} places restantes
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Events;
