import { useTheme } from 'vuetify';

export type Density = 'default' | 'comfortable' | 'compact';
export type AdminNavVariant = 'classic' | 'compact' | 'rail' | 'floating';
const defaultPrimaryColor = '#00BCD4';
const defaultPrimaryDarkenColor = '#0097A7';

const normalizePrimaryColor = (value?: string | null) => {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) return defaultPrimaryColor;
  if (
    normalized === '#ffffff' ||
    normalized === '#fff' ||
    normalized === 'white' ||
    normalized === 'rgb(255,255,255)' ||
    normalized === 'rgb(255, 255, 255)'
  ) {
    return defaultPrimaryColor;
  }

  return value as string;
};

export const useAppearance = () => {
  const theme = useTheme();

  const isDark = useCookie<boolean>('appearance_is_dark', {
    default: () => true,
  });
  const density = useCookie<Density>('appearance_density', {
    default: () => 'default',
  });
  const primaryColor = useCookie<string>('appearance_primary_color', {
    default: () => defaultPrimaryColor,
  });
  const adminNavVariant = useCookie<AdminNavVariant>('appearance_admin_nav_variant', {
    default: () => 'classic',
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setDensity = (val: Density) => {
    density.value = val;
  };

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color;
  };

  const setAdminNavVariant = (variant: AdminNavVariant) => {
    adminNavVariant.value = variant;
  };

  // Logic to apply theme changes
  watch(
    isDark,
    (val) => {
      theme.change(val ? 'dark' : 'light');
    },
    { immediate: true }
  );

  watch(
    primaryColor,
    (val) => {
      if (!theme.themes.value.dark || !theme.themes.value.light) return;

      const resolvedPrimary = normalizePrimaryColor(val);

      if (primaryColor.value !== resolvedPrimary) {
        primaryColor.value = resolvedPrimary;
        return;
      }

      // Update both themes' primary colors
      theme.themes.value.dark.colors.primary = resolvedPrimary;
      theme.themes.value.dark.colors['primary-darken-1'] = defaultPrimaryDarkenColor;
      theme.themes.value.dark.colors['primary-darken-2'] = defaultPrimaryDarkenColor;
      theme.themes.value.light.colors.primary = resolvedPrimary;
      theme.themes.value.light.colors['primary-darken-1'] = defaultPrimaryDarkenColor;
      theme.themes.value.light.colors['primary-darken-2'] = defaultPrimaryDarkenColor;
    },
    { immediate: true }
  );

  return {
    isDark,
    density,
    primaryColor,
    adminNavVariant,
    toggleTheme,
    setDensity,
    setPrimaryColor,
    setAdminNavVariant,
  };
};
