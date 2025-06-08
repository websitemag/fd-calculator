import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Initialize state to false to ensure server/client consistency
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference after hydration
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldBeDark = false;
    if (savedTheme) {
      shouldBeDark = savedTheme === 'dark';
    } else {
      shouldBeDark = systemPrefersDark;
    }
    
    setIsDark(shouldBeDark);
    
    // Apply the theme to the document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return { isDark, toggleDarkMode };
}