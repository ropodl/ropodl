<script setup lang="ts">
import type { MotionTransition, MotionValues } from '~/utils/motion'

const props = withDefaults(defineProps<{
  as?: string
  initial?: MotionValues
  animate?: MotionValues
  exit?: MotionValues
  whileHover?: MotionValues
  whilePress?: MotionValues
  transition?: MotionTransition
}>(), { as: 'div' })

const element = ref<HTMLElement>()
const entered = ref(!props.initial)

const interactive = computed(() => Boolean(props.whileHover || props.whilePress))
const style = computed(() => {
  const css: Record<string, string | number> = {}
  // Server render and first paint show the initial state, so the enter animation doesn't flash.
  if (!entered.value && props.initial) Object.assign(css, motionKeyframe(props.initial))
  if (interactive.value) {
    const { duration = 0.16, ease = [0.16, 1, 0.3, 1] } = props.transition ?? {}
    css['--motion-duration'] = `${duration}s`
    css['--motion-ease'] = `cubic-bezier(${ease.join(', ')})`
    for (const [prefix, values] of [['hover', props.whileHover], ['press', props.whilePress]] as const) {
      if (!values) continue
      if (values.x !== undefined) css[`--motion-${prefix}-x`] = `${values.x}px`
      if (values.y !== undefined) css[`--motion-${prefix}-y`] = `${values.y}px`
      if (values.scale !== undefined) css[`--motion-${prefix}-scale`] = values.scale
    }
  }
  return css
})

onMounted(() => {
  const el = element.value
  if (!el) return
  // AnimatePresence reads this when the element leaves.
  if (props.exit) Object.assign(el, { __motionExit: { values: props.exit, transition: props.transition } })
  if (props.initial) {
    entered.value = true
    void animateMotion(el, props.initial, props.animate ?? {}, props.transition)
  }
})
</script>

<template>
  <component
    :is="as"
    ref="element"
    :style="style"
    :data-motion="interactive ? '' : undefined"
  >
    <slot />
  </component>
</template>
