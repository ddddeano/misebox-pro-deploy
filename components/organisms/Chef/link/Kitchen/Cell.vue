<!-- components/organisms/Chef/link/Kitchen/Cell.vue -->
<template>
  <div class="cell chef-link-kitchen-cell" v-if="kitchen && kitchen.id">
    <NuxtLink :to="isDisabled ? null : `/kitchens/${kitchen.id}`" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="kitchen.image_url"
          :url="kitchen.image_url"
          size="small"
          altText="Kitchen Image"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="kitchen.name">
          {{ kitchen.name }}
        </span>
        <span class="handle" v-if="kitchen.short_address">
          {{ kitchen.short_address }}
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

// Fetch the full kitchen object using the provided id.
const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(props.id);
</script>
