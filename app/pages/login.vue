<script setup lang="ts">
import { authClient } from '../lib/auth-client'

const route = useRoute()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const pending = ref(false)

useSeoMeta({
  title: 'Admin sign in',
  description: 'Sign in to manage the ropodl website.',
  robots: 'noindex, nofollow'
})

async function submit() {
  errorMessage.value = ''
  pending.value = true

  try {
    const result = await authClient.signIn.email({ email: email.value, password: password.value })

    if (result.error) {
      errorMessage.value = result.error.message || 'Authentication failed.'
      return
    }

    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') && !route.query.redirect.startsWith('//')
      ? route.query.redirect
      : '/admin'
    await navigateTo(redirect)
  } catch {
    errorMessage.value = 'Could not reach the authentication service. Check your server configuration and try again.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <PublicPageMotion
    preset="login"
    class="mx-auto max-w-md py-16 sm:py-24"
  >
    <Motion
      as="div"
      :while-hover="{ y: -1 }"
      :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
    >
      <UCard>
        <div class="space-y-6">
          <div>
            <h1 class="text-2xl font-semibold">
              Sign in
            </h1>
          </div>

          <form
            class="space-y-4"
            @submit.prevent="submit"
          >
            <UFormField
              label="Email"
              name="email"
              required
            >
              <UInput
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Password"
              name="password"
              required
            >
              <UInput
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="w-full"
              >
                <template #trailing>
                  <UButton
                    type="button"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :aria-pressed="showPassword"
                    @click="showPassword = !showPassword"
                  >
                    <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" />
                  </UButton>
                </template>
              </UInput>
            </UFormField>

            <p
              v-if="errorMessage"
              role="alert"
              class="text-sm text-error"
            >
              {{ errorMessage }}
            </p>

            <UButton
              type="submit"
              block
              :loading="pending"
            >
              Sign in
            </UButton>
          </form>
        </div>
      </UCard>
    </Motion>
  </PublicPageMotion>
</template>
