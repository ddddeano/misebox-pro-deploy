<!-- components/molecules/places/Cell.vue -->
<template>
  <div class="cell place-cell" v-if="place && place.place_id">
    <div class="image-wrapper">
      <MoleculesProfileImage
        v-if="place.image_url"
        :url="place.image_url"
        size="small"
        altText="Place Image"
        class="main-avatar"
      />
    </div>
    <div class="cell-content">
      <span class="display-name" v-if="place.name">
        {{ place.name }}
      </span>
      <span class="handle" v-if="place.formatted_address">
        {{ place.formatted_address }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  place: {
    type: Object,
    required: true
  }
});
</script>
