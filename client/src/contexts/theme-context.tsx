import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light' | 'golden';

interface ThemeContextProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeMode: 'dark',
  setThemeMode: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode') as ThemeMode;
    if (storedTheme && ['dark', 'light', 'golden'].includes(storedTheme)) {
      setThemeMode(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(themeMode);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Apply theme class to document root and body
  const applyTheme = (theme: ThemeMode) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark-theme', 'light-theme', 'golden-theme');
    document.body.classList.remove('dark-theme', 'light-theme', 'golden-theme');
    
    // Add the new theme class to both document root and body
    document.documentElement.classList.add(`${theme}-theme`);
    document.body.classList.add(`${theme}-theme`);
    
    // Add a data attribute for easier CSS targeting
    document.documentElement.setAttribute('data-theme', theme);
    
    console.log(`Theme changed to: ${theme}`);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}