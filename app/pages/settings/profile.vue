<script lang="ts" setup>
import { ref } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const { user } = useAuth();
const loading = ref(false);
const form = ref({
  fullname: user.value?.fullname || '',
  email: user.value?.email || '',
  password: '',
  confirmPassword: '',
});

const rules = {
  fullname: [(v: string) => !!v || 'Full Name is required'],
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ],
  password: [
    (v: string) => !v || v.length >= 6 || 'Password must be at least 6 characters',
  ],
  confirmPassword: [
    (v: string) => v === form.value.password || 'Passwords must match',
  ],
};

const updateProfile = async () => {
  loading.value = true;
  try {
    const res = await useApiFetch<any>('admin/user/profile', {
      method: 'PATCH',
      body: {
        fullname: form.value.fullname,
        email: form.value.email,
        password: form.value.password || undefined,
      },
    });

    if (res.success) {
      alert('Profile updated successfully');
      form.value.password = '';
      form.value.confirmPassword = '';
    }
  } catch (err: any) {
    alert(err.message || 'Failed to update profile');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <div class="text-h4 font-weight-bold mb-1">Your Profile</div>
        <div class="text-subtitle-1 text-medium-emphasis mb-6">Update your account information</div>

        <v-card rounded="lg" elevation="0" border>
          <v-card-text class="pa-6">
            <v-form @submit.prevent="updateProfile">
              <v-text-field
                v-model="form.fullname"
                label="Full Name"
                variant="outlined"
                rounded="lg"
                :rules="rules.fullname"
                class="mb-3"
              />
              <v-text-field
                v-model="form.email"
                label="Email Address"
                variant="outlined"
                rounded="lg"
                :rules="rules.email"
                class="mb-3"
              />
              
              <v-divider class="my-6" />
              <div class="text-subtitle-1 font-weight-bold mb-4">Change Password</div>
              <div class="text-caption text-medium-emphasis mb-4">Leave blank to keep current password</div>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    rounded="lg"
                    :rules="rules.password"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    rounded="lg"
                    :rules="rules.confirmPassword"
                  />
                </v-col>
              </v-row>

              <div class="d-flex mt-6">
                <v-spacer />
                <v-btn
                  color="primary"
                  variant="flat"
                  rounded="lg"
                  size="large"
                  type="submit"
                  :loading="loading"
                >
                  Save Changes
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
