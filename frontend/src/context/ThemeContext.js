import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('guideafrica_theme') || 'dark';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('guideafrica_hc') === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('guideafrica_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('guideafrica_hc', highContrast.toString());
  }, [highContrast]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    highContrast,
    toggleHighContrast,
    isDark: theme === 'dark'
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  return context;
};

export default ThemeContext;
