<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
defineProps({
  text: {
    type: String,
    default: "Text",
  },
});

onMounted(() => {
  gsap.timeline().fromTo(
    ".dash",
    {
      width: 0,
    },
    {
      width: 100,
      duration: 3,
      delay: 3,
      ease: "elastic",
    }
  ).fromTo(".text",{opacity:0},{opacity:1},"<");
});
</script>
<template>
  <div
    class="text-overline text-capitalize font-weight-bold d-flex align-center mb-3"
  >
    <span class="dash"></span>
    <span class="text">
      {{ text }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.dash {
  height: 1px;
  width: 100px;
  margin-right: 10px;
  background-color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  );
}
</style>
