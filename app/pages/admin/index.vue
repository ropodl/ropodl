<script setup lang="ts">
import { useApiFetch } from '~/utils/shared/useApiFetch';
import type { DashboardStats } from '~/types/stats';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const stats = ref<DashboardStats | null>(null);
const loading = ref(true);

const fetchStats = async () => {
  try {
    const data = await useApiFetch<DashboardStats>('admin/stats');
    stats.value = data;
  } catch (e) {
    console.error('Failed to fetch stats', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStats();
});
</script>
<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Overview</div>
      <div class="admin-hero__title">Dashboard</div>
      <div class="admin-hero__copy">Recent activity and core counts.</div>
    </section>

    <template v-if="loading">
      <v-row>
        <template v-for="i in 3" :key="i">
          <v-col cols="12" md="4">
            <v-skeleton-loader type="card" class="rounded-lg" />
          </v-col>
        </template>
      </v-row>
    </template>

    <template v-else-if="stats">
      <div class="admin-stat-grid mb-4">
        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="admin-stat-tile__label">Blog Posts</div>
                <div class="admin-stat-tile__value">{{ stats.counts.blogs }}</div>
              </div>
              <v-btn
                v-tooltip="'Create New Post'"
                icon="carbon:add"
                variant="tonal"
                density="compact"
                to="/admin/blog/create"
              />
            </div>
          </v-card-text>
        </v-card>

        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="admin-stat-tile__label">Media Library</div>
                <div class="admin-stat-tile__value">{{ stats.counts.media }}</div>
              </div>
              <v-btn
                v-tooltip="'Upload Media'"
                icon="carbon:upload"
                variant="tonal"
                density="compact"
                to="/admin/media/create"
              />
            </div>
          </v-card-text>
        </v-card>

        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="admin-stat-tile__label">Users</div>
                <div class="admin-stat-tile__value">{{ stats.counts.users }}</div>
              </div>
              <v-avatar color="primary" variant="tonal" rounded="xl">
                <v-icon icon="carbon:user-multiple" />
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <v-row class="mt-1">
        <v-col cols="12" md="8">
          <v-card class="admin-panel">
            <v-card-text class="pa-4">
              <div class="admin-split-header">
                <div>
                  <div class="admin-split-header__title">Recent posts</div>
                </div>
                <v-btn
                  color="primary"
                  variant="text"
                  to="/admin/blog"
                >
                  View all
                </v-btn>
              </div>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Date</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="blog in stats.recentBlogs" :key="blog.id">
                    <td class="font-weight-medium">{{ blog.title }}</td>
                    <td>
                      <v-chip
                        size="x-small"
                        :color="
                          blog.status === 'published'
                            ? 'success'
                            : blog.status === 'archieved'
                              ? 'error'
                              : 'warning'
                        "
                        variant="flat"
                        class="text-capitalize"
                      >
                        {{ blog.status }}
                      </v-chip>
                    </td>
                    <td class="text-medium-emphasis text-body-2">
                      {{ new Date(blog.createdAt).toLocaleDateString() }}
                    </td>
                    <td class="text-right">
                      <v-btn
                        icon="carbon:edit"
                        variant="text"
                        density="compact"
                        size="small"
                        :to="`/admin/blog/${blog.id}`"
                      />
                    </td>
                  </tr>
                  <tr v-if="stats.recentBlogs.length === 0">
                    <td colspan="4" class="text-center text-medium-emphasis py-8">
                      No recent activity found.
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="admin-panel">
            <v-card-title class="px-4 pt-4 pb-1 text-subtitle-1">Quick actions</v-card-title>
            <v-card-text class="px-4 pb-4 pt-0">
              <div class="d-grid gap-2">
                <v-btn
                  block
                  variant="text"
                  to="/admin/blog/create"
                >
                  New article
                </v-btn>
                <v-btn
                  block
                  variant="text"
                  to="/admin/media/create"
                >
                  Upload media
                </v-btn>
                <v-btn
                  block
                  variant="text"
                  to="/admin/contact"
                >
                  Contact inbox
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
