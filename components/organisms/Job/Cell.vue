<!-- components/organisms/Job/Cell.vue -->
<template>
  <div class="cell" v-if="job && job.id">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="job.image_url"
          :url="job.image_url"
          size="small"
          altText="Job Image"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="job.job_title">
          {{ job.job_title }}
        </span>
        <span class="handle" v-if="job.start_date">
          {{ job.start_date }}
        </span>
        <span class="time-posted">
          Posted: {{ timePosted }}
        </span>
        <span class="cell-subtitle" v-if="job.price && job.currency">
          {{ job.price }} {{ job.currency }}/h
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const route = computed(() =>
  props.isDisabled ? null : `/jobs/${props.job.id}`
);

const timePosted = computed(() => {
  const createdAt = new Date(props.job.created_at);
  const now = new Date();
  const diffMs = now - createdAt;
  const diffHours = diffMs / (1000 * 60 * 60);
  if (diffHours < 24) {
    return Math.floor(diffHours) + " hours ago";
  }
  const diffDays = diffHours / 24;
  if (diffDays < 30) {
    return Math.floor(diffDays) + " days ago";
  }
  return "30+ days ago";
});
</script>
