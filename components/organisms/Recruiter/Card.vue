<!-- components/organisms/Recruiter/Card.vue -->
<template>
  <div class="card recruiter-card" v-if="miseboxUser && recruiter && recruiter.id">
    <NuxtLink :to="`/recruiters/${recruiter.id}`" class="card-main">
      <div class="image-wrapper">
        <!-- Primary avatar: Recruiter image -->
        <MoleculesProfileImage
          v-if="recruiter.image_url"
          :url="recruiter.image_url"
          size="small"
          altText="Recruiter Image"
          class="primary-avatar"
        />
        <!-- Secondary avatar: Current MiseboxUser's avatar -->
        <MoleculesProfileAvatar
          v-if="miseboxUser.avatar"
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="secondary-avatar"
        />
      </div>
      <div class="card-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <span class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
        <div v-if="recruiter.company" class="highlight">
          {{ recruiter.company }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-footer">
      
    </div>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();
</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
}

/* Primary avatar remains in the normal document flow */
.primary-avatar {
  border-radius: 50%;
  position: relative;
}

/* Secondary avatar is positioned at the bottom-right corner */
.secondary-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px; /* adjust size as needed */
  height: 30px; /* adjust size as needed */
  border-radius: 50%;
  z-index: 2;
}
</style>
