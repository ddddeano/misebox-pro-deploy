<!-- components/organisms/Recruiter/link/Professional/Cell.vue -->
<template>
  <div v-if="professional" class="cell">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="professional.avatar"
          :url="professional.avatar"
          size="small"
          :altText="professional.display_name"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">{{ professional.display_name }}</span>
        <span class="handle">{{ professional.role || "Unknown Role" }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  id: { type: String, required: true },
  isDisabled: { type: Boolean, default: false }
});
const { fetchProfessional } = useProfessional();
const professional = fetchProfessional(props.id);
const route = computed(() => props.isDisabled ? null : `/professionals/${professional.id}`);
</script>
