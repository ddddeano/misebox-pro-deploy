<!-- components/organisms/Professional/Cell.vue -->
<template>
  <div class="cell professional-cell" v-if="miseboxUser && professional">
    <NuxtLink :to="`/professionals/${professional.id}`" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          altText="Professional Avatar"
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
        <span class="highlight" v-if="professional.title">
          {{ professional.title }}
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
  professional: {
    type: Object,
    default: () => ({})
  }
});
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.professional?.id || "");
</script>
