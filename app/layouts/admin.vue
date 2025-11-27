<script setup lang="ts">
import { left, right } from "@/composables/admin/layout/nav";
import type { navItem } from "@/types/layout";
// import {
//     computed,
//     defineAsyncComponent
//  } from 'vue';

// const snackbar = defineAsyncComponent(() => import('@/components/shared/snackbar.vue'));

const navItems: navItem[] = [
  { icon: "carbon:home", title: "Home", to: "/admin" },
  {
    icon: "carbon:edit",
    title: "Blog",
    subtitle: "Content And Portfolio",
    subitems: [
      { title: "All Blogs", to: "/admin/blog" },
      { title: "Add New", to: "/admin/blog/create" },
      { title: "Categories", to: "/admin/category" },
      { title: "Tags", to: "/admin/tag" },
      {
        title: "Blog Comments",
        grand: [{ title: "All Comments", to: "/admin/blog/comments" }],
      },
    ],
  },
  {
    icon: "carbon:image",
    title: "Portfolio",
    subitems: [
      { title: "All Portfolio", to: "/admin/portfolio" },
      { title: "Add New", to: "/admin/portfolio/create" },
      { title: "Work Type", to: "/admin/portfolio-type" },
    ],
  },
  {
    icon: "mdi-phone-outline",
    title: "Contact Request",
    subtitle: "Contact and Feedback",
    to: "/admin/contact-request",
  },
];

// --- OPTIMIZATIONS AND FIXES ---

// Use `const` - this value doesn't change at runtime.
// const rootURL = import.meta.env.VITE_APP_URL;

// Use `computed` - this calculates the path only when the URL changes.
// const currentPath = computed(() => {
//   return props.ziggy.location.replace(rootURL, '');
// });

/**
 * Recursively checks if a nav item or any of its children are active.
 */
// const isItemActive = (item: navItem): boolean => {
//   const path = currentPath.value;
//   // 1. Check item's own 'to'
//   if (item.to && item.to === path) {
//     return true;
//   }
//   // 2. Check 'subitems' recursively
//   if (item.subitems && item.subitems.some((sub) => isItemActive(sub))) {
//     return true;
//   }
//   // 3. Check 'grand' items recursively
//   if (item.grand && item.grand.some((grand) => isItemActive(grand))) {
//     return true;
//   }
//   // Not active
//   return false;
// };
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="left"
      rail
      permanent
      height="100"
      color="rgba(var(--v-theme-surface), 0.7)"
      class="blur-8"
    >
      <v-list nav density="compact">
        <template v-for="item in navItems" :key="item.title">
          <template v-if="!item.subitems">
            <v-list-item rounded="lg" link :title="item.title" :to="item.to">
              <template #prepend>
                <v-icon>
                  <Icon :name="item.icon" />
                </v-icon>
              </template>
            </v-list-item>
          </template>

          <template v-else>
            <v-menu :close-on-content-click="false" location="end" offset="14">
              <template #activator="{ props: menuProps }">
                <v-list-item v-bind="menuProps" link rounded="lg">
                  <template #prepend>
                    <v-icon>
                      <Icon :name="item.icon" />
                    </v-icon>
                  </template>
                </v-list-item>
              </template>

              <v-card width="300">
                <v-card-title class="d-flex align-center pb-0">
                  <v-icon start size="small">
                    <Icon :name="item.icon" />
                  </v-icon>
                  {{ item.title }}
                </v-card-title>

                <v-list density="compact" class="pa-0">
                  <template v-for="(subItem, i) in item.subitems" :key="i">
                    <template v-if="subItem.grand">
                      <v-list-group :value="subItem.title">
                        <template #activator="{ props: groupProps }">
                          <v-list-item
                            v-bind="groupProps"
                            :title="subItem.title"
                          />
                        </template>

                        <v-list-item
                          v-for="(grandItem, j) in subItem.grand"
                          :key="j"
                          :title="grandItem.title"
                          link
                          :to="grandItem.to"
                        />
                        <!-- :active="isItemActive(grandItem)"
                          @click="grandItem.to && router.visit(grandItem.to)" -->
                      </v-list-group>
                    </template>

                    <template v-else>
                      <v-list-item link :title="subItem.title" />
                      <!-- :active="isItemActive(subItem)"
                        @click="subItem.to && router.visit(subItem.to)" -->
                    </template>
                  </template>
                </v-list>
              </v-card>
            </v-menu>
          </template>
        </template>
      </v-list>
      <template #append>
        <v-divider />
        <v-list>
          <!-- <template v-if="props.auth?.user">
            <v-list-item
              class="pe-0"
              :title="props.auth?.user.name"
              :subtitle="props.auth?.user.email"
            >
              <template #prepend>
                <v-avatar>
                  <v-img :src="`https://ui-avatars.com/api/?name=${props.auth?.user.name}`"></v-img>
                </v-avatar>
              </template>
              <template #append>
                <v-menu>
                  <template v-slot:activator="{ props: menuProps }">
                    <v-btn
                      v-bind="menuProps"
                      icon="mdi-menu-down"
                      size="small"
                      variant="text"
                    ></v-btn>
                  </template>
                  <v-list density="compact">
                    <v-list-item title="Profile Settings"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item title="Log Out"></v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
          </template> -->
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
    <!-- <v-layout>
      <snackbar />
    </v-layout> -->
    <v-navigation-drawer
      v-model="right"
      temporary
      order="2"
      location="right"
      width="400"
      color="rgba(var(--v-theme-surface), 0.7)"
      class="pa-3 blur-8"
      content-class="d-flex flex-column"
    >
      <slot name="right-nav-body" />
      <template #append>
        <slot name="right-nav-append" />
      </template>
    </v-navigation-drawer>
  </v-app>
</template>
