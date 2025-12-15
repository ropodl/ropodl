<script setup lang="ts">
import { left } from "@/composables/admin/layout/nav";
import type { navItem } from "@/types/layout";
import useApiFetch from "~/utils/shared/useApiFetch";

const route = useRoute()
const user = useState('user')

const navItems: navItem[] = [
   { icon: "carbon:home", title: "Home", to: "/admin" },
   {
      icon: "carbon:edit",
      title: "Blog",
      subtitle: "Content And Portfolio",
      subitems: [
         { title: "All Blogs", to: "/admin/blog" },
         { title: "Add New", to: "/admin/blog/create" },
         { title: "Category", to: "/admin/blog/category" },
         { title: "Tag", to: "/admin/blog/tag" },
      ],
   },
   {
      icon: "carbon:folders",
      title: "Portfolio",
      subitems: [
         { title: "All Portfolio", to: "/admin/portfolio" },
         { title: "Add New", to: "/admin/portfolio/create" },
         { title: "Work Type", to: "/admin/portfolio/type" },
      ],
   },
   {
      icon: "carbon:image",
      title: "Media",
      subitems: [
         { title: "Library", to: "/admin/media" },
         { title: "Add Media File", to: "/admin/media/create" }
   ]
   },
   {
      icon: "mdi-phone-outline",
      title: "Contact Request",
      subtitle: "Contact and Feedback",
      to: "/admin/contact",
   },
];

/**
 * @description Computes the breadcrumb items based on the current route path.
 */
const bread = computed(() => {
  // Get and filter path segments, removing the leading empty string
  // and the top-level 'admin' segment since it's handled as the root.
  const pathSegments = route.fullPath
    .split('/')
    .filter(segment => segment && segment !== 'admin');

  // Initialize the items array with the base 'Home' breadcrumb
  const items: { title: string; to: string }[] = [{
    title: 'Home', 
    to: '/admin'
  }];

  let currentPath = '/admin';

  pathSegments.forEach(segment => {
    let displayTitle: string;
    
    // Check if the segment is numeric (likely an ID for editing)
    const isNumericOrID = /^\d+$/.test(segment);
    
    if (segment === 'create') {
      displayTitle = 'create'; 
    } else if (isNumericOrID) {
      displayTitle = 'edit'; // Display 'Edit' instead of the ID
    } else {
      // Decode and format the segment title:
      // 1. Replace hyphens with spaces: 'all-blogs' -> 'all blogs'
      // 2. Capitalize the first letter of each word: 'all blogs' -> 'All Blogs'
      displayTitle = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toLowerCase());
    }

    // Update the full path for the 'to' link
    currentPath = `${currentPath}/${segment}`;

    // Add the breadcrumb item
    items.push({
      title: displayTitle,
      to: currentPath,
    });
  });

  return items;
});

onMounted(()=>{
   getUserDetails()
})

const getUserDetails = async() => {
   if(localStorage.getItem('user')) return user.value = localStorage.getItem('user')
   await useApiFetch("/auth/me").then((res)=>{
      user.value = res
      localStorage.setItem('user', res)
   })
}

const logOut = () => {
   const token = useCookie('token')

   user.value = null;
   token.value = null;
   localStorage.removeItem("user")
   navigateTo("/", {
      replace: true
   })
}
</script>

<template>
   <v-app>
      <v-navigation-drawer
         v-model="left"
         rail
         permanent
         color="rgba(var(--v-theme-surface), 0.7)"
         class="blur-8"
      >
         <v-list nav density="compact">
            <template v-for="item in navItems" :key="item.title">
               <template v-if="!item.subitems">
                  <v-list-item
                     v-tooltip="{
                        text: item.title,
                     }"
                     rounded="lg"
                     link
                     :title="item.title"
                     :to="item.to"
                  >
                     <template #prepend>
                        <v-icon :icon="item.icon" />
                     </template>
                  </v-list-item>
               </template>

               <template v-else>
                  <v-menu location="end" offset="14">
                     <template #activator="{ props: menuProps }">
                        <v-list-item
                           v-tooltip="{
                              text: item.title,
                           }"
                           v-bind="menuProps"
                           link
                           rounded="lg"
                        >
                           <template #prepend>
                              <v-icon :icon="item.icon" />
                           </template>
                        </v-list-item>
                     </template>

                     <v-card width="300">
                        <v-card-title class="d-flex align-center pb-0">
                           <v-icon start size="small" :icon="item.icon" />
                           {{ item.title }}
                        </v-card-title>

                        <v-list density="compact" class="pa-0">
                           <template
                              v-for="(subItem, i) in item.subitems"
                              :key="i"
                           >
                              <v-list-item
                                 link
                                 :title="subItem.title"
                                 :to="subItem.to"
                              />
                           </template>
                        </v-list>
                     </v-card>
                  </v-menu>
               </template>
            </template>
         </v-list>
         <template #append>
            <div class="d-flex justify-center">
               <v-menu
                  :close-on-content-click="false"
                  location="end"
                  offset="12"
               >
                  <template #activator="{ props }">
                     <v-avatar
                        v-bind="props"
                        class="mb-1"
                        rounded="lg"
                        size="42"
                     >
                        <v-img
                           cover
                           src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                        />
                     </v-avatar>
                  </template>
                  <v-card width="300">
                     <v-list>
                        <v-list-item @click="logOut">
                           <v-list-item-title> Sign Out </v-list-item-title>
                        </v-list-item>
                     </v-list>
                  </v-card>
               </v-menu>
            </div>
         </template>
      </v-navigation-drawer>
      <v-app-bar
         flat
         density="compact"
         class="blur-8"
         color="rgba(var(--v-theme-background),0.8)"
      >
         <v-container>
            <v-row>
               <v-col cols="12">
                  <div class="d-flex align-center">
                     <v-breadcrumbs class="d-flex align-center pa-0" :items="bread">
                        <template #prepend>
                           <nuxt-link class="me-2" to="/admin/" >
                              <v-icon size="24" color="white" icon="carbon:home" />
                           </nuxt-link>
                        </template>
                        
                        <template #item="{ item }">
                           <template v-if="item.title !== 'Home'">
                              <v-breadcrumbs-item
                                 :to="item.to"
                                 :disabled="route.fullPath === item.to"
                              >
                                 {{ item.title }}
                              </v-breadcrumbs-item>
                           </template>
                        </template>
                     </v-breadcrumbs>
                     
                     <v-spacer />
                     <slot name="test" />
                     <v-btn rounded="lg" icon="carbon:search" />
                     <v-btn rounded="lg" icon="carbon:notification" />
                  </div>
               </v-col>
            </v-row>
         </v-container>
      </v-app-bar>
      
      <v-main>
         <slot />
      </v-main>
   </v-app>
</template>