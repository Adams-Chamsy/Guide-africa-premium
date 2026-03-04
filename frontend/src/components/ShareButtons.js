import React, { useState } from 'react';
import { FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import { FaWhatsapp, FaTwitter, FaFacebookF } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ShareButtons = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDesc = description || '';

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: shareTitle, text: shareDesc, url: shareUrl });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (platform) => {
    let shareLink = '';
    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const btnStyle = {
    width: 40, height: 40, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
    color: 'var(--ivory-muted)', cursor: 'pointer', transition: 'all 0.2s ease',
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {navigator.share && (
        <button style={btnStyle} onClick={handleNativeShare} title="Partager">
          <FiShare2 size={16} />
        </button>
      )}
      <button style={{ ...btnStyle, color: '#25D366' }} onClick={() => openShare('whatsapp')} title="WhatsApp">
        <FaWhatsapp size={18} />
      </button>
      <button style={{ ...btnStyle, color: '#1DA1F2' }} onClick={() => openShare('twitter')} title="Twitter">
        <FaTwitter size={16} />
      </button>
      <button style={{ ...btnStyle, color: '#4267B2' }} onClick={() => openShare('facebook')} title="Facebook">
        <FaFacebookF size={16} />
      </button>
      <button style={{ ...btnStyle, color: copied ? 'var(--emerald-light)' : 'var(--ivory-muted)' }} onClick={handleCopy} title="Copier le lien">
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>
    </div>
  );
};

ShareButtons.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default ShareButtons;
