<!-- components/organisms/MiseboxUser/link/MiseboxUser/Cell.vue -->
<template>
  <div class="cell misebox-user-link-cell" v-if="miseboxUser">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="miseboxUser.avatar"
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
    <div v-if="miseboxUser.id !== currentUser.id" class="interaction">
      <MoleculesButtonsFollow :user="miseboxUser" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const currentUser = useCurrentUser();

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

// Use the hook to fetch the full MiseboxUser object using the provided id.
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.id);

// Compute the navigation route based on isDisabled.
const route = computed(() =>
  props.isDisabled ? null : `/misebox-users/${miseboxUser.value.id}`
);
</script>
