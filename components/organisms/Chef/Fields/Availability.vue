<!-- components/organisms/Chef/Fields/Availability.vue -->
<template>
  <div class="availability">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-section">
      <MoleculesProfileDisplay
        :items="formattedAvailability"
        class="display-block"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="form-section">
      <!-- <MoleculesFormsField
        label="Start Time"
        type="time"
        v-model="localData.start"
      />
      <MoleculesFormsField
        label="End Time"
        type="time"
        v-model="localData.end"
      /> -->
      <MoleculesFormsTextAreaField
        label="Notes"
        v-model="localData.notes"
        placeholder="Add any notes"
      />
      <button class="btn-primary save-btn" @click="submitCreate">Save</button>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-section">
      <MoleculesProfileDisplay
        :items="formattedAvailability"
        class="display-block"
      />
      <button class="btn-secondary delete-btn" @click="submitDelete">Delete</button>
    </div>
  </div>
</template>

<script setup>

const { addChefArrayItem, removeChefArrayItem } = useChef();

const props = defineProps({
  availability: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: Number,
});

const localData = ref({
  ...props.availability,
});

const formattedAvailability = computed(() => [
  `Start: ${props.availability.start || "N/A"}`,
  `End: ${props.availability.end || "N/A"}`,
  props.availability.notes || "No notes provided",
]);

// Create a new availability entry
async function submitCreate() {
  try {
    await addChefArrayItem("availability", localData.value);
    console.log("Availability added successfully.");
  } catch (error) {
    console.error("Error adding availability:", error);
  }
}

// Delete an availability entry
async function submitDelete() {
  try {
    await removeChefArrayItem("availability", props.index);
    console.log("Availability deleted successfully.");
  } catch (error) {
    console.error("Error deleting availability:", error);
  }
}
</script>
