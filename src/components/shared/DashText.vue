<script setup>
defineProps({
  text: {
    type: String,
    default: "Text",
  },
});
</script>
<template>
  <div
    class="text-overline text-capitalize font-weight-bold pt-16 d-flex align-center mb-3"
  >
    <span class="dash"></span>
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.dash {
  height: 1px;
  width: 40px;
  margin-right: 10px;
  background-color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  );
}
</style>
