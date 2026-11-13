import { useEffect } from 'react';

/**
 * Synchronizes the active theme ('dark' | 'light') with the document root class.
 */
export function useTheme(theme, onChangeTheme) {
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    onChangeTheme(nextTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
}

