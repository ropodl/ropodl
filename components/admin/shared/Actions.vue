<script setup>
import { Icon } from "@iconify/vue";

const route = useRoute();

defineProps({
  form: {
    type: Object,
    required: true,
  },
});

defineEmits(["remove"]);

const statusEdit = ref(false);
const statusTemp = ref("Draft");
</script>

<template>
  <v-card class="mb-3">
    <v-card-title>Actions</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pb-0">
      <ul class="list-style-none">
        <v-hover v-slot="{ isHovering, props }">
          <li
            class="d-flex align-center justify-space-between mb-3"
            v-bind="props"
          >
            <div>
              <v-icon start>
                <Icon icon="mdi:key" />
              </v-icon>
              Status: <span class="text-capitalize">{{ form.status }}</span>
            </div>
            <template
              v-if="
                isHovering &&
                (route.params.slug || route.params.id) &&
                statusEdit == false
              "
            >
              <v-btn
                variant="tonal"
                size="x-small"
                class="text-capitalize px-5"
                @click="statusEdit = true"
              >
                Edit
              </v-btn>
            </template>
          </li>
        </v-hover>
        <div v-auto-animate>
          <template v-if="statusEdit">
            <div class="mb-3">
              <v-select
                density="compact"
                v-model="statusTemp"
                :items="['Draft', 'Published']"
              ></v-select>
              <div class="d-flex justify-space-between">
                <v-btn
                  variant="tonal"
                  class="text-capitalize"
                  @click="
                    () => {
                      form.status = statusTemp;
                      statusEdit = false;
                    }
                  "
                >
                  OK
                </v-btn>
                <v-btn
                  variant="tonal"
                  class="text-capitalize"
                  @click="
                    () => {
                      statusTemp = 'Draft';
                      statusEdit = false;
                    }
                  "
                >
                  Cancel
                </v-btn>
              </div>
            </div>
          </template>
        </div>
      </ul>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-row justify="space-between">
        <v-col cols="6">
          <template v-if="route.params.slug || route.params.id">
            <v-btn
              height="48"
              rounded="lg"
              class="text-capitalize px-10"
              color="error"
              variant="text"
              @click="$emit('remove')"
            >
              Move to Trash
            </v-btn>
          </template>
          <template v-else-if="form.status !== 'Published'">
            <v-btn
              height="48"
              rounded="lg"
              color="warning"
              class="text-capitalize px-10"
              type="submit"
              @click="
                () => {
                  form.status = 'Draft';
                }
              "
            >
              Save as Draft
            </v-btn>
          </template>
        </v-col>
        <v-col cols="6">
          <div class="d-flex justify-end">
            <v-btn
              height="48"
              rounded="lg"
              class="text-capitalize px-10"
              variant="tonal"
              type="submit"
              @click="
                () => {
                  if (route.params.slug || route.params.id) {
                    return;
                  } else {
                    form.status = 'Published';
                  }
                }
              "
            >
              {{
                route.params.slug || route.params.id || form.id
                  ? "Update"
                  : "Publish"
              }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
