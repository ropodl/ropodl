<script setup>
const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
  profileItems: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const router = useRouter();

// Recent history management
const MAX_HISTORY_ITEMS = 5;
const recentHistory = ref([]);

// Load history from localStorage
onMounted(() => {
  const savedHistory = localStorage.getItem("routeHistory");
  if (savedHistory) {
    recentHistory.value = JSON.parse(savedHistory);
  }
});

// Track route changes
router.afterEach((to) => {
  // Find matching nav item for the current route
  const matchingItem = [...allSearchableItems.value].find(
    (item) => item.to === to.path
  );
  if (!matchingItem) return;

  // Add to history if it's a new route
  const historyItem = {
    ...matchingItem,
    timestamp: Date.now(),
  };

  recentHistory.value = [
    historyItem,
    ...recentHistory.value.filter((item) => item.to !== to.path),
  ].slice(0, MAX_HISTORY_ITEMS);

  // Save to localStorage
  localStorage.setItem("routeHistory", JSON.stringify(recentHistory.value));
});

// Flatten nav items to create searchable array
const flattenNavItems = (items) => {
  return items.reduce((acc, item) => {
    if (item.routes) {
      acc.push({
        title: item.title,
        to: item.routes,
        icon: item.icon,
      });
    }

    if (item.subitems) {
      const subitems = item.subitems.map((subitem) => ({
        title: `${item.title} > ${subitem.title}`,
        to: subitem.routes,
        icon: item.icon,
      }));
      acc.push(...subitems);
    }

    return acc;
  }, []);
};

// Combine and format all searchable items
const allSearchableItems = computed(() => [
  ...flattenNavItems(props.navItems),
  ...props.profileItems,
]);

// Search functionality
const searchQuery = ref("");
const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  // If no query, show recent history
  if (!query) {
    return recentHistory.value.map((item) => ({
      ...item,
      subtitle: "Recent",
    }));
  }

  return allSearchableItems.value
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.to && item.to.toLowerCase().includes(query))
    )
    .slice(0, 10);
});

// Keyboard navigation
const selectedIndex = ref(-1);
const searchInput = ref(null);

const handleKeyDown = (e) => {
  if (!searchResults.value.length) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value =
        (selectedIndex.value + 1) % searchResults.value.length;
      break;

    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value <= 0
          ? searchResults.value.length - 1
          : selectedIndex.value - 1;
      break;

    case "Enter":
      if (selectedIndex.value >= 0) {
        e.preventDefault();
        goToPage(searchResults.value[selectedIndex.value]);
      }
      break;

    case "Escape":
      e.preventDefault();
      closeSearch();
      break;
  }
};

watch(searchQuery, () => {
  selectedIndex.value = -1;
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      searchQuery.value = "";
      selectedIndex.value = -1;
    }
  }
);

const closeSearch = () => {
  emit("update:modelValue", false);
};

const goToPage = (item) => {
  closeSearch();
  router.push(item.to);
};

const handleSearch = (e) => {
  searchQuery.value = e.target.value || "";
};

// Keyboard shortcut
const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key.toLowerCase() === "k") e.preventDefault();
  },
});
const ctrlK = keys["Ctrl+k"];

watch(ctrlK, () => {
  emit("update:modelValue", true);
});
</script>

<template>
  <v-overlay
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    scrim="black"
    class="d-flex align-center justify-center"
  >
    <v-card
      width="500"
      color="rgba(var(--v-theme-background),0.8)"
      style="backdrop-filter: blur(8px)"
      @keydown="handleKeyDown"
    >
      <v-card-title class="pa-0">
        <v-text-field
          ref="searchInput"
          v-model="searchQuery"
          autofocus
          autocomplete="off"
          hide-details
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          rounded="0"
          placeholder="Type a command or search..."
          clearable
          @input="handleSearch"
          @click:clear="searchQuery = ''"
        ></v-text-field>
      </v-card-title>
      <v-card-text class="pa-0" style="min-height: 270px; overflow-y: scroll">
        <v-list bg-color="transparent" v-if="searchResults.length > 0">
          <template v-for="(item, index) in searchResults" :key="item.to">
            <v-list-item
              height="50"
              :active="selectedIndex === index"
              :title="item.title"
              :prepend-icon="item.icon"
              @click="goToPage(item)"
              @mouseover="selectedIndex = index"
            >
              <template v-slot:subtitle>
                <span v-if="item.subtitle">{{ item.subtitle }}</span>
                <span v-else>{{ item.to }}</span>
              </template>
            </v-list-item>
            <v-divider v-if="searchResults.length - 1 !== index"></v-divider>
          </template>
        </v-list>
        <template v-else-if="searchQuery">
          <v-list bg-color="transparent">
            <v-list-item color="transparent">
              <template v-slot:default> No results found </template>
            </v-list-item>
          </v-list>
        </template>
      </v-card-text>
      <v-card-actions
        class="bg-surface d-flex align-center justify-space-around"
      >
        <span>
          <v-icon icon="mdi-keyboard-return" size="small"></v-icon>
          to select
        </span>
        <v-divider vertical></v-divider>
        <span>
          <v-icon icon="mdi-arrow-up" size="small"></v-icon>
          <v-icon icon="mdi-arrow-down" size="small"></v-icon>
          to navigate
        </span>
        <v-divider vertical></v-divider>
        <v-icon icon="mdi-keyboard-esc" size="small"></v-icon>
        <span>enter to close</span>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>
