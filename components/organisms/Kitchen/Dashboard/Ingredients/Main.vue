<template>
  <div>
    <div class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab', { active: activeTab === tab.value }]"
        @click="selectTab(tab.value)"
      >
        {{ tab.value }}
      </div>
    </div>
    <div class="tab-content">
      <!-- Kitchen Section -->
      <template v-if="activeTab === '1'">
        <OrganismsKitchenDashboardIngredientsSection1 />
      </template>

      <!-- Ingredient Section -->
      <template v-if="activeTab === '2'">
        <OrganismsKitchenDashboardIngredientsSection2 />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define tabs where the label equals the value.
const tabs = [
  { value: '1' },
  { value: '2' },
];

const activeTab = ref(tabs[0].value);

const selectTab = (value) => {
  activeTab.value = value;
  // Optionally, emit an event here if needed.
};
</script>

<style scoped>
.tab-bar {
  display: flex;
  gap: 16px;
  border-bottom: 2px solid var(--border);
  margin-bottom: var(--spacing-m);
}

.tab {
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.tab:hover {
  border-bottom-color: var(--primary-light);
}

.tab.active {
  border-bottom-color: var(--primary);
  font-weight: bold;
}

.tab-content {
  padding: var(--spacing-m);
}
</style>
