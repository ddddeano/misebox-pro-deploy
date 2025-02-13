<!-- components/organisms/Job/Card.vue -->
<template>
  <div class="card job-card" v-if="job && job.id">
    <NuxtLink :to="`/jobs/${job.id}`" class="card-main">
      <div class="image-wrapper" v-if="job.image_url">
        <MoleculesProfileImage
          :url="job.image_url"
          size="medium"
          altText="Job Image"
        />
      </div>
      <div class="card-content">
        <span class="display-name">{{ job.job_title }}</span>
        <span class="handle">{{ formattedStartDate }}</span>
        <span class="cell-subtitle">{{ priceDisplay }}</span>
      </div>
    </NuxtLink>
    <div class="card-footer">
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  job: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const formattedStartDate = computed(() => {
  // In a full implementation, format the start date as needed.
  return props.job.start_date
})

const priceDisplay = computed(() => {
  return `${props.job.price} ${props.job.currency}/h`
})
</script>
