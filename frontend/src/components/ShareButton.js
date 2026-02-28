import React, { useState } from 'react';

export default function ShareButton({ title, text, url }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (e) {
        // User cancelled
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text || title);

  return (
    <div className="share-container">
      <button className="share-btn" onClick={handleNativeShare} aria-label="Partager">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        Partager
      </button>

      {showMenu && (
        <div className="share-menu">
          <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-option">
            WhatsApp
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-option">
            Facebook
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-option">
            Twitter
          </a>
          <button onClick={copyLink} className="share-option">
            {copied ? 'Lien copié !' : 'Copier le lien'}
          </button>
          <button onClick={() => setShowMenu(false)} className="share-option share-close">
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
