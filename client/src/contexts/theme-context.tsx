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

  // Apply theme class to document root
  const applyTheme = (theme: ThemeMode) => {
    document.documentElement.classList.remove('dark-theme', 'light-theme', 'golden-theme');
    document.documentElement.classList.add(`${theme}-theme`);
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