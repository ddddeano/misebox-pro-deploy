<!-- components/organisms/Chef/Card.vue -->
<template>
  <div class="card chef-card" v-if="miseboxUser && chef">
    <NuxtLink :to="`/chefs/${chef.id}`" class="card-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="Chef Avatar"
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
        <div v-if="chef.specialty" class="highlight">
          {{ chef.specialty }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-footer">
      
    </div>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();
</script>
