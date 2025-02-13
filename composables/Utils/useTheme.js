// composables/Utils/useTheme.js
// composables/useTheme.js
import { ref, onMounted } from 'vue';

const currentTheme = ref('light'); // Default to 'light' until client-side detection

export function useTheme() {
  // Toggle between light and dark theme
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme.value);
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    }
  };

  // Set initial theme on client-side only
  const setInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        currentTheme.value = savedTheme;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme.value = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    }
  };

  // Set the theme when the component is mounted (client-side)
  onMounted(() => {
    setInitialTheme();
  });

  return { currentTheme, toggleTheme };
}
