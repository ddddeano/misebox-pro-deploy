<!-- components/molecules/forms/DisplayModeSection.vue -->
<template>
  <div v-if="!isEditing && !isCreating && !isFolded" class="display">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="display-list-item-view"
      >
        <slot name="display" :item="item" :index="index" />
      </li>
    </ul>
    <!-- Empty State -->
    <p v-if="items.length === 0" class="empty-message">
      There are no items to display. Press
      <span class="add-hint">
        <PlusCircleIcon
          v-if="!isCreating"
          class="icon icon-inline"
          @click="handleStartCreating"
        />
      </span>
      to add a new item.
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  isCreating: {
    type: Boolean,
    required: true,
  },
  isFolded: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["start-creating"]);

const handleStartCreating = () => {
  emit("start-creating");
};
</script>

<style lang="scss" scoped>
.display {
  margin-top: var(--spacing-s);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .display-list-item-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xs);
    margin-bottom: var(--spacing-xs);
    border: 1px solid var(--border);
    border-radius: var(--radius-s);
    background-color: var(--background-light);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--background-hover);
    }
  }

  .empty-message {
    margin-top: var(--spacing-s);
    font-size: var(--font-size-m);
    color: var(--text-secondary);
    text-align: center;
  }

  .add-hint {
    font-weight: bold;
    color: var(--primary);
    display: inline-flex; /* Ensures alignment with text */
    align-items: center; /* Vertically centers the icon */
  }

  .icon-inline {
    margin-left: 4px; /* Adds space between the text and the icon */
    transform: translateY(6px); /* Nudges the icon down slightly */
    display: inline-block; /* Ensures the icon stays inline with text */
  }
}
</style>
