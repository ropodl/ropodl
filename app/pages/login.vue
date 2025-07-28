<script setup>
const snackbar = useSnackbarStore();
const { login } = useStrapiAuth();
const user = useStrapiUser();

if (user.value) {
  navigateTo("/admin");
}

const loading = ref(false);
const show = ref(true);

const form = ref({
  identifier: "",
  password: "",
});

const signIn = async () => {
  loading.value = true;
  await login(form.value)
    .then(() => {
      snackbar.setSnackbar("Logged In, successfully!!", "success");

      // Get and clear redirect cookie
      const redirectCookie = useCookie("redirect", { path: "/" });
      const redirectPath = redirectCookie.value || "/admin/";
      redirectCookie.value = null;

      navigateTo(redirectPath, { replace: true });
    })
    .catch(({ error }) => {
      snackbar.setSnackbar(error.message, "error");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-container>
    <v-row align="center" justify="center" class="h-100 py-16">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card border>
          <v-card-title class="text-center">Sign In With Email</v-card-title>
          <v-form @submit.prevent="signIn">
            <v-card-text class="pb-0">
              <v-text-field
                v-model="form.identifier"
                placeholder="Enter Email Address"
                :loading
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                placeholder="Enter Password"
                :type="show ? 'password' : 'text'"
                :loading
                :disabled="loading"
              >
                <template #append-inner>
                  <v-icon @click="show = !show">
                    <Icon :name="show ? 'lucide:eye' : 'lucide:eye-closed'" />
                  </v-icon>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                variant="flat"
                rounded="lg"
                color="primary"
                type="submit"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
