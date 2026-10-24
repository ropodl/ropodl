<script setup lang="ts">
import { authClient } from '../../../lib/auth-client'

definePageMeta({ middleware: 'auth' })
const { data: session } = await authClient.useSession(useFetch)
const name = ref(session.value?.user.name || '')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const busy = ref(false)
const error = ref('')
const notice = ref('')
async function saveProfile() {
  busy.value = true
  error.value = ''
  notice.value = ''
  try {
    await $fetch('/api/admin/profile', { method: 'PATCH', body: { name: name.value } })
    notice.value = 'Profile saved. Refresh the page to update the sidebar.'
  } catch (e) {
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not save your profile.'
  } finally {
    busy.value = false
  }
}
async function changePassword() {
  busy.value = true
  error.value = ''
  notice.value = ''
  if (newPassword.value.length < 8 || newPassword.value !== confirmPassword.value) {
    error.value = 'Use at least 8 characters and make both new passwords match.'
    busy.value = false
    return
  }
  try {
    await $fetch('/api/admin/profile/password', { method: 'POST', body: { currentPassword: currentPassword.value, newPassword: newPassword.value } })
  } catch (e) {
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not change your password.'
    busy.value = false
    return
  }
  busy.value = false
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  notice.value = 'Password changed. Other sessions were signed out.'
}
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Settings"
      title="Profile & security"
      description="Manage your administrator name and password."
    />
    <div class="grid max-w-3xl gap-5">
      <AdminSection title="Profile">
        <form
          class="space-y-5"
          @submit.prevent="saveProfile"
        >
          <UFormField
            label="Display name"
            required
          >
            <UInput
              v-model="name"
              required
              maxlength="100"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Email address">
            <UInput
              :model-value="session?.user.email"
              disabled
              class="w-full"
            />
          </UFormField>
          <UButton
            type="submit"
            :disabled="busy"
          >
            Save profile
          </UButton>
        </form>
      </AdminSection>
      <AdminSection title="Change password">
        <form
          class="space-y-5"
          @submit.prevent="changePassword"
        >
          <UFormField
            label="Current password"
            required
          >
            <UInput
              v-model="currentPassword"
              type="password"
              required
              autocomplete="current-password"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="New password"
            required
          >
            <UInput
              v-model="newPassword"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Confirm new password"
            required
          >
            <UInput
              v-model="confirmPassword"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="w-full"
            />
          </UFormField>
          <UButton
            type="submit"
            :disabled="busy"
          >
            Change password
          </UButton>
        </form>
      </AdminSection>
      <UAlert
        v-if="error"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        :title="error"
      />
      <UAlert
        v-if="notice"
        role="status"
        color="success"
        variant="subtle"
        icon="i-lucide-circle-check"
        :title="notice"
      />
    </div>
  </AdminShell>
</template>
