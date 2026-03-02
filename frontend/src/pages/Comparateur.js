import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiDollarSign, FiMapPin, FiPlus, FiX, FiSearch } from 'react-icons/fi';
import { restaurantApi, hotelApi } from '../api/apiClient';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const Comparateur = () => {
  usePageTitle('Comparateur');
  const [type, setType] = useState('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const api = type === 'restaurants' ? restaurantApi : hotelApi;
        const res = await api.getAll({ search: searchQuery, size: 10 });
        const items = res.data.content || res.data || [];
        setSearchResults(items.filter(i => !selected.find(s => s.id === i.id)));
      } catch (err) { /* silent */ }
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, type, selected]);

  const addToCompare = (item) => {
    if (selected.length >= 3) return;
    setSelected(prev => [...prev, item]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeFromCompare = (id) => {
    setSelected(prev => prev.filter(i => i.id !== id));
  };

  const renderStars = (note) => {
    return '\u2605'.repeat(Math.round(note || 0)) + '\u2606'.repeat(5 - Math.round(note || 0));
  };

  const compareFields = type === 'restaurants'
    ? [
        { label: 'Cuisine', key: 'cuisine' },
        { label: 'Note', key: 'note', render: (v) => v ? `${v.toFixed(1)} / 5` : '-' },
        { label: 'Prix', key: 'fourchettePrix', render: (v) => '\u20ac'.repeat(v || 1) },
        { label: 'Ville', key: 'adresse' },
        { label: 'Terrasse', key: 'terrasse', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'WiFi', key: 'wifi', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Parking', key: 'parking', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Halal', key: 'halal', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'V\u00e9g\u00e9tarien', key: 'vegetarienFriendly', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Climatisation', key: 'climatisation', render: (v) => v ? '\u2713' : '\u2717' },
      ]
    : [
        { label: '\u00c9toiles', key: 'etoiles', render: (v) => '\u2b50'.repeat(v || 0) },
        { label: 'Note', key: 'note', render: (v) => v ? `${v.toFixed(1)} / 5` : '-' },
        { label: 'Prix/nuit', key: 'prixParNuit', render: (v) => v ? `${v} \u20ac` : '-' },
        { label: 'Ville', key: 'adresse' },
        { label: 'Piscine', key: 'piscine', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Spa', key: 'spa', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'WiFi', key: 'wifi', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Parking', key: 'parking', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Restaurant', key: 'restaurantSurPlace', render: (v) => v ? '\u2713' : '\u2717' },
        { label: 'Salle sport', key: 'salleSport', render: (v) => v ? '\u2713' : '\u2717' },
      ];

  return (
    <>
      <SEOHead title="Comparateur" description="Comparez restaurants et hotels" />
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="luxury-subtitle">Comparer</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--ivory)' }}>
              Comparateur
            </h1>
            <p style={{ color: 'var(--ivory-muted)', fontSize: '0.9rem' }}>
              Comparez jusqu'\u00e0 3 \u00e9tablissements c\u00f4te \u00e0 c\u00f4te
            </p>
          </div>

          {/* Type Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            <button
              onClick={() => { setType('restaurants'); setSelected([]); }}
              className={type === 'restaurants' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              style={{ borderRadius: 50 }}
            >
              Restaurants
            </button>
            <button
              onClick={() => { setType('hotels'); setSelected([]); }}
              className={type === 'hotels' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              style={{ borderRadius: 50 }}
            >
              H\u00f4tels
            </button>
          </div>

          {/* Search */}
          {selected.length < 3 && (
            <div style={{ maxWidth: 400, margin: '0 auto 32px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 50, padding: '10px 16px' }}>
                <FiSearch size={16} style={{ color: 'var(--ivory-muted)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Rechercher un ${type === 'restaurants' ? 'restaurant' : 'h\u00f4tel'}...`}
                  style={{ flex: 1, background: 'none', border: 'none', color: 'var(--ivory)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>
              {searchResults.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                  background: 'var(--bg-deep)', border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)', overflow: 'hidden', zIndex: 10,
                }}>
                  {searchResults.map(item => (
                    <button
                      key={item.id}
                      onClick={() => addToCompare(item)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                        padding: '12px 16px', background: 'none', border: 'none',
                        color: 'var(--ivory)', cursor: 'pointer', textAlign: 'left',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <img src={item.image || '/placeholder.jpg'} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.nom}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ivory-muted)' }}>{item.adresse || item.cuisine}</div>
                      </div>
                      <FiPlus style={{ marginLeft: 'auto', color: 'var(--gold)' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Comparison Table */}
          {selected.length > 0 ? (
            <div className="comparator">
              {selected.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className={`comparator-column ${idx === 0 ? 'highlighted' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div style={{ position: 'relative', marginBottom: 16, textAlign: 'center' }}>
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      style={{
                        position: 'absolute', top: -8, right: -8,
                        background: 'var(--danger)', border: 'none', color: '#fff',
                        width: 24, height: 24, borderRadius: '50%', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <FiX size={14} />
                    </button>
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.nom}
                      style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}
                    />
                    <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--ivory)', fontSize: '1.1rem' }}>
                      {item.nom}
                    </h3>
                  </div>

                  {compareFields.map(field => (
                    <div className="comparator-row" key={field.key}>
                      <span className="label">{field.label}</span>
                      <span className="value" style={{ color: item[field.key] === true ? 'var(--emerald-light)' : item[field.key] === false ? 'var(--terracotta)' : 'var(--ivory)' }}>
                        {field.render ? field.render(item[field.key]) : (item[field.key] || '-')}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--ivory-subtle)' }}>
              <FiSearch size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <p>Recherchez des \u00e9tablissements pour commencer la comparaison</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Comparateur;
