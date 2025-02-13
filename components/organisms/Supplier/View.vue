<!-- components/organisms/Supplier/View.vue -->
<template>
  <client-only>
    <div class="view-profile supplier-profile">
      <div class="supplier-header">
        <img
          v-if="supplier.image_url"
          :src="supplier.image_url"
          :alt="`Profile image of ${supplier.place_name}`"
          class="supplier-photo"
        />
        <h1 class="supplier-name">{{ supplier.place_name }}</h1>
        <p class="supplier-address">{{ supplier.formatted_address }}</p>
      </div>

      <section class="supplier-info">
        <h2>Supplier Information</h2>
        <ul>
          <li>
            <strong>ID:</strong> {{ supplier.id }}
          </li>
          <li>
            <strong>Place ID:</strong> {{ supplier.place_id }}
          </li>
          <li>
            <strong>Search Terms:</strong> {{ supplier.search_terms }}
          </li>
          <li>
            <strong>Source:</strong> {{ supplier.source }}
          </li>
          <li>
            <strong>Created At:</strong>
            {{ new Date(supplier.created_at).toLocaleString() }}
          </li>
        </ul>
      </section>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.view-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l);
  gap: var(--spacing-m);
}

.supplier-header {
  text-align: center;
  margin-bottom: var(--spacing-l);
}

.supplier-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--spacing-s);
}

.supplier-name {
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin-bottom: var(--spacing-xs);
}

.supplier-address {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}

.supplier-info {
  width: 100%;
  max-width: 600px;
  background: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
  padding: var(--spacing-m);
}

.supplier-info h2 {
  margin-bottom: var(--spacing-s);
  font-size: var(--font-size-l);
  color: var(--text-primary);
}

.supplier-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.supplier-info li {
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-m);
}

.supplier-info li strong {
  font-weight: bold;
}
</style>
