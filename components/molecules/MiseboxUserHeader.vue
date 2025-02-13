<!-- components/molecules/MiseboxUserHeader.vue -->
<template>
  <div v-if="miseboxUser" class="profile-header-container">
    <!-- Avatar -->
    <div class="profile-header-avatar" v-if="miseboxUser.avatar">
      <MoleculesProfileAvatar
        altText="Avatar"
        :url="miseboxUser.avatar"
        size="large"
      />
    </div>

    <!-- User Details -->
    <div class="profile-header-details">
      <!-- Display Name -->
      <h1 class="display-name" v-if="miseboxUser.display_name">
        {{ miseboxUser.display_name }}
      </h1>

      <!-- Handle -->
      <div class="handle" v-if="miseboxUser.handle">
        @{{ miseboxUser.handle }}
      </div>
     <div class="title" v-if="professional && professional.title">
        {{ professional.title }}
      </div>
    </div>

    <!-- Actions -->
    <div v-if="isViewingOwnRoute" class="icon-group">
      <!-- Sign-Out Icon -->
      <ArrowRightStartOnRectangleIcon
        @click="logout"
        class="icon"
      />
      <Cog6ToothIcon class="icon" />
      <CameraIcon class="icon" />
    </div>
    <div v-else class="icon-group">
      <!-- Follow Button -->
      <MoleculesButtonsFollow
        :user="miseboxUser"
        class="profile-header-follow-button"
      />
      <HeartIcon class="icon" />
      <SparklesIcon class="icon" />
    </div>
  </div>
</template>

<script setup>
// Props for the fetched user
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
})

const { fetchProfessional } = useProfessional();
const professional = fetchProfessional(props.miseboxUser.id);

// Use the authentication composable
const { logout } = useAuth()

// Determine if the user is viewing their own profile
const { isInteractingWithSelf } = useInteraction()
const isViewingOwnRoute = computed(() => {
  return props.miseboxUser
    ? isInteractingWithSelf(props.miseboxUser.id).value
    : false
})
</script>

<style lang="scss" scoped>
/* Profile Header Container */
.profile-header-container {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-m);
  padding: var(--spacing-m);
  background-color: var(--background-strong);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-l);
  border: 3px solid var(--border);
  max-width: 600px;
  width: 100%;
  position: relative;
}

/* Icon Group */
.icon-group {
  display: flex;
  gap: var(--spacing-s);
  align-items: center;
  position: absolute;
  bottom: var(--spacing-m);
  right: var(--spacing-m);
}

</style>
