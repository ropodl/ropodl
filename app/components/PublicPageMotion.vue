<script setup lang="ts">
type MotionPreset = 'home' | 'profile' | 'contact' | 'login' | 'saved' | 'blog-list' | 'project-list' | 'article' | 'project'

const props = defineProps<{ preset: MotionPreset }>()
const scope = ref<HTMLElement>()

// Every preset is the same gentle fade-and-rise; only the duration differs.
const durations: Record<MotionPreset, number> = {
  'home': 0.34,
  'profile': 0.34,
  'contact': 0.32,
  'login': 0.28,
  'saved': 0.32,
  'blog-list': 0.32,
  'project-list': 0.32,
  'article': 0.34,
  'project': 0.34
}

onMounted(() => {
  if (scope.value) void animateMotion(scope.value, { opacity: 0, y: 6 }, {}, { duration: durations[props.preset] })
})
</script>

<template>
  <div ref="scope">
    <slot />
  </div>
</template>
