//assets/design-system/utilites/applyThemeStyles.js
import colorPalette from '@/assets/Theme/color-palette.json';
import lightTheme from '@/assets/Theme/light-theme.json';
import darkTheme from '@/assets/Theme/dark-theme.json';


// Function to fetch color palette and themes from the imported JSON files
function fetchColorData() {
  try {
    const palette = colorPalette;
    const lightThemeData = lightTheme;
    const darkThemeData = darkTheme;

    return { palette, lightTheme: lightThemeData, darkTheme: darkThemeData };
  } catch (error) {
    console.error('Error loading color data:', error);
    return { palette: null, lightTheme: null, darkTheme: null };
  }
}

// Helper function to resolve the actual hex color from the palette
function resolveColorReference(colorRef, palette) {
  const match = colorRef.match(/\{(\w+)\.(\d+)\}/);
  if (match) {
    const colorName = match[1];
    const shade = match[2];
    return palette[colorName][shade]?.value || '';
  }
  return colorRef;
}

// Function to apply theme styles to CSS variables
export function applyThemeStyles() {
  const root = document.documentElement;

  const { palette, lightTheme, darkTheme } = fetchColorData();

  if (!lightTheme || !darkTheme || !palette) {
    console.error('Failed to load theme data');
    return;
  }

  // Set light theme variables
  root.style.setProperty('--primary-light', resolveColorReference(lightTheme.Theme.Primary.value, palette));
  root.style.setProperty('--secondary-light', resolveColorReference(lightTheme.Theme.Secondary.value, palette));
  root.style.setProperty('--tertiary-light', resolveColorReference(lightTheme.Theme.Tertiary.value, palette));
  root.style.setProperty('--background-light', resolveColorReference(lightTheme.Theme.Background.value, palette));
  root.style.setProperty('--background-2-light', resolveColorReference(lightTheme.Theme['Background-2'].value, palette));
  root.style.setProperty('--background-strong-light', resolveColorReference(lightTheme.Theme['Background-Strong'].value, palette));
  root.style.setProperty('--text-primary-light', resolveColorReference(lightTheme.Theme['Text-Primary'].value, palette));
  root.style.setProperty('--text-secondary-light', resolveColorReference(lightTheme.Theme['Text-Secondary'].value, palette));
  root.style.setProperty('--border-light', resolveColorReference(lightTheme.Theme.Border.value, palette));
  root.style.setProperty('--hover-light', resolveColorReference(lightTheme.Theme.Hover.value, palette));
  root.style.setProperty('--grey-light', resolveColorReference(lightTheme.Theme.Grey.value, palette));
  root.style.setProperty('--warning-light', resolveColorReference(lightTheme.Theme.Warning.value, palette));
  root.style.setProperty('--success-light', resolveColorReference(lightTheme.Theme.Success.value, palette));
  root.style.setProperty('--error-light', resolveColorReference(lightTheme.Theme.Error.value, palette));

  // Set dark theme variables
  root.style.setProperty('--primary-dark', resolveColorReference(darkTheme.Theme.Primary.value, palette));
  root.style.setProperty('--secondary-dark', resolveColorReference(darkTheme.Theme.Secondary.value, palette));
  root.style.setProperty('--tertiary-dark', resolveColorReference(darkTheme.Theme.Tertiary.value, palette));
  root.style.setProperty('--background-dark', resolveColorReference(darkTheme.Theme.Background.value, palette));
  root.style.setProperty('--background-2-dark', resolveColorReference(darkTheme.Theme['Background-2'].value, palette));
  root.style.setProperty('--background-strong-dark', resolveColorReference(darkTheme.Theme['Background-Strong'].value, palette));
  root.style.setProperty('--text-primary-dark', resolveColorReference(darkTheme.Theme['Text-Primary'].value, palette));
  root.style.setProperty('--text-secondary-dark', resolveColorReference(darkTheme.Theme['Text-Secondary'].value, palette));
  root.style.setProperty('--border-dark', resolveColorReference(darkTheme.Theme.Border.value, palette));
  root.style.setProperty('--hover-dark', resolveColorReference(darkTheme.Theme.Hover.value, palette));
  root.style.setProperty('--grey-dark', resolveColorReference(darkTheme.Theme.Grey.value, palette));
  root.style.setProperty('--warning-dark', resolveColorReference(darkTheme.Theme.Warning.value, palette));
  root.style.setProperty('--success-dark', resolveColorReference(darkTheme.Theme.Success.value, palette));
  root.style.setProperty('--error-dark', resolveColorReference(darkTheme.Theme.Error.value, palette));
}