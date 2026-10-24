<script setup lang="ts">
import { authClient } from '../lib/auth-client'

const route = useRoute()
const { data: session } = await authClient.useSession(useFetch)
const sidebarOpen = ref(false)

const navigationGroups = [
  { label: 'Workspace', items: [{ label: 'Overview', to: '/admin', icon: 'i-lucide-layout-dashboard' }] },
  { label: 'Pages', items: [{ label: 'Manage pages', to: '/admin/pages', icon: 'i-lucide-panels-top-left' }] },
  { label: 'Blog', items: [
    { label: 'All blog posts', to: '/admin/blogs', icon: 'i-lucide-files' },
    { label: 'Create blog post', to: '/admin/blogs/create', icon: 'i-lucide-file-plus-2' },
    { label: 'Categories', to: '/admin/blogs/categories', icon: 'i-lucide-folders' },
    { label: 'Tags', to: '/admin/blogs/tags', icon: 'i-lucide-tags' }
  ] },
  { label: 'Project', items: [
    { label: 'All projects', to: '/admin/projects', icon: 'i-lucide-panels-top-left' },
    { label: 'Create project', to: '/admin/projects/create', icon: 'i-lucide-folder-plus' },
    { label: 'Work types', to: '/admin/projects/types', icon: 'i-lucide-shapes' }
  ] },
  { label: 'Media', items: [
    { label: 'File explorer', to: '/admin/media', icon: 'i-lucide-images' }
  ] },
  { label: 'Website', items: [
    { label: 'Contact inbox', to: '/admin/contacts', icon: 'i-lucide-inbox' }
  ] },
  { label: 'Settings', items: [
    { label: 'Profile & security', to: '/admin/settings/profile', icon: 'i-lucide-user-round' },
    { label: 'Audit log', to: '/admin/audit', icon: 'i-lucide-history' }
  ] }
]

const pageTitle = computed(() => navigationGroups.flatMap(group => group.items).find(item => item.to === route.path)?.label || 'Workspace')
const initials = computed(() => session.value?.user.name?.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase() || 'A')

async function signOut() {
  await authClient.signOut()
  await navigateTo('/login')
}

function closeSidebarWithEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') sidebarOpen.value = false
}

onMounted(() => window.addEventListener('keydown', closeSidebarWithEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeSidebarWithEscape))
</script>

<template>
  <!-- eslint-disable-next-line better-tailwindcss/no-unknown-classes -- marker class for the :root:has(.admin-workspace) token remap in main.css -->
  <div class="admin-workspace min-h-screen bg-default text-default">
    <a
      href="#admin-main"
      class="skip-link"
    >Skip to main content</a>
    <button
      v-if="sidebarOpen"
      type="button"
      class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
      aria-label="Close navigation menu"
      @click="sidebarOpen = false"
    />

    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-default bg-muted transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-[76px] shrink-0 items-center gap-3 border-b border-default px-6">
        <img
          src="/icon.svg"
          alt=""
          aria-hidden="true"
          class="size-9 object-contain"
        >
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold tracking-wide text-highlighted">
            Saroj Poudel
          </p>
          <p class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Admin workspace
          </p>
        </div>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          class="ml-auto lg:hidden"
          aria-label="Close navigation menu"
          @click="sidebarOpen = false"
        />
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-7 pb-4">
        <nav
          class="space-y-5"
          aria-label="Admin navigation"
        >
          <div
            v-for="group in navigationGroups"
            :key="group.label"
          >
            <p class="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-dimmed">
              {{ group.label }}
            </p>
            <div class="mt-2 space-y-1">
              <NuxtLink
                v-for="item in group.items"
                :key="item.to"
                :to="item.to"
                class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors"
                :class="route.path === item.to ? 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/15' : 'text-muted hover:bg-elevated hover:text-highlighted'"
                :aria-current="route.path === item.to ? 'page' : undefined"
                @click="sidebarOpen = false"
              >
                <UIcon
                  :name="item.icon"
                  class="size-[17px] transition-colors"
                  :class="route.path === item.to ? 'text-primary' : 'text-dimmed group-hover:text-toned'"
                />
                <span>{{ item.label }}</span>
                <span
                  v-if="route.path === item.to"
                  class="ml-auto size-1.5 rounded-full bg-primary"
                />
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>

      <div class="mt-auto shrink-0 space-y-4 p-4">
        <div class="flex items-center gap-3 border-t border-default pt-4">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{{ initials }}</span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-xs font-medium text-highlighted">
              {{ session?.user.name }}
            </p>
            <p class="truncate text-[10px] text-muted">
              {{ session?.user.email }}
            </p>
          </div>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-log-out"
            aria-label="Sign out"
            @click="signOut"
          />
        </div>
      </div>
    </aside>

    <div class="min-h-screen lg:pl-[264px]">
      <header class="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-default bg-default/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-menu"
            class="lg:hidden"
            aria-label="Open navigation menu"
            :aria-expanded="sidebarOpen"
            @click="sidebarOpen = true"
          />
          <div class="flex items-center gap-2 text-xs text-muted">
            <span class="hidden sm:inline">Workspace</span>
            <UIcon
              name="i-lucide-chevron-right"
              class="hidden size-3 sm:inline"
            />
            <span class="font-medium text-highlighted">{{ pageTitle }}</span>
          </div>
        </div>
      </header>
      <main
        id="admin-main"
        tabindex="-1"
        class="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-11"
      >
        <slot :user="session?.user" />
      </main>
    </div>
  </div>
</template>
