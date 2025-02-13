<!-- components/organisms/Professional/Card.vue -->
<template>
  <div class="card professional-card" v-if="miseboxUser && professional">
    <NuxtLink :to="`/professionals/${professional.id}`" class="card-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="Professional Avatar"
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
        <div v-if="professional.title" class="highlight">
          {{ professional.title }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-footer">
      
    </div>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentProfessional: professional } = useProfessional();
</script>
