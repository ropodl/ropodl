<script setup lang="ts">
import socials from '@/utils/social';

const stats = [
  {
    label: 'Years shipping digital work',
    value: '6+',
  },
  {
    label: 'Core stack',
    value: 'Vue / Nuxt / Hono',
  },
  {
    label: 'Based in',
    value: 'Kathmandu, NP',
  },
];

const focusAreas = [
  'Design systems with actual restraint',
  'Fast SSR-first marketing and portfolio sites',
  'Product UX that feels sharp on mobile first',
];

useSeoMeta({
  title: 'Saroj Poudel',
  ogTitle: 'Saroj Poudel',
  twitterTitle: 'Saroj Poudel',
  description:
    "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Strapi, and HonoJs. Let's create something great.",
  ogDescription:
    "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Strapi, and HonoJs. Let's create something great.",
  twitterDescription:
    "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Strapi, and HonoJs. Let's create something great.",
  ogImage: 'https://www.ropodl.com/media/full.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://www.ropodl.com/media/full.jpg',
  ogUrl: 'https://www.ropodl.com/',
});
</script>
<template>
  <v-container class="py-8 py-md-12 home-page">
    <v-row class="hero-row align-end">
      <v-col cols="12" md="8">
        <v-chip
          color="primary"
          variant="tonal"
          rounded="pill"
          class="mb-6 text-uppercase hero-chip"
        >
          Independent full-stack developer and designer
        </v-chip>
        <div class="hero-title font-weight-bold mb-7">
          Frontends that feel
          <span class="text-primary">expensive</span>,
          ship fast,
          and stay readable.
        </div>
        <div class="hero-copy text-title-large font-weight-light mb-8">
          I build modern product surfaces with design discipline and engineering rigor.
          The stack is Vue, Nuxt, Hono, and a bias toward interfaces that explain themselves in the first five seconds.
        </div>
        <div class="d-flex flex-wrap ga-4">
          <v-btn
            color="primary"
            rounded="pill"
            size="x-large"
            height="62"
            class="px-8"
            to="/contact"
          >
            Start a project
            <template #append>
              <v-icon end icon="carbon:arrow-right" />
            </template>
          </v-btn>
          <v-btn
            variant="outlined"
            rounded="pill"
            size="x-large"
            height="62"
            class="px-8"
            to="/portfolio"
          >
            See selected work
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="hero-panel pa-6 pa-md-7"
          rounded="xxl"
          color="rgba(var(--v-theme-surface), 0.72)"
          border
          elevation="0"
        >
          <div class="text-overline text-medium-emphasis mb-6 panel-label">
            Current focus
          </div>
          <div class="d-flex flex-column ga-5">
            <div
              v-for="area in focusAreas"
              :key="area"
              class="d-flex align-start ga-3"
            >
              <v-icon icon="carbon:dot-mark" color="primary" class="mt-1" />
              <div class="text-body-large">
                {{ area }}
              </div>
            </div>
          </div>
          <v-divider class="my-7" />
          <ul class="list-none d-flex flex-column ga-3">
            <li v-for="({ name, link }) in socials" :key="name">
              <a
                class="social-link d-flex align-center justify-space-between text-decoration-none"
                :href="link"
                target="_blank"
                rel="noreferrer"
              >
                <span>{{ name }}</span>
                <v-icon size="small" icon="carbon:arrow-up-right" />
              </a>
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4 mt-md-8 stats-row">
      <v-col
        v-for="({ label, value }) in stats"
        :key="label"
        cols="12"
        md="4"
      >
        <v-sheet
          class="stat-card pa-5 pa-md-6 h-100"
          rounded="xl"
          color="rgba(var(--v-theme-surface), 0.58)"
          border
        >
          <div class="text-caption text-uppercase text-medium-emphasis stat-label">
            {{ label }}
          </div>
          <div class="stat-value font-weight-bold mt-4">
            {{ value }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-10 mt-md-14">
      <v-col cols="12" md="5">
        <div class="section-kicker text-uppercase text-medium-emphasis mb-4">
          What I optimize for
        </div>
        <div class="section-title font-weight-bold">
          Strong hierarchy, less waste, faster paths to action.
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12" md="6">
            <v-sheet class="value-card pa-6 h-100" rounded="xl" border>
              <div class="text-h6 mb-3">Design clarity</div>
              <div class="text-body-1 text-medium-emphasis">
                Typography, spacing, and interaction states are treated like product decisions, not polish layered on at the end.
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="value-card pa-6 h-100" rounded="xl" border>
              <div class="text-h6 mb-3">Performance discipline</div>
              <div class="text-body-1 text-medium-emphasis">
                SSR where it matters, less decorative JavaScript, and interfaces that stay quick without looking stripped down.
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.home-page {
  position: relative;
}

.hero-row {
  min-height: min(78vh, 860px);
}

.hero-chip,
.section-kicker,
.panel-label,
.stat-label {
  letter-spacing: 0.16em;
}

.hero-title {
  max-width: 10ch;
  font-size: clamp(3.8rem, 10vw, 7rem);
  line-height: 0.93;
  letter-spacing: -0.06em;
  text-wrap: balance;
}

.hero-copy {
  max-width: 34rem;
  line-height: 1.5;
}

.hero-panel,
.stat-card,
.value-card {
  backdrop-filter: blur(16px);
  border-color: rgba(var(--v-theme-on-surface), 0.08) !important;
}

.social-link {
  color: rgba(var(--v-theme-on-surface), 0.84);
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.social-link:hover {
  color: rgb(var(--v-theme-primary));
  transform: translateX(4px);
}

.stat-value {
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  line-height: 1;
}

.section-title {
  max-width: 11ch;
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
}
</style>
