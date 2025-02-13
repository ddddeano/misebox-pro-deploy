<!-- components/organisms/Recruiter/Cell.vue -->
<!-- File: components/organisms/Recruiter/Cell.vue -->
<template>
  <div class="cell recruiter-cell" v-if="recruiter">
    <NuxtLink :to="isDisabled ? null : `/recruiters/${recruiter.id}`" class="cell-main">
      <div class="image-wrapper">
        <!-- Primary avatar: Recruiter image -->
        <MoleculesProfileImage
          v-if="recruiter.image_url"
          :url="recruiter.image_url"
          size="small"
          altText="Recruiter Image"
          class="primary-avatar"
        />
        <!-- Secondary avatar: Associated MiseboxUser's avatar, if available -->
        <MoleculesProfileAvatar
          v-if="miseboxUser && miseboxUser.avatar"
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="secondary-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">
          {{ miseboxUser && miseboxUser.display_name ? miseboxUser.display_name : recruiter.name }}
        </span>
        <span class="handle" v-if="miseboxUser && miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
        <span class="address" v-if="recruiter.formatted_address">
          {{ recruiter.formatted_address }}
        </span>
        <span class="highlight" v-if="recruiter.company">
          {{ recruiter.company }}
        </span>
      </div>
    </NuxtLink>
    <div
      v-if="!isDisabled && miseboxUser && currentUser && miseboxUser.id !== currentUser.id"
      class="interaction"
    >
      <MoleculesButtonsFollow :user="miseboxUser" />
    </div>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const props = defineProps({
  recruiter: {
    type: Object,
    required: true,
    default: () => ({})
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

// Fetch the associated MiseboxUser based on recruiter.id.
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.recruiter.id);
</script>
