<template>
  <section class="py-2 sm:py-3">
    <Motion
      as="div"
      :while-hover="{ y: -2 }"
      :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
      class="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.12),transparent_60%)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div>
        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          Have a project in mind?
        </p>
        <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
          Let’s make something thoughtful.
        </h2>
      </div>
      <Motion
        as="div"
        :while-hover="{ scale: 1.02 }"
        :while-press="{ scale: 0.97 }"
        :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
      >
        <UButton
          to="/contact"
          color="primary"
          size="lg"
          class="shrink-0"
        >
          Start a conversation
          <template #trailing>
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </template>
        </UButton>
      </Motion>
    </Motion>
  </section>
</template>
