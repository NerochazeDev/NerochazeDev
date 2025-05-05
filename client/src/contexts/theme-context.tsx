import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'dark' | 'light' | 'golden';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Check if localStorage is available (client-side)
  const isClient = typeof window !== 'undefined';
  
  // Get saved theme from localStorage or use system preference as default
  const getSavedTheme = (): ThemeType => {
    if (!isClient) return 'dark';
    
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && ['dark', 'light', 'golden'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Use system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setThemeState] = useState<ThemeType>(getSavedTheme);

  // Update theme in localStorage and apply theme class to document
  const setTheme = (newTheme: ThemeType) => {
    if (!isClient) return;
    
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove all theme classes and add the new one
    document.documentElement.classList.remove('dark-theme', 'light-theme', 'golden-theme');
    document.documentElement.classList.add(`${newTheme}-theme`);
  };

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}