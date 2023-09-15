<script setup>
const user = useUser();
const snackbar = useSnackbar();

let showPass = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const submit = async () => {
  const { data, error } = await user.login(form);
  if (error) return snackbar.showSnackbar(error.statusMessage, "error");

  snackbar.showSnackbar("Login Successfull", "success");
  localStorage.setItem("user_auth_token", data.user.token);
  user.user = data.user;
  navigateTo("/admin", { replace: true });
};
</script>
<template>
  <v-container class="h-100">
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="12" md="4">
        <v-form @submit.prevent="submit">
          <v-card class="py-5 pb-0">
            <v-card-title class="mb-3 text-center"
              >Sign In{{ snackbar.snackbar.show }}</v-card-title
            >
            <v-card-text class="pb-0">
              <v-text-field
                v-model="form.email"
                placeholder="Email Address"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                placeholder="Password"
                :type="showPass ? 'text' : 'password'"
                :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:appendInner="showPass = !showPass"
              ></v-text-field>
            </v-card-text>
            <v-btn
              block
              rounded="0"
              variant="tonal"
              color="primary"
              height="50"
              type="submit"
              >Submit</v-btn
            >
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
