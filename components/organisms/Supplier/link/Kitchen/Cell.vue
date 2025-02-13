<!-- components/organisms/Supplier/link/Kitchen/Cell.vue -->
<template>
  <div v-if="kitchen" class="cell">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="kitchen.image_url"
          :url="kitchen.image_url"
          size="small"
          :altText="kitchen.name"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">{{ kitchen.name }}</span>
        <span class="handle">{{ kitchen.short_address }}</span>
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
const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(props.id);
const route = computed(() => props.isDisabled ? null : `/kitchens/${kitchen.id}`);
</script>
