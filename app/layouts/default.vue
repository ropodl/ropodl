<template>
  <v-app>
    <layouts-default-nav />
    <v-main class="mt-16">
      <div class="v-bg position-fixed top-0 right-0 left-0 bottom-0">
        <div
          aria-hidden="true"
          class="overflow-hidden opacity-20 w-100 h-100"
        />
      </div>
      <slot />
    </v-main>
    <layouts-default-foot />
  </v-app>
</template>
<style scoped>
@keyframes morph {
  0%,
  100% {
    clip-path: polygon(
      20% 50%,
      27% 66%,
      41% 66%,
      50% 50%,
      41% 34%,
      27% 34%,
      20% 50%,
      55% 50%,
      62% 66%,
      76% 66%,
      85% 50%,
      76% 34%,
      62% 34%,
      55% 50%,
      30% 50%,
      37% 66%,
      51% 66%,
      60% 50%,
      51% 34%,
      37% 34%,
      30% 50%
    );
  }
  50% {
    clip-path: polygon(
      22% 48%,
      30% 68%,
      43% 64%,
      52% 52%,
      43% 36%,
      28% 32%,
      22% 48%,
      57% 48%,
      64% 64%,
      78% 68%,
      87% 52%,
      78% 36%,
      64% 32%,
      57% 48%,
      32% 48%,
      39% 68%,
      53% 64%,
      62% 52%,
      53% 36%,
      39% 32%,
      32% 48%
    );
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.03) rotate(2deg);
  }
  50% {
    transform: scale(1.06) rotate(4deg);
  }
  75% {
    transform: scale(1.03) rotate(2deg);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.v-bg {
  filter: blur(56px);
  pointer-events: none;
}

.v-bg > div {
  background: linear-gradient(
    270deg,
    rgba(var(--v-theme-primary), 0.8),
    rgba(var(--v-theme-primary), 0.4),
    rgba(var(--v-theme-primary), 0.6)
  );
  background-size: 600% 600%;
  background-position: 0% 50%;
  z-index: -10;

  animation:
    morph 8s ease-in-out infinite,
    pulse 6s ease-in-out infinite,
    gradientShift 12s ease-in-out infinite;

  will-change: clip-path, transform, background-position;
}
</style>