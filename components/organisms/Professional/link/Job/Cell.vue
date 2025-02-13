<!-- components/organisms/Professional/link/Job/Cell.vue -->
<template>
  <div v-if="job" class="cell">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="job.company_logo"
          :url="job.company_logo"
          size="small"
          :altText="job.company_name"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">{{ job.title }}</span>
        <span class="handle">{{ job.company_name }}</span>
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
const { fetchJob } = useJob();
const job = fetchJob(props.id);
const route = computed(() => props.isDisabled ? null : `/jobs/${job.id}`);
</script>
