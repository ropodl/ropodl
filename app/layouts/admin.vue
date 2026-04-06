<script setup lang="ts">
import { left } from '@/composables/admin/layout/nav';
import type { navItem } from '@/types/layout';
import { useDisplay } from 'vuetify';
import { useAuth } from '~/composables/admin/auth/useAuth';
import { useAppearance } from '~/composables/useAppearance';

const { density, isDark, toggleTheme, adminNavVariant } = useAppearance();
const { mdAndDown } = useDisplay();
const adminDensity = computed(() => density.value || 'compact');
const railExpanded = ref(false);
const openedGroups = ref<string[]>([]);

const route = useRoute();
const { user, fetchUser, logout } = useAuth();

const navItems: navItem[] = [
  { icon: 'carbon:home', title: 'Home', to: '/admin' },
  {
    icon: 'carbon:edit',
    title: 'Blog',
    subtitle: 'Content and publishing',
    subitems: [
      { title: 'All Blogs', to: '/admin/blog' },
      { title: 'Add New', to: '/admin/blog/create' },
      { title: 'Category', to: '/admin/blog/category' },
      { title: 'Tag', to: '/admin/blog/tag' },
    ],
  },
  {
    icon: 'carbon:folders',
    title: 'Portfolio',
    subitems: [
      { title: 'All Portfolio', to: '/admin/portfolio' },
      { title: 'Add New', to: '/admin/portfolio/create' },
      { title: 'Work Type', to: '/admin/portfolio/type' },
    ],
  },
  {
    icon: 'carbon:image',
    title: 'Media',
    subitems: [
      { title: 'Library', to: '/admin/media' },
      { title: 'Add Media File', to: '/admin/media/create' },
    ],
  },
  {
    icon: 'carbon:phone',
    title: 'Contact Request',
    subtitle: 'Messages and feedback',
    to: '/admin/contact',
  },
  {
    icon: 'carbon:settings',
    title: 'Settings',
    subitems: [
      { title: 'Profile', to: '/admin/settings/profile' },
      { title: 'Appearance', to: '/admin/settings/appearance' },
      { title: 'Audit Logs', to: '/admin/settings/logs' },
    ],
  },
];

const bread = computed(() => {
  const pathSegments = route.fullPath
    .split('/')
    .filter((segment) => segment && segment !== 'admin');

  const items: { title: string; to: string }[] = [
    {
      title: 'Home',
      to: '/admin',
    },
  ];

  let currentPath = '/admin';

  pathSegments.forEach((segment) => {
    let displayTitle = segment;

    if (segment === 'create') {
      displayTitle = 'Create';
    } else if (/^\d+$/.test(segment)) {
      displayTitle = 'Edit';
    } else {
      displayTitle = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    currentPath = `${currentPath}/${segment}`;
    items.push({
      title: displayTitle,
      to: currentPath,
    });
  });

  return items;
});

onMounted(() => {
  fetchUser();
});

const isRailVariant = computed(() => adminNavVariant.value === 'rail');
const isDesktopRail = computed(() => !mdAndDown.value && isRailVariant.value);
const topbarVariant = computed(() =>
  isDark.value ? 'rgba(9, 11, 16, 0.72)' : 'rgba(244, 246, 251, 0.78)'
);

const drawerWidth = computed(() => {
  switch (adminNavVariant.value) {
    case 'compact':
      return 208;
    case 'rail':
      return isDesktopRail.value && !railExpanded.value ? 88 : 240;
    case 'floating':
      return 248;
    default:
      return 240;
  }
});

const drawerClass = computed(() => ({
  'admin-drawer--compact': adminNavVariant.value === 'compact',
  'admin-drawer--rail': adminNavVariant.value === 'rail',
  'admin-drawer--floating': adminNavVariant.value === 'floating',
}));

const isRouteActive = (to?: string) => {
  if (!to) return false;
  return route.path === to || route.path.startsWith(`${to}/`);
};

const expandRailDrawer = () => {
  if (isDesktopRail.value && !railExpanded.value) {
    railExpanded.value = true;
  }
};

const isGroupActive = (item: navItem) =>
  !!item.subitems?.some((subItem) => isRouteActive(subItem.to));

const visibleNavItems = computed(() => {
  if (!(isDesktopRail.value && !railExpanded.value)) {
    return navItems;
  }

  return navItems.filter((item) => item.subitems?.length || isRouteActive(item.to));
});

watch(
  [adminNavVariant, mdAndDown],
  () => {
    railExpanded.value = false;
    openedGroups.value = [];
  }
);

watch(
  () => route.fullPath,
  () => {
    railExpanded.value = false;
    openedGroups.value = [];
  }
);
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="left"
      :temporary="mdAndDown"
      :permanent="!mdAndDown"
      :width="drawerWidth"
      :rail="isDesktopRail && !railExpanded"
      border="end"
      :class="drawerClass"
      color="surface"
    >
      <div class="pa-3 pb-1">
        <v-sheet
          border
          color="surface-variant"
          class="px-3 py-2"
        >
          <div class="text-caption text-uppercase text-medium-emphasis">Workspace</div>
          <div class="text-subtitle-2 font-weight-medium">Admin Control</div>
        </v-sheet>
      </div>

      <v-list v-model:opened="openedGroups" nav density="compact" class="px-3 pb-3">
        <v-list-subheader>Navigation</v-list-subheader>

        <template v-for="item in visibleNavItems" :key="item.title">
          <v-list-item
            v-if="!item.subitems"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="adminNavVariant === 'classic' ? item.subtitle : undefined"
            :to="item.to"
            :active="isRouteActive(item.to)"
            rounded="lg"
            @click="expandRailDrawer"
          />

          <v-list-group v-else :value="item.title">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.title"
                :subtitle="adminNavVariant === 'classic' ? item.subtitle : undefined"
                :active="isGroupActive(item)"
                rounded="lg"
                @click="expandRailDrawer"
              />
            </template>

            <v-list-item
              v-for="(subItem, i) in item.subitems"
              :key="i"
              :title="subItem.title"
              :to="subItem.to"
              :active="isRouteActive(subItem.to)"
              rounded="lg"
              @click="expandRailDrawer"
            />
          </v-list-group>
        </template>
      </v-list>

      <template #append>
        <div v-if="adminNavVariant !== 'rail' || railExpanded" class="pa-3 pt-1">
          <v-sheet border color="surface-variant" class="pa-3">
            <div class="d-flex align-center">
              <v-avatar color="primary" variant="tonal" size="34">
                <span class="text-subtitle-2 font-weight-bold">
                  {{ (user?.fullname || user?.email || 'R').slice(0, 1).toUpperCase() }}
                </span>
              </v-avatar>
              <div class="ml-3 min-w-0">
                <div class="font-weight-medium text-truncate">
                  {{ user?.fullname || 'Administrator' }}
                </div>
                <div class="text-caption text-medium-emphasis text-truncate">
                  {{ user?.email || 'Signed in' }}
                </div>
              </div>
            </div>

            <div class="d-flex mt-3 ga-2">
              <v-btn
                size="small"
                variant="text"
                to="/admin/settings/profile"
              >
                Profile
              </v-btn>
              <v-spacer />
              <v-btn
                size="small"
                variant="text"
                color="error"
                @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </v-sheet>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      border="b"
      density="comfortable"
      class="admin-topbar"
      :style="{ backgroundColor: topbarVariant }"
    >
      <v-app-bar-nav-icon v-if="mdAndDown" @click="left = !left" />
      <div class="d-flex flex-column">
        <div class="text-caption text-uppercase text-medium-emphasis">Admin</div>
        <v-app-bar-title class="text-subtitle-1 font-weight-medium">
          {{ route.meta?.title || bread.at(-1)?.title || 'Dashboard' }}
        </v-app-bar-title>
      </div>

      <v-spacer />

      <v-chip size="small" class="mr-2" color="primary">
        {{ adminDensity }}
      </v-chip>

      <v-btn
        size="small"
        variant="text"
        :prepend-icon="isDark ? 'carbon:moon' : 'carbon:sun'"
        @click="toggleTheme"
      >
        {{ isDark ? 'Dark' : 'Light' }}
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        to="/admin/settings/appearance"
      >
        Settings
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-defaults-provider
        :defaults="{
          VBtn: { density: adminDensity, rounded: 'pill' },
          VTextField: { density: adminDensity, variant: 'solo-filled', rounded: 'lg', flat: true },
          VTextarea: { density: adminDensity, variant: 'solo-filled', rounded: 'lg', flat: true },
          VSelect: { density: adminDensity, variant: 'solo-filled', rounded: 'lg', flat: true },
          VAutocomplete: { density: adminDensity, variant: 'solo-filled', rounded: 'lg', flat: true },
          VDataTableServer: { density: adminDensity },
          VDataTable: { density: adminDensity },
          VList: { density: adminDensity },
          VListItem: { density: adminDensity, rounded: 'lg' },
          VChip: { density: adminDensity, rounded: 'pill', variant: 'tonal' },
          VCard: { rounded: 'xl', elevation: 0, border: true },
          VSheet: { rounded: 'xl' },
        }"
      >
        <v-container fluid class="py-4">
          <v-breadcrumbs class="px-0 pt-0 text-caption" :items="bread">
            <template #prepend>
              <nuxt-link class="me-2 d-inline-flex" to="/admin">
                <v-icon size="18" icon="carbon:home" />
              </nuxt-link>
            </template>
          </v-breadcrumbs>

          <slot />
        </v-container>
      </v-defaults-provider>
    </v-main>
  </v-app>
</template>
