<script setup lang="ts">
import { pages } from "@/utils/constants";

const progress = ref(0);

const { y } = useWindowScroll();

const calculateProgress = () => {
  const doc = document.documentElement;
  const scrollTop = y.value;
  const scrollHeight = doc.scrollHeight;
  const clientHeight = window.innerHeight;

  const total = scrollHeight - clientHeight;
  if (total > 0) {
    progress.value = (scrollTop / total) * 100;
  } else {
    progress.value = 0;
  }
};

onMounted(() => {
  // Recalculate on scroll
  watch(y, calculateProgress, { immediate: true });
});
</script>

<template>
  <v-bottom-navigation mode="shift">
    <v-progress-linear
      :model-value="progress"
      class="position-absolute"
      style="transition: 0s"
    />

    <template v-for="{ icon, title, to } in pages" :key="to">
      <v-btn stacked :to="to">
        <v-icon>
          <Icon :name="icon" />
        </v-icon>
        <span>{{ title }}</span>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>
