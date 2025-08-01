<script setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin-settings",
  middleware: "auth",
});

const form = ref({
  name: "",
  user_name: "",
  phone_number: "",
  email: "",
});

const rules = ref({
  name: [
    (v) => !!v || "First Name is required",
    (v) => (v && v.length > 2) || "First Name must be 3 characters or more",
  ],
  user_name: [
    (v) => !!v || "User Name is required",
    (v) => (v && v.length > 2) || "User Name must be 3 characters or more",
  ],
});

const passwordForm = ref({
  current: "",
  newer: "",
});
const confirm = ref("");

const changePassword = ref({
  current: [
    (v) => !!v || "Current Password is required",
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
  ],
  confirm: [
    (v) => !!v || "Confirm Password is required",
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
    (v) => v === passwordForm.value.newer || "Passwords do not match",
  ],
});
// password update
const passwordRef = ref(null);
</script>
<template>
  <v-container :fluid="isFluid">
    <v-row>
      <v-col cols="12" class="px-0 pb-0">
        <v-card-title class="pt-0">Profile</v-card-title>
      </v-col>
      <v-col cols="12" md="3">
        <v-hover #default="{ props, isHovering }">
          <v-card
            border
            rounded="lg"
            v-bind="props"
            style="position: sticky; top: 70px"
          >
            <v-img
              cover
              height="180"
              :src="'/image/portfolio/api(new)/api.avif'"
            >
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="black"
                content-class="h-100 w-100 d-flex align-center justify-center"
              >
                <!-- <v-btn
                  color="gray"
                  icon="mdi-cloud-upload"
                  @click="$refs.fileInput.click()"
                ></v-btn> -->
              </v-overlay>
            </v-img>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
            />
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" md="9">
        <!-- <v-form @submit.prevent="submit"> -->
        <v-row>
          <v-col cols="12" md="6">
            <lazy-admin-shared-field-label>
              Full Name
            </lazy-admin-shared-field-label>
            <v-text-field
              v-model="form.name"
              persistent-hint
              hint="e.g John Doe"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-admin-shared-field-label>
              User Name
            </lazy-admin-shared-field-label>
            <v-text-field
              v-model="form.user_name"
              persistent-hint
              hint="e.g john.doe"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-admin-shared-field-label>
              Phone Number
            </lazy-admin-shared-field-label>
            <v-text-field
              v-model="form.phone_number"
              persistent-hint
              hint="e.g 98XXXXXXXX"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-admin-shared-field-label>
              Email Address
            </lazy-admin-shared-field-label>
            <v-text-field
              v-model="form.email"
              persistent-hint
              hint="e.g john.doe@example.com"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex">
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" rounded="lg"
              >Update Profile</v-btn
            >
          </v-col>
        </v-row>
        <!-- </v-form> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card-title>Danger Zone</v-card-title>
        <v-card border flat>
          <v-list>
            <v-list-item>
              <v-list-item-title>Change Password</v-list-item-title>
              <v-list-item-subtitle
                >Changing Password uses sudo powers. Are you sure you want to
                unlock sudo?</v-list-item-subtitle
              >
              <template v-slot:append>
                <v-dialog persistent scrollable scrim="black" width="400">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      border
                      flat
                      rounded="lg"
                      class="text-error"
                      >Change Password</v-btn
                    >
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-form ref="passwordRef">
                      <v-card title="Change Password">
                        <v-card-text class="pb-0">
                          <lazy-admin-shared-field-label>
                            Current Password
                          </lazy-admin-shared-field-label>
                          <v-text-field
                            v-model="passwordForm.current"
                            :rules="changePassword.current"
                          ></v-text-field>
                          <lazy-admin-shared-field-label>
                            New Password
                          </lazy-admin-shared-field-label>
                          <v-text-field
                            v-model="passwordForm.newer"
                            :rules="changePassword.current"
                          ></v-text-field>
                          <lazy-admin-shared-field-label>
                            Confirm New Password
                          </lazy-admin-shared-field-label>
                          <v-text-field
                            v-model="confirm"
                            :rules="changePassword.confirm"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            variant="text"
                            class="px-10"
                            text="Cancel"
                            @click="isActive.value = false"
                          ></v-btn>
                          <v-btn
                            type="submit"
                            variant="flat"
                            color="primary"
                            class="px-10"
                            text="Save"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
                  </template>
                </v-dialog>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
