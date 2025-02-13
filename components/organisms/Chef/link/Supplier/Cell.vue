<!-- components/organisms/Chef/link/Supplier/Cell.vue -->
<template>
  <div v-if="supplier" class="cell">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="supplier.logo_url"
          :url="supplier.logo_url"
          size="small"
          :altText="supplier.name"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">{{ supplier.name }}</span>
        <span class="handle">{{ supplier.category || "Uncategorized" }}</span>
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
const { fetchSupplier } = useSupplier();
const supplier = fetchSupplier(props.id);
const route = computed(() => props.isDisabled ? null : `/suppliers/${supplier.id}`);
</script>
