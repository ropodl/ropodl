<script setup lang="ts">
type MotionPreset = 'home' | 'profile' | 'contact' | 'login' | 'saved' | 'blog-list' | 'project-list' | 'article' | 'project'

const props = defineProps<{ preset: MotionPreset }>()
const scope = ref<HTMLElement>()

// Every preset is the same gentle fade-and-rise; only the duration differs.
const durations: Record<MotionPreset, number> = {
  'home': 0.12,
  'profile': 0.12,
  'contact': 0.12,
  'login': 0.12,
  'saved': 0.12,
  'blog-list': 0.12,
  'project-list': 0.12,
  'article': 0.12,
  'project': 0.12
}

onMounted(() => {
  if (scope.value) void animateMotion(scope.value, { opacity: 0, y: 2 }, {}, { duration: durations[props.preset] })
})
</script>

<template>
  <div ref="scope">
    <slot />
  </div>
</template>
