<!-- components/organisms/Kitchen/link/Chef/Cell.vue -->
<template>
  <div class="cell kitchen-link-chef-cell" v-if="chef && chef.id">
    <NuxtLink :to="isDisabled ? null : `/chefs/${chef.id}`" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="miseboxUser && miseboxUser.avatar"
          :url="miseboxUser.avatar"
          size="small"
          altText="Chef Avatar"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="miseboxUser && miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <span class="handle" v-if="miseboxUser && miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
        <span class="highlight" v-if="chef.specialty">
          {{ chef.specialty }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

// Fetch the full Chef object using the provided id.
const { fetchChef } = useChef();
const chef = fetchChef(props.id);

// Fetch the corresponding MiseboxUser object using the same id.
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.id);
</script>
