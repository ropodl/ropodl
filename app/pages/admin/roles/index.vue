<script setup lang="ts">
import { useApiFetch } from "~/utils/shared/useApiFetch";
import type { roles, permissions } from "../../../../types/rolePermission"

definePageMeta({
    layout: "admin",
    middleware: ["is-auth"]
});

// const { can } = useAuth();
const { showSnackbar } = useSnackbar();

const roles = ref<roles[]>([]);
const permissions = ref<permissions[]>([]);
const selectedRole = ref<roles | null>(null);
const rolePermissions = ref<number[]>([]);
// const loading = ref(false);
const saving = ref(false);

const roleDialog = ref(false);
const permissionDialog = ref(false);
const newRole = ref({ name: '', description: '' });
const newPermission = ref({ name: '', description: '' });

const fetchRoles = async () => {
    roles.value = await useApiFetch<any[]>("rbac/roles");
};

const fetchPermissions = async () => {
    permissions.value = await useApiFetch<any[]>("rbac/permissions");
};

const selectRole = async (role: any) => {
    selectedRole.value = role;
    console.log(typeof selectRole)
    const perms = await useApiFetch<any[]>(`rbac/roles/${role.id}/permissions`);
    rolePermissions.value = perms.map(p => p.id);
};

const createRole = async () => {
    await useApiFetch("rbac/roles", {
        method: "POST",
        body: newRole.value
    }).then(() => {
        showSnackbar("Role created successfully", "success");
        roleDialog.value = false;
        newRole.value = { name: '', description: '' };
        fetchRoles();
    });
};

const deleteRole = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await useApiFetch(`rbac/roles/${id}`, { method: "DELETE" })
        .then(() => {
            showSnackbar("Role deleted", "success");
            if (selectedRole.value?.id === id) selectedRole.value = null;
            fetchRoles();
        });
};

const createPermission = async () => {
    await useApiFetch("rbac/permissions", {
        method: "POST",
        body: newPermission.value
    }).then(() => {
        showSnackbar("Permission created successfully", "success");
        permissionDialog.value = false;
        newPermission.value = { name: '', description: '' };
        fetchPermissions();
    });
};

const saveRolePermissions = async () => {
    if (!selectedRole.value) return;
    saving.value = true;
    await useApiFetch(`rbac/roles/${selectedRole.value.id}/permissions`, {
        method: "POST",
        body: { permissionIds: rolePermissions.value }
    }).then(() => {
        showSnackbar("Permissions updated", "success");
    }).finally(() => {
        saving.value = false;
    });
};

onMounted(() => {
    fetchRoles();
    fetchPermissions();
});
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex align-center">
                <div class="text-h4">Roles & Permissions</div>
                <v-spacer />
                <v-btn color="primary" prepend-icon="mdi-plus" @click="roleDialog = true">New Role</v-btn>
                <v-btn color="secondary" class="ml-2" prepend-icon="mdi-shield-lock" @click="permissionDialog = true">New Permission</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <!-- Roles List -->
            <v-col cols="12" md="4">
                <label class="mb-3">Available Roles</label>
                <v-card border class="rounded-lg">
                    <v-list lines="two">
                        <template
                        v-for="role in roles"
                        :key="role.id"
                        >
                        <v-list-item
                            :active="selectedRole?.id === role.id"
                            class="rounded-lg mb-1 mx-2"
                            @click="selectRole(role)"
                        >
                            <template #prepend>
                                <v-icon icon="mdi-account-group-outline" />
                            </template>
                            <v-list-item-title>{{ role.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ role.description || 'No description' }}</v-list-item-subtitle>
                            <template #append>
                                <v-btn
                                    icon="mdi-delete-outline"
                                    color="error"
                                    variant="text"
                                    size="small"
                                    @click.stop="deleteRole(role.id)"
                                />
                            </template>
                        </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </v-col>

            <!-- Permissions Management -->
            <v-col cols="12" md="8">
                <v-card v-if="selectedRole" variant="outlined" class="rounded-lg pa-4">
                    <div class="d-flex align-center mb-6">
                        <div>
                            <div class="text-h5">Permissions for {{ selectedRole.name }}</div>
                            <div class="text-body-2 text-grey">{{ selectedRole.description }}</div>
                        </div>
                        <v-spacer />
                        <v-btn color="primary" :loading="saving" @click="saveRolePermissions" >Save Changes</v-btn>
                    </div>

                    <v-divider class="mb-6" />

                    <v-row>
                        <v-col v-for="permission in permissions" :key="permission.id" cols="12" sm="6" md="4">
                            <v-checkbox
                                v-model="rolePermissions"
                                :label="permission.name"
                                :value="permission.id"
                                :hint="permission.description"
                                persistent-hint
                                density="compact"
                                color="primary"
                            />
                        </v-col>
                    </v-row>
                </v-card>

                <v-card v-else variant="outlined" class="rounded-lg d-flex align-center justify-center py-16 text-grey">
                    <div class="text-center">
                        <v-icon size="64">mdi-account-arrow-left-outline</v-icon>
                        <div class="mt-4">Select a role to manage its permissions</div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <!-- New Role Dialog -->
        <v-dialog v-model="roleDialog" max-width="500px">
            <v-card title="Create New Role" class="rounded-lg">
                <v-card-text>
                    <v-text-field v-model="newRole.name" label="Role Name" variant="outlined" class="mb-4" />
                    <v-textarea v-model="newRole.description" label="Description" variant="outlined" rows="3" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="text" @click="roleDialog = false">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="createRole">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- New Permission Dialog -->
        <v-dialog v-model="permissionDialog" max-width="500px">
            <v-card title="Create New Permission" class="rounded-lg">
                <v-card-text>
                    <v-text-field v-model="newPermission.name" label="Permission Name (e.g. media.delete)" variant="outlined" class="mb-4" />
                    <v-textarea v-model="newPermission.description" label="Description" variant="outlined" rows="3" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="text" @click="permissionDialog = false">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="createPermission">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
