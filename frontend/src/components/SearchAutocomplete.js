import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchApi, activiteApi, voitureApi } from '../api/apiClient';
import { FiCompass, FiTruck } from 'react-icons/fi';
import PropTypes from 'prop-types';

const HISTORY_KEY = 'guideafrica_search_history';
const MAX_HISTORY = 5;

const SearchAutocomplete = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const doSearch = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }
    const trimmed = searchQuery.trim();

    // Fetch restaurants/hotels, activities and voitures in parallel
    Promise.all([
      searchApi.search(trimmed, 5).then(res => res.data).catch(() => ({ restaurants: [], hotels: [] })),
      activiteApi.getAll({ search: trimmed, size: 5 }).then(res => {
        const data = res.data;
        // Handle paginated or array response
        return Array.isArray(data) ? data : (data.content || data.results || []);
      }).catch(() => []),
      voitureApi.getAll({ search: trimmed, size: 5 }).then(res => {
        const data = res.data;
        return Array.isArray(data) ? data : (data.content || data.results || []);
      }).catch(() => []),
    ]).then(([searchData, activites, voitures]) => {
      setResults({
        restaurants: searchData.restaurants || [],
        hotels: searchData.hotels || [],
        activites: activites || [],
        voitures: voitures || [],
      });
    });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowHistory(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value.trim()) {
      setResults(null);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      doSearch(value);
    }, 300);
  };

  const handleFocus = () => {
    if (!query.trim() && history.length > 0) {
      setShowHistory(true);
    }
  };

  const addToHistory = (text) => {
    const updated = [text, ...history.filter(h => h !== text)].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const handleResultClick = (type, id, name) => {
    addToHistory(name);
    let path;
    switch (type) {
      case 'RESTAURANT': path = '/restaurants/' + id; break;
      case 'HOTEL': path = '/hotels/' + id; break;
      case 'ACTIVITE': path = '/activites/' + id; break;
      case 'VOITURE': path = '/voitures/' + id; break;
      default: path = '/';
    }
    navigate(path);
    if (onClose) onClose();
  };

  const handleHistoryClick = (text) => {
    setQuery(text);
    setShowHistory(false);
    doSearch(text);
  };

  // Build flat list of all selectable items for keyboard nav
  const getAllItems = useCallback(() => {
    const items = [];
    if (showHistory && history.length > 0 && !query.trim()) {
      history.forEach((h, i) => items.push({ type: 'history', value: h, index: i }));
    } else if (results) {
      if (results.restaurants) {
        results.restaurants.forEach(r => items.push({ type: 'restaurant', id: r.id, nom: r.nom }));
      }
      if (results.hotels) {
        results.hotels.forEach(h => items.push({ type: 'hotel', id: h.id, nom: h.nom }));
      }
      if (results.activites) {
        results.activites.forEach(a => items.push({ type: 'activite', id: a.id, nom: a.nom }));
      }
      if (results.voitures) {
        results.voitures.forEach(v => items.push({ type: 'voiture', id: v.id, nom: v.marque ? `${v.marque} ${v.modele || ''}`.trim() : (v.nom || 'Voiture') }));
      }
    }
    return items;
  }, [showHistory, history, query, results]);

  const handleKeyDown = (e) => {
    const items = getAllItems();
    if (e.key === 'Escape') {
      if (onClose) onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < items.length) {
      e.preventDefault();
      const item = items[activeIndex];
      if (item.type === 'history') {
        handleHistoryClick(item.value);
      } else if (item.type === 'restaurant') {
        handleResultClick('RESTAURANT', item.id, item.nom);
      } else if (item.type === 'hotel') {
        handleResultClick('HOTEL', item.id, item.nom);
      } else if (item.type === 'activite') {
        handleResultClick('ACTIVITE', item.id, item.nom);
      } else if (item.type === 'voiture') {
        handleResultClick('VOITURE', item.id, item.nom);
      }
      setActiveIndex(-1);
    }
  };

  // Reset activeIndex when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results, showHistory]);

  const hasResults = results && (
    (results.restaurants && results.restaurants.length > 0) ||
    (results.hotels && results.hotels.length > 0) ||
    (results.activites && results.activites.length > 0) ||
    (results.voitures && results.voitures.length > 0)
  );

  const noResults = results && !hasResults;
  const isDropdownOpen = (showHistory && history.length > 0 && !query.trim()) || hasResults || noResults;

  // Track running index for aria-activedescendant
  let runningIndex = 0;

  return (
    <div className="search-autocomplete" ref={containerRef} role="combobox" aria-expanded={isDropdownOpen} aria-haspopup="listbox" aria-owns="search-listbox">
      <div className="search-input-wrapper">
        <span className="search-icon-input" aria-hidden="true">&#128269;</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un restaurant, h\u00f4tel, activit\u00e9..."
          className="search-input"
          role="searchbox"
          aria-autocomplete="list"
          aria-controls="search-listbox"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          aria-label="Rechercher un restaurant, h\u00f4tel ou activit\u00e9"
        />
      </div>

      {showHistory && history.length > 0 && !query.trim() && (
        <div className="search-results-dropdown" id="search-listbox" role="listbox" aria-label="Recherches r\u00e9centes">
          <div className="search-result-group">
            <div className="search-result-group-title" role="presentation">Recherches r&eacute;centes</div>
            {history.map((h, i) => {
              const itemIndex = i;
              return (
                <div
                  key={h}
                  id={`search-option-${itemIndex}`}
                  role="option"
                  aria-selected={activeIndex === itemIndex}
                  className={`search-result-item search-history${activeIndex === itemIndex ? ' active' : ''}`}
                  onClick={() => handleHistoryClick(h)}
                >
                  <span className="search-history-icon" aria-hidden="true">&#128337;</span>
                  <span>{h}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasResults && (() => {
        runningIndex = 0;
        return (
          <div className="search-results-dropdown" id="search-listbox" role="listbox" aria-label="R\u00e9sultats de recherche">
            {results.restaurants && results.restaurants.length > 0 && (
              <div className="search-result-group">
                <div className="search-result-group-title" role="presentation">Restaurants</div>
                {results.restaurants.map(r => {
                  const itemIndex = runningIndex++;
                  return (
                    <div
                      key={'r-' + r.id}
                      id={`search-option-${itemIndex}`}
                      role="option"
                      aria-selected={activeIndex === itemIndex}
                      className={`search-result-item${activeIndex === itemIndex ? ' active' : ''}`}
                      onClick={() => handleResultClick('RESTAURANT', r.id, r.nom)}
                    >
                      <div className="search-result-info">
                        <span className="search-result-name">{r.nom}</span>
                        <span className="search-result-meta">
                          {r.ville && r.ville.nom}
                          {r.note && (' - ' + '\u2605'.repeat(Math.round(r.note)) + ' ' + r.note + '/5')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {results.hotels && results.hotels.length > 0 && (
              <div className="search-result-group">
                <div className="search-result-group-title" role="presentation">H&ocirc;tels</div>
                {results.hotels.map(h => {
                  const itemIndex = runningIndex++;
                  return (
                    <div
                      key={'h-' + h.id}
                      id={`search-option-${itemIndex}`}
                      role="option"
                      aria-selected={activeIndex === itemIndex}
                      className={`search-result-item${activeIndex === itemIndex ? ' active' : ''}`}
                      onClick={() => handleResultClick('HOTEL', h.id, h.nom)}
                    >
                      <div className="search-result-info">
                        <span className="search-result-name">{h.nom}</span>
                        <span className="search-result-meta">
                          {h.ville && h.ville.nom}
                          {h.note && (' - ' + '\u2605'.repeat(Math.round(h.note)) + ' ' + h.note + '/5')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {results.activites && results.activites.length > 0 && (
              <div className="search-result-group">
                <div className="search-result-group-title" role="presentation">
                  <FiCompass size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Activit&eacute;s
                </div>
                {results.activites.map(a => {
                  const itemIndex = runningIndex++;
                  return (
                    <div
                      key={'a-' + a.id}
                      id={`search-option-${itemIndex}`}
                      role="option"
                      aria-selected={activeIndex === itemIndex}
                      className={`search-result-item${activeIndex === itemIndex ? ' active' : ''}`}
                      onClick={() => handleResultClick('ACTIVITE', a.id, a.nom)}
                    >
                      <div className="search-result-info">
                        <span className="search-result-name">{a.nom}</span>
                        <span className="search-result-meta">
                          {a.ville && a.ville.nom}
                          {a.note && (' - ' + '\u2605'.repeat(Math.round(a.note)) + ' ' + a.note + '/5')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {results.voitures && results.voitures.length > 0 && (
              <div className="search-result-group">
                <div className="search-result-group-title" role="presentation">
                  <FiTruck size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Location de voitures
                </div>
                {results.voitures.map(v => {
                  const itemIndex = runningIndex++;
                  const displayName = v.marque ? `${v.marque} ${v.modele || ''}`.trim() : (v.nom || 'Voiture');
                  return (
                    <div
                      key={'v-' + v.id}
                      id={`search-option-${itemIndex}`}
                      role="option"
                      aria-selected={activeIndex === itemIndex}
                      className={`search-result-item${activeIndex === itemIndex ? ' active' : ''}`}
                      onClick={() => handleResultClick('VOITURE', v.id, displayName)}
                    >
                      <div className="search-result-info">
                        <span className="search-result-name">{displayName}</span>
                        <span className="search-result-meta">
                          {v.ville && v.ville.nom}
                          {v.prixParJour && ` - ${v.prixParJour} FCFA/jour`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {noResults && (
        <div className="search-results-dropdown">
          <div className="search-result-group">
            <div className="search-result-item search-no-result">
              Aucun r&eacute;sultat pour "{query}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SearchAutocomplete.propTypes = {
  onClose: PropTypes.func,
};

export default SearchAutocomplete;
