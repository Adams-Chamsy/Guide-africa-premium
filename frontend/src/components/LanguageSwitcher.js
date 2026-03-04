import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="header-action-btn language-switcher"
      onClick={toggleLanguage}
      aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en francais'}
      title={i18n.language === 'fr' ? 'Switch to English' : 'Passer en francais'}
    >
      <FiGlobe size={18} />
      <span className="lang-label">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
