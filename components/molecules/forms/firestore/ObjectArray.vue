<!-- components/molecules/forms/firestore/ObjectArray.vue -->
<!-- components/molecules/forms/ObjectArray.vue -->
<template>
  <div class="form-field object-array" :class="{ 'gallery-layout': isGallery }">
    <!-- Top Section -->
    <MoleculesFormsTopSection
      :label="label"
      :isFolded="isFolded"
      :itemsLength="firebaseValue.length"
      @toggle="toggleFold"
      @start-creating="startCreating"
      @start-editing="startEditing"
      @start-displaying="startDisplaying"
    />

    <!-- Section States -->
    <div class="states" v-if="!isFolded">
      <!-- Edit Mode -->
      <template v-if="isEditing">
        <ul class="edit-mode list">
          <li v-for="(item, index) in firebaseValue" :key="index" class="list-item">
            <slot name="edit" :item="item" :index="index" />
          </li>
        </ul>
      </template>

      <!-- Create Mode -->
      <template v-if="isCreating">
        <div class="create-mode list">
          <slot name="create" />
        </div>
      </template>

      <!-- Display Mode -->
      <template v-if="isDisplaying">
        <ul class="display-mode list">
          <li v-for="(item, index) in firebaseValue" :key="index" class="list-item">
            <slot name="display" :item="item" :index="index" />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    default: "Manage Items",
  },
  firebaseValue: {
    type: Array,
    default: () => [],
  },
  isGallery: {
    type: Boolean,
    required: false,
    default: false, // ✅ Only applies grid if explicitly set
  },
});

const isFolded = ref(true);
const isCreating = ref(false);
const isEditing = ref(false);
const isDisplaying = ref(false);

function toggleFold() {
  isFolded.value = !isFolded.value;
  if (!isFolded.value) {
    resetStates();
    isDisplaying.value = true;
  }
}

function startCreating() {
  resetStates();
  isCreating.value = true;
}

function startEditing() {
  resetStates();
  isEditing.value = true;
}

function startDisplaying() {
  resetStates();
  isDisplaying.value = true;
}

function resetStates() {
  isCreating.value = false;
  isEditing.value = false;
  isDisplaying.value = false;
}

watchEffect(() => {
  if (props.firebaseValue.length > 0) {
    resetStates();
    isDisplaying.value = true;
  }
});
</script>

<style lang="scss" scoped>
.form-field {
  padding: 0;
}

.object-array {
  /* Ensure the object-array has no alternating background colors */
  background-color: transparent;

  &:nth-child(odd),
  &:nth-child(even) {
    background-color: transparent;
  }
}

/* ✅ Apply Grid **ONLY** when `isGallery` is `true` */
.object-array.gallery-layout .display-mode.list {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-s);
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
