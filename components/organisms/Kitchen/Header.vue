<!-- components/organisms/Kitchen/Header.vue -->
<template>
  <div class="kitchen-header">
    <!-- Kitchen Avatar -->
    <div class="kitchen-photo-container">
      <MoleculesProfileAvatar
        :url="kitchen.avatar || '/images/default-kitchen.jpg'"
        altText="Kitchen Avatar"
        size="large"
      />
    </div>

    <!-- Kitchen Details -->
    <div class="kitchen-details">
      <h1 class="kitchen-name">{{ kitchen.name }}</h1>

      <p class="kitchen-address" v-if="kitchen.formatted_address">
        {{ kitchen.formatted_address }}
      </p>

      <!-- Added By Information -->
      <p class="added-by" v-if="kitchen.added_by && !isViewingOwnKitchen">
        <strong>Added By:</strong> {{ kitchen.added_by }}
      </p>

      <!-- Team Member Info -->
      <p class="team-members" v-if="kitchen.team && kitchen.team.length">
        <strong>Team Members:</strong> {{ kitchen.team.length }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props for the kitchen data
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
})

// Interaction logic
const { isInteractingWithSelf } = useInteraction()
const isViewingOwnKitchen = isInteractingWithSelf(props.kitchen.added_by)
</script>

<style scoped>
.kitchen-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background-color: var(--background);
  border-radius: var(--radius-s);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 1px solid var(--border);
}

.kitchen-photo-container {
  margin-bottom: 1rem;
}

.kitchen-name {
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  margin: 0.5rem 0;
}

.kitchen-address {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.team-members,
.added-by {
  font-size: 1rem;
  color: var(--text-primary);
}
</style>
