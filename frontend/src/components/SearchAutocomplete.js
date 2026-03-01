import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchApi } from '../api/apiClient';

const HISTORY_KEY = 'guideafrica_search_history';
const MAX_HISTORY = 5;

const SearchAutocomplete = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
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
    searchApi.search(searchQuery.trim(), 5)
      .then(res => {
        setResults(res.data);
      })
      .catch(() => {
        setResults({ restaurants: [], hotels: [] });
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
    const path = type === 'RESTAURANT' ? '/restaurants/' + id : '/hotels/' + id;
    navigate(path);
    if (onClose) onClose();
  };

  const handleHistoryClick = (text) => {
    setQuery(text);
    setShowHistory(false);
    doSearch(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (onClose) onClose();
    }
  };

  const hasResults = results && (
    (results.restaurants && results.restaurants.length > 0) ||
    (results.hotels && results.hotels.length > 0)
  );

  const noResults = results && !hasResults;

  return (
    <div className="search-autocomplete" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon-input">&#128269;</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un restaurant, hôtel..."
          className="search-input"
        />
      </div>

      {showHistory && history.length > 0 && !query.trim() && (
        <div className="search-results-dropdown">
          <div className="search-result-group">
            <div className="search-result-group-title">Recherches récentes</div>
            {history.map((h, i) => (
              <div key={i} className="search-result-item search-history" onClick={() => handleHistoryClick(h)}>
                <span className="search-history-icon">&#128337;</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasResults && (
        <div className="search-results-dropdown">
          {results.restaurants && results.restaurants.length > 0 && (
            <div className="search-result-group">
              <div className="search-result-group-title">Restaurants</div>
              {results.restaurants.map(r => (
                <div
                  key={'r-' + r.id}
                  className="search-result-item"
                  onClick={() => handleResultClick('RESTAURANT', r.id, r.nom)}
                >
                  <div className="search-result-info">
                    <span className="search-result-name">{r.nom}</span>
                    <span className="search-result-meta">
                      {r.ville && r.ville.nom}
                      {r.note && (' - ' + '★'.repeat(Math.round(r.note)) + ' ' + r.note + '/5')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {results.hotels && results.hotels.length > 0 && (
            <div className="search-result-group">
              <div className="search-result-group-title">Hôtels</div>
              {results.hotels.map(h => (
                <div
                  key={'h-' + h.id}
                  className="search-result-item"
                  onClick={() => handleResultClick('HOTEL', h.id, h.nom)}
                >
                  <div className="search-result-info">
                    <span className="search-result-name">{h.nom}</span>
                    <span className="search-result-meta">
                      {h.ville && h.ville.nom}
                      {h.note && (' - ' + '★'.repeat(Math.round(h.note)) + ' ' + h.note + '/5')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {noResults && (
        <div className="search-results-dropdown">
          <div className="search-result-group">
            <div className="search-result-item search-no-result">
              Aucun résultat pour "{query}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
