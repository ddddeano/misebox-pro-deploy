<!-- components/organisms/Professional/Fields/Language.vue -->
<template>
  <div class="language-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <MoleculesProfileDisplay
        :items="[language.language, language.proficiency]"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Language Input -->
      <div class="form-group">
        <label for="language" class="label">Language</label>
        <input
          type="text"
          id="language"
          v-model="localData.language"
          placeholder="Enter language"
          class="editable-input"
        />
      </div>

      <!-- Proficiency Selector -->
      <div class="form-group">
        <label for="proficiency" class="label">Proficiency</label>
        <select v-model="localData.proficiency" class="editable-input">
          <option disabled value="">Select proficiency</option>
          <option value="A1">A1 - Beginner</option>
          <option value="A2">A2 - Elementary</option>
          <option value="B1">B1 - Intermediate</option>
          <option value="B2">B2 - Upper Intermediate</option>
          <option value="C1">C1 - Advanced</option>
          <option value="C2">C2 - Proficient</option>
          <option value="Native">Native</option>
        </select>
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode object-array-cell">
      <div class="profile-edit">
        <MoleculesProfileDisplay
          :items="[language.language, language.proficiency]"
        />
        <TrashIcon class="icon delete-icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>

// Import CRUD operations
const {
  addProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional();

const props = defineProps({
  language: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
});

const localData = ref({
  ...props.language,
});

// Create a new language entry
async function submitCreate() {
  try {
    await addProfessionalArrayItem("languages", localData.value);
    console.log("Language added successfully.");
  } catch (error) {
    console.error("Error adding language:", error);
  }
}

// Delete a language entry
async function submitDelete() {
  try {
    await removeProfessionalArrayItem("languages", props.index);
    console.log("Language deleted successfully.");
  } catch (error) {
    console.error("Error deleting language:", error);
  }
}
</script>

<style scoped>
.profile-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-m);
}
</style>
