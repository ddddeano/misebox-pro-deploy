<!-- components/organisms/MiseboxUser/Cell.vue -->
<template>
  <div class="cell" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <span class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
      </div>
    </NuxtLink>
    <div v-if="miseboxUser?.id !== currentUser?.uid" class="interaction">
      <MoleculesButtonsFollow :user="miseboxUser" />
    </div>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();
const props = defineProps({
  miseboxUser: {
    type: Object,
    default: () => ({})
  }
});
</script>
