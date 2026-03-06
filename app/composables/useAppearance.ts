import { useTheme } from 'vuetify';

export type Density = 'default' | 'comfortable' | 'compact';

export const useAppearance = () => {
  const theme = useTheme();
  
  const isDark = useCookie<boolean>('appearance_is_dark', { default: () => true });
  const density = useCookie<Density>('appearance_density', { default: () => 'default' });
  const primaryColor = useCookie<string>('appearance_primary_color', { default: () => '#FFFFFF' });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setDensity = (val: Density) => {
    density.value = val;
  };

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color;
  };

  // Logic to apply theme changes
  watch(isDark, (val) => {
    theme.global.name.value = val ? 'dark' : 'light';
  }, { immediate: true });

  watch(primaryColor, (val) => {
    if (!theme.themes.value.dark || !theme.themes.value.light) return;
    
    // Update both themes' primary colors
    theme.themes.value.dark.colors.primary = val;
    theme.themes.value.light.colors.primary = val === '#FFFFFF' ? '#000000' : val;
  }, { immediate: true });

  return {
    isDark,
    density,
    primaryColor,
    toggleTheme,
    setDensity,
    setPrimaryColor,
  };
};
