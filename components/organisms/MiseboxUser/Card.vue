<!-- components/organisms/MiseboxUser/Card.vue -->
<template>
  <div class="card user-card" v-if="miseboxUser && miseboxUser.id">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="card-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="main-avatar"
        />
      </div>
      <div class="card-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <span class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
      </div>
    </NuxtLink>
    <div class="card-footer">
      <!-- Footer content for development (currently empty) -->
    </div>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
