<!-- components/molecules/forms/TopSection.vue -->
<template>
  <div class="top" :class="{ unfolded: !isFolded }">
    <label>{{ label }}</label>
    <!-- Chevron Down Icon (when folded) -->
    <ChevronDownIcon
      v-if="isFolded"
      class="icon toggle-icon"
      @click="emitToggle"
    />
    <!-- Additional Icons (when unfolded) -->
    <div v-else class="top-icons">
      <PlusCircleIcon
        v-if="!isCreating"
        class="icon add-icon"
        @click="emitCreate"
      />
      <PencilIcon
        v-if="!isEditing && itemsLength > 0"
        class="icon edit-icon"
        @click="emitEdit"
      />
      <ChevronUpIcon class="icon toggle-icon" @click="emitToggle" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  isFolded: {
    type: Boolean,
    required: true,
  },
  isCreating: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  itemsLength: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["toggle", "start-creating", "start-editing"]);

const emitToggle = () => {
  emit("toggle");
};

const emitCreate = () => {
  emit("start-creating");
};

const emitEdit = () => {
  emit("start-editing");
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-strong);
  padding: var(--spacing-s);
  border-radius: var(--radius-s);
  border: 1px solid var(--border);
  transition: background-color 0.3s ease;

  &.unfolded {
    background-color: var(--background-strong);
  }
}

.top-icons {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.icon {
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon:hover {
  color: var(--primary-hover);
  transform: scale(1.1);
}
</style>
