<template>
  <div class="page-title font-weight-bold">
    <slot />
  </div>
</template>
<style scoped>
.page-title {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.94;
  letter-spacing: -0.04em;
  max-width: 12ch;
}
</style>
