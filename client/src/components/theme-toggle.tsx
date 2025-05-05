import React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  const cycleTheme = () => {
    if (themeMode === 'dark') {
      setThemeMode('light');
    } else if (themeMode === 'light') {
      setThemeMode('golden');
    } else {
      setThemeMode('dark');
    }
  };

  return (
    <button 
      onClick={cycleTheme}
      className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
      aria-label="Toggle theme"
    >
      {themeMode === 'light' && <Sun className="h-5 w-5 text-amber-600" />}
      {themeMode === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
      {themeMode === 'golden' && <Sparkles className="h-5 w-5 text-yellow-400" />}
    </button>
  );
}