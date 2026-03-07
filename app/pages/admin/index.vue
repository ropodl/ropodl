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
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold mb-1">Dashboard</div>
        <div class="text-subtitle-1 text-medium-emphasis mb-6">
          Overview of your content and activity
        </div>
      </v-col>
    </v-row>
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
      <!-- Stat Cards -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="0" border>
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar color="primary" variant="tonal" rounded="lg">
                  <v-icon icon="carbon:edit" />
                </v-avatar>
                <v-btn
                  v-tooltip="'Create New Post'"
                  icon="carbon:add"
                  variant="text"
                  density="comfortable"
                  to="/admin/blog/create"
                />
              </div>
              <div class="text-h4 font-weight-bold mb-1">
                {{ stats.counts.blogs }}
              </div>
              <div class="text-subtitle-2 text-medium-emphasis">
                Total Blog Posts
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="0" border>
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar color="secondary" variant="tonal" rounded="lg">
                  <v-icon icon="carbon:image" />
                </v-avatar>
                <v-btn
                  v-tooltip="'Upload Media'"
                  icon="carbon:upload"
                  variant="text"
                  density="comfortable"
                  to="/admin/media/create"
                />
              </div>
              <div class="text-h4 font-weight-bold mb-1">
                {{ stats.counts.media }}
              </div>
              <div class="text-subtitle-2 text-medium-emphasis">
                Media Files
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="rounded-lg" elevation="0" border>
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar color="success" variant="tonal" rounded="lg">
                  <v-icon icon="carbon:user" />
                </v-avatar>
              </div>
              <div class="text-h4 font-weight-bold mb-1">
                {{ stats.counts.users }}
              </div>
              <div class="text-subtitle-2 text-medium-emphasis">
                Registered Users
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Recent Activity -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card class="rounded-lg" elevation="0" border>
            <v-card-title class="px-4 pt-4 pb-2">Recent Posts</v-card-title>
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
                      density="comfortable"
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
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
