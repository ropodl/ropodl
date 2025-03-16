<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const fullscreen = useIsFullScreen();
const toggleFullScreen = () => {
  fullscreen.value.toggle();
};

const drawer = ref(true);
const search = ref(false);

const navItems = ref([
  {
    icon: "mdi-home-outline",
    title: "Home",
    routes: "/admin/",
  },
  {
    icon: "mdi-pencil-outline",
    title: "Blog",
    subtitle: "Content And Portfolio",
    subitems: [
      { title: "All Blogs", routes: "/admin/blog" },
      { title: "Add New", routes: "/admin/blog/create" },
      { title: "Categories", routes: "/admin/category" },
      { title: "Tags", routes: "/admin/tag" },
    ],
  },
  {
    icon: "mdi-image-outline",
    title: "Portfolio",
    subitems: [
      { title: "All Portfolio", routes: "/admin/portfolio" },
      { title: "Add New", routes: "/admin/portfolio/create" },
      { title: "Work Type", routes: "/admin/portfolio/type" },
    ],
  },
  {
    icon: "mdi-phone-outline",
    title: "Contact Request",
    subtitle: "Contact and Feedback",
    routes: "/admin/contact-request",
  },
]);

const settings = ref([
  {
    icon: "mdi-palette-outline",
    title: "Appearance Settings",
    to: "/admin/settings/appearance",
  },
  {
    icon: "mdi-account-outline",
    title: "Profile Settings",
    to: "/admin/settings/profile",
  },
]);

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return console.log(error.message);
  navigateTo("/", { replace: true, external: true });
};
</script>
<template>
  <v-app-bar
    border="b"
    elevation="0"
    height="50"
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
  >
    <v-container fluid class="py-0">
      <v-row align="center" justify="space-between">
        <v-col class="pa-0" cols="12" sm="4" md="4">
          <div class="d-flex align-center justify-start">
            <v-app-bar-nav-icon
              height="50"
              rounded="0"
              @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </div>
        </v-col>
        <v-col class="pa-0" cols="12" sm="4" md="4">
          <div class="d-flex align-center justify-center overflow-x-scroll">
            <v-btn
              border
              :ripple="false"
              height="40"
              width="200"
              class="justify-start"
              @click="search = true"
            >
              <span>Search...</span>
              <v-card-text class="d-flex align-center pe-0 py-0">
                <v-icon
                  class="mr-1"
                  size="small"
                  icon="mdi-apple-keyboard-command"
                />
                + k</v-card-text
              >
            </v-btn>
          </div>
        </v-col>
        <v-col class="pa-0" cols="12" sm="4" md="4">
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
                  >
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- search bar -->
  <lazy-admin-layout-search-bar
    v-model="search"
    :navItems
    :more-items="[...settings]"
  />
  <!-- nav drawer -->
  <v-navigation-drawer
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
  >
    <v-list density="compact" class="pa-2">
      <template v-for="{ title, subtitle, icon, subitems, routes } in navItems">
        <template v-if="subtitle">
          <v-list-subheader :title="subtitle" />
        </template>
        <!-- main like dashboard -->
        <template v-if="subitems">
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="icon"
                rounded="lg"
                :title
              />
            </template>
            <span v-for="{ title, miniitems, routes } in subitems">
              <!-- child's option -->
              <span v-if="miniitems">
                <v-list-group rounded="lg">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" rounded="lg" :title />
                  </template>
                  <!-- grand child -->
                  <template v-if="miniitems">
                    <template v-for="{ routes, title } in miniitems">
                      <v-list-item :title :to="routes" />
                    </template>
                  </template>
                </v-list-group>
              </span>
              <!-- child -->
              <span v-else>
                <v-list-item rounded="lg" exact :title :to="routes" />
              </span>
            </span>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :prepend-icon="icon" rounded="lg" :title :to="routes" />
        </template>
      </template>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-menu
        attach="body"
        location="right"
        :content-props="{
          style: 'top: unset important; bottom: 0;',
        }"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            block
            :ripple="false"
            color="transparent"
            height="70"
            class="justify-start pl-0"
            content-class="w-100"
            rounded="0"
            append-icon="mdi-unfold-more-horizontal"
          >
            <v-list-item>
              <template #prepend>
                <v-avatar rounded="lg">
                  <v-img src="/image/portfolio/api(new)/api.avif"></v-img>
                </v-avatar>
              </template>
              <v-list-item-title class="text-start">
                Saroj Poudel
              </v-list-item-title>
              <v-list-item-subtitle class="text-start">
                {{ user.email }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-btn>
        </template>
        <v-card>
          <template
            v-for="({ title, to, icon }, index) in settings"
            :key="index"
          >
            <v-list-item density="default" :prepend-icon="icon" :title :to />
          </template>
          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-power"
            title="Sign Out"
            @click="signOut"
          />
        </v-card>
      </v-menu>
    </template>
  </v-navigation-drawer>
</template>
