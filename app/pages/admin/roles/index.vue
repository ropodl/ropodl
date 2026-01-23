<script setup lang="ts">
import { useApiFetch } from '~/utils/shared/useApiFetch';
import type { roles, permissions } from '../../../../types/rolePermission';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const { showSnackbar } = useSnackbar();

const roles = ref<roles[]>([]);
const permissions = ref<permissions[]>([]);
const selectedRole = ref<roles | null>(null);
const rolePermissions = ref<number[]>([]);
const saving = ref(false);

const roleDialog = ref(false);
const permissionDialog = ref(false);
const newRole = ref({ name: '', description: '' });
const newPermission = ref({ name: '', description: '' });

const CRUD_ORDER = ['create', 'read', 'update', 'delete'];

const fetchRoles = async () => {
  roles.value = await useApiFetch<any[]>('admin/roles');
};

const fetchPermissions = async () => {
  permissions.value = await useApiFetch<any[]>('admin/permission');
};

watch(selectedRole, async (role) => {
  if (!role) return;
  const perms = await useApiFetch<any[]>(`admin/roles/${role.id}/permissions`);
  rolePermissions.value = perms.map((p) => p.id);
});

/**
 * Groups permissions like:
 * {
 *   Roles: { create, read, update, delete },
 *   Blogs: { create, read, update, delete },
 *   Permissions: { create, read, update, delete }
 * }
 */
const groupedPermissions = computed(() => {
  const groups: Record<string, Record<string, permissions | null>> = {};

  permissions.value.forEach((p) => {
    const [action, resource] = p.name.split('.');

    if (!action || !resource) return;
    if (!CRUD_ORDER.includes(action)) return;

    const section = resource.charAt(0).toUpperCase() + resource.slice(1);

    if (!groups[section]) {
      groups[section] = {
        create: null,
        read: null,
        update: null,
        delete: null,
      };
    }

    groups[section][action] = p;
  });

  return groups;
});

const createRole = async () => {
  await useApiFetch('admin/roles', {
    method: 'POST',
    body: newRole.value,
  });
  showSnackbar('Role created successfully', 'success');
  roleDialog.value = false;
  newRole.value = { name: '', description: '' };
  fetchRoles();
};

const deleteRole = async (id: number) => {
  if (!confirm('Are you sure?')) return;
  await useApiFetch(`admin/roles/${id}`, { method: 'DELETE' });
  showSnackbar('Role deleted', 'success');
  if (selectedRole.value?.id === id) selectedRole.value = null;
  fetchRoles();
};

const createPermission = async () => {
  await useApiFetch('admin/permission', {
    method: 'POST',
    body: newPermission.value,
  });
  showSnackbar('Permission created successfully', 'success');
  permissionDialog.value = false;
  newPermission.value = { name: '', description: '' };
  fetchPermissions();
};

const saveRolePermissions = async () => {
  if (!selectedRole.value) return;
  saving.value = true;
  await useApiFetch(`admin/roles/${selectedRole.value.id}/permissions`, {
    method: 'POST',
    body: { permissionIds: rolePermissions.value },
  });
  showSnackbar('Permissions updated', 'success');
  saving.value = false;
};

onMounted(() => {
  fetchRoles();
  fetchPermissions();
});
</script>

<template>
  <v-container>
    <v-row>
      <!-- Roles List -->
      <v-col cols="12" md="4">
        <v-card border class="rounded-lg">
          <v-card-text>
            <v-label>Available Roles</v-label>
          </v-card-text>

          <v-item-group v-model="selectedRole" mandatory>
            <v-list lines="two">
              <template v-for="role in roles" :key="role.id">
                <v-item :value="role" v-slot="{ toggle, isSelected }">
                  <v-list-item :active="isSelected" @click="toggle">
                    <v-list-item-title>{{ role.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ role.description || 'No description' }}
                    </v-list-item-subtitle>

                    <template #append>
                      <v-btn
                        icon="mdi-delete-outline"
                        variant="tonal"
                        color="error"
                        size="small"
                        @click.stop="deleteRole(role.id)"
                      />
                    </template>
                  </v-list-item>
                </v-item>
                <v-divider />
              </template>
            </v-list>
          </v-item-group>
        </v-card>
      </v-col>

      <!-- Permissions -->
      <v-col cols="12" md="8">
        <div class="d-flex justify-end mb-4">
          <v-btn color="primary" @click="roleDialog = true">New Role</v-btn>
          <v-btn class="ml-2" color="secondary" @click="permissionDialog = true">
            New Permission
          </v-btn>
        </div>

        <v-card v-if="selectedRole" border class="rounded-lg pa-4">
          <div class="d-flex align-center mb-6">
            <div>
              <div class="text-h5">
                Permissions for {{ selectedRole.name }}
              </div>
              <div class="text-grey text-body-2">
                {{ selectedRole.description }}
              </div>
            </div>
            <v-spacer />
            <v-btn color="primary" :loading="saving" @click="saveRolePermissions">
              Save Changes
            </v-btn>
          </div>

          <v-divider class="mb-6" />

          <!-- SECTIONED CRUD -->
          <div
            v-for="(actions, sectionName) in groupedPermissions"
            :key="sectionName"
            class="mb-6"
          >
            <h3 class="text-h6 font-weight-bold mb-3">
              {{ sectionName }}
            </h3>

            <div class="d-flex flex-wrap gap-6">
              <template v-for="action in ['create', 'read', 'update', 'delete']" :key="action">
                <v-checkbox
                  v-if="actions[action]"
                  v-model="rolePermissions"
                  :value="actions[action]!.id"
                  :label="action.charAt(0).toUpperCase() + action.slice(1)"
                  density="compact"
                  hide-details
                  color="primary"
                />
              </template>
            </div>

            <v-divider class="mt-6" />
          </div>
        </v-card>

        <v-card
          v-else
          border
          class="rounded-lg d-flex align-center justify-center py-16"
        >
          <v-empty-state text="Select a role to manage permissions" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
