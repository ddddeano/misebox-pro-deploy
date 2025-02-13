<template>
  <div class="page" v-if="currentUser && entity && miseboxUser">
    <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

    <!-- 🔹 Action Buttons (View/Edit Mode) -->
    <div class="action-buttons">
      <template v-if="mode === 'view'">
        <NuxtLink
          v-if="hasPermission"
          :to="`/${entityType}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <NuxtLink
          v-if="hasPermission"
          :to="`/${entityType}/dashboard`"
          class="icon-btn"
        >
          <WindowIcon class="icon" />
          <span>Dashboard</span>
        </NuxtLink>
        <button v-if="!hasPermission" class="icon-btn">
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </template>

      <template v-else-if="mode === 'edit'">
        <NuxtLink :to="`/${entityType}/${miseboxUser.id}`" class="icon-btn">
          <EyeIcon class="icon" />
          <span>View</span>
        </NuxtLink>
      </template>
    </div>

    <!-- 🔹 Collapsible Profile Segue -->
    <div class="profile-segue icon-btn btn-full" v-if="!showProfiles" @click="showProfiles = true">
      <span>View Profiles</span>
      <ChevronRightIcon class="icon" />
    </div>

    <div v-if="availableProfiles.length && showProfiles" class="action-links-wrapper">
      <ul class="profile-links">
        <li v-for="profile in availableProfiles" :key="profile.key">
          <NuxtLink :to="profile.url" class="icon-btn btn-full" @click="showProfiles = false">
            <span>{{ profile.label }} Profile</span>
            <ChevronRightIcon class="icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="profile-content">
      <slot />

      <!-- 🔹 Delete Button (Opens Confirmation Popup) -->
      <button
        v-if="false"
        class="icon-btn btn"
        @click="showDeleteConfirm = true"
      >
        <TrashIcon class="icon" />
        <span>Delete</span>
      </button>
    </div>
  </div>

  <!-- 🔹 Delete Confirmation Modal -->
  <div
    v-if="showDeleteConfirm"
    class="modal-overlay"
    @click.self="showDeleteConfirm = false"
  >
    <div class="modal">
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete this {{ entityType }} profile?
        This action cannot be undone.
      </p>
      <div class="modal-actions">
        <button class="btn" @click="showDeleteConfirm = false">Cancel</button>
        <button class="btn" @click="confirmDelete">Delete</button>
      </div>
      <p>To delete all app data head to your Misebox User Profile</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  miseboxUser: Object, // Parent Misebox User
  entity: Object, // Chef, Professional, etc.
  entityType: String, // "chefs", "professionals", etc.
  mode: { type: String, required: true }, // "view" or "edit"
  deleteEntity: Function, // Optional: Only required in edit mode
});

const currentUser = useCurrentUser();
const hasPermission = computed(() => currentUser?.value?.uid === props.miseboxUser?.id);

// Reactive state for Delete Confirmation Popup
const showDeleteConfirm = ref(false);
const showProfiles = ref(false); // Collapsible profile list state

// Handle Delete Confirmation
const confirmDelete = () => {
  if (props.deleteEntity) {
    props.deleteEntity();
  }
  showDeleteConfirm.value = false;
};

// Define mapping for user profiles
const profileMappings = {
  "misebox-users": {
    key: "misebox-users",
    label: "Misebox User",
    url: (id) => `/misebox-users/${id}`,
  },
  professionals: {
    key: "professionals",
    label: "Professional",
    url: (id) => `/professionals/${id}`,
  },
  chefs: {
    key: "chefs",
    label: "Chef",
    url: (id) => `/chefs/${id}`,
  },
  suppliers: {
    key: "suppliers",
    label: "Supplier",
    url: (id) => `/suppliers/${id}`,
  },
  recruiters: {
    key: "recruiters",
    label: "Recruiter",
    url: (id) => `/recruiters/${id}`,
  },
};

// Compute available profile links, excluding the current entityType
const availableProfiles = computed(() => {
  return props.miseboxUser.user_apps
    .filter((app) => profileMappings[app] && app !== props.entityType)
    .map((app) => ({
      ...profileMappings[app],
      url: profileMappings[app].url(props.miseboxUser.id),
    }));
});
</script>

<style scoped>
/* 🔹 Profile Segue (Collapsible Button) */
.profile-segue {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  user-select: none;
}

/* 🔹 Profile Links Wrapper */
.action-links-wrapper {
  padding-inline: var(--spacing-m);
}

/* 🔹 Profile Links */
.profile-links {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.profile-links li {
  margin-bottom: var(--spacing-s);
}

/* 🔹 Delete Confirmation Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: var(--background);
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal h2 {
  font-size: var(--font-size-l);
  margin-bottom: var(--spacing-m);
}

.modal p {
  font-size: var(--font-size-m);
  margin-bottom: var(--spacing-m);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-s);
  margin: var(--spacing-m);
}

/* Add space between the profile label and the chevron */
.btn-full {
  display: flex;
  justify-content: space-between;
}
</style>
