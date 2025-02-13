<!-- components/organisms/Chef/Cell.vue -->
<template>
  <div class="cell chef-cell" v-if="miseboxUser && chef">
    <NuxtLink :to="`/chefs/${chef.id}`" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="Chef Avatar"
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
        <span class="highlight" v-if="chef.specialty">
          {{ chef.specialty }}
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
  chef: {
    type: Object,
    required: true
  }
});
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.chef.id);
</script>
