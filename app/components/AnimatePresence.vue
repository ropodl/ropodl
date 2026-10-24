<script setup lang="ts">
import type { MotionTransition, MotionValues } from '~/utils/motion'

// Plays a leaving <Motion>'s `exit` animation before Vue removes it.
function onLeave(el: Element, done: () => void) {
  const exit = (el as Element & { __motionExit?: { values: MotionValues, transition?: MotionTransition } }).__motionExit
  if (!exit) return done()
  void animateMotion(el, {}, exit.values, exit.transition).then(done)
}
</script>

<template>
  <Transition
    :css="false"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>
