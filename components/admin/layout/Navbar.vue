<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const fullscreen = useIsFullScreen();
const toggleFullScreen = () => fullscreen.value.toggle();

const drawer = ref(true);
const search = ref(false);
const selectedTab = ref(0);

const navItems = ref([
  { icon: "mdi-home-outline", title: "Home", to: "/admin/" },
  {
    icon: "mdi-pencil-outline",
    title: "Blog",
    subtitle: "Content And Portfolio",
    subitems: [
      { title: "All Blogs", to: "/admin/blog" },
      { title: "Add New", to: "/admin/blog/create" },
      { title: "Categories", to: "/admin/category" },
      { title: "Tags", to: "/admin/tag" },
    ],
  },
  {
    icon: "mdi-image-outline",
    title: "Portfolio",
    subitems: [
      { title: "All Portfolio", to: "/admin/portfolio" },
      { title: "Add New", to: "/admin/portfolio/create" },
      { title: "Work Type", to: "/admin/portfolio/type" },
    ],
  },
  {
    icon: "mdi-phone-outline",
    title: "Contact Request",
    subtitle: "Contact and Feedback",
    to: "/admin/contact-request",
  },
]);

const settings = ref([
  {
    icon: "mdi-account-outline",
    title: "Profile Settings",
    to: "/admin/settings/",
  },
  {
    icon: "mdi-palette-outline",
    title: "Appearance Settings",
    to: "/admin/settings/appearance",
  },
]);

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error.message);
  else router.push("/", { replace: true });
};

/**
 * Checks if a route path is in a section
 */
const isRouteInSection = (path, sectionPath) => {
  if (!sectionPath) return false;

  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  const normalizedSectionPath = sectionPath.endsWith("/")
    ? sectionPath.slice(0, -1)
    : sectionPath;

  // Special case for admin home - EXACT matching only
  if (
    normalizedSectionPath === "/admin" ||
    normalizedSectionPath === "/admin/"
  ) {
    return normalizedPath === "/admin";
  }

  // Exact match
  if (normalizedPath === normalizedSectionPath) {
    return true;
  }

  // If checking admin root, don't match children
  if (normalizedSectionPath === "/admin") return false;

  // Check if path is a child of the section
  return normalizedPath.startsWith(normalizedSectionPath + "/");
};

/**
 * Checks if a path is in any of the subitems
 */
const isPathInSubitems = (path, subitems) =>
  subitems?.some((subitem) => isRouteInSection(path, subitem.to));

/**
 * Determines if a settings route is active
 */
const isSettingsRouteActive = (settingsPath) =>
  isRouteInSection(route.path, settingsPath);

/**
 * Gets the index of the active main navigation item
 */
const getActiveTabIndex = () =>
  navItems.value.findIndex(
    (item) =>
      (item.to && isRouteInSection(route.path, item.to)) ||
      isPathInSubitems(route.path, item.subitems)
  );

// Active items and UI state computations
const activeItem = computed(() => navItems.value[selectedTab.value] || null);
const showRail = computed(() => drawer.value && !!activeItem.value?.subitems);

// Function to select a tab
const selectTab = (index) => {
  drawer.value = true;
  selectedTab.value = index;
  const targetRoute = navItems.value[index]?.to;
  if (targetRoute) {
    router.push(targetRoute);
  }
};

// Update selectedTab when route changes
watch(
  () => route.path,
  () => {
    const activeIndex = getActiveTabIndex();
    if (activeIndex >= 0) {
      selectedTab.value = activeIndex;
    }
  },
  { immediate: true }
);

// For determining active states of subitems
const isSubItemActive = (to) => isRouteInSection(route.path, to);
</script>

<template>
  <v-app-bar
    order="2"
    border="b"
    elevation="0"
    height="50"
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
  >
    <v-container fluid class="py-0">
      <v-row align="center" justify="space-between">
        <!-- <v-col cols="12" sm="4" md="4" class="pa-0">
          <div class="d-flex align-center justify-start"></div>
        </v-col> -->

        <v-col cols="12" sm="4" md="4">
          <v-card width="200" height="40" @click="search = true">
            <v-card-text
              class="h-100 text-subtitle-1 d-flex align-center justify-space-between py-0"
            >
              <span class="">Search...</span>
              <span>
                <v-icon
                  class="mr-1"
                  size="x-small"
                  icon="mdi-apple-keyboard-command"
                />+ k
              </span>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4" md="4" class="pa-0">
          <div class="d-flex align-center justify-end">
            <v-tooltip
              theme="light"
              location="bottom"
              :text="
                fullscreen.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
              "
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  rounded="0"
                  height="50"
                  @click="toggleFullScreen"
                >
                  <v-icon
                    :icon="`mdi-fullscreen${
                      fullscreen.isFullscreen ? '-exit' : ''
                    }`"
                  />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <lazy-admin-layout-search-bar
    v-model="search"
    :navItems="navItems"
    :more-items="settings"
  />

  <v-navigation-drawer rail>
    <v-btn
      rounded="0"
      height="50"
      width="55"
      :icon="showRail ? 'mdi-menu-open' : 'mdi-menu-close'"
      @click="drawer = !drawer"
    ></v-btn>
    <v-divider></v-divider>
    <v-list class="py-0">
      <v-list-item
        v-for="({ title, icon, to }, index) in navItems"
        :key="`main-${index}`"
        v-tooltip="title"
        exact
        :title="title"
        :prepend-icon="icon"
        :active="selectedTab === index"
        @click="selectTab(index)"
        color="primary"
        base-color="grey"
      />
    </v-list>

    <template v-slot:append>
      <v-list class="py-0">
        <v-list-item
          v-for="({ icon, title, to }, index) in settings"
          :key="`settings-${index}`"
          v-tooltip="title"
          exact
          :title="title"
          :to="to"
          :prepend-icon="icon"
          color="primary"
          base-color="grey"
        />
      </v-list>
      <v-divider />
      <v-list class="py-0">
        <v-dialog scrim="black" width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-list-item
              v-bind="activatorProps"
              v-tooltip="'Sign Out'"
              prepend-icon="mdi-power"
              title="Sign Out"
              base-color="grey"
            />
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Sure you want to log out?">
              <v-card-text>You'll be logged out of the system.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="px-6"
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
                <v-btn
                  text="Yes, log out"
                  variant="flat"
                  class="px-6"
                  color="primary"
                  @click="signOut"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-list>
    </template>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="showRail"
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
  >
    <v-list class="py-0">
      <template v-for="({ to, title }, index) in activeItem?.subitems || []">
        <v-list-item :to :title exact color="primary" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
