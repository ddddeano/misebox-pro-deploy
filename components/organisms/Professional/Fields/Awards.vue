<!-- components/organisms/Professional/Fields/Awards.vue -->
<template>
  <div class="award-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="award-details">
        <div>
          <strong>{{ award.name }}</strong>
        </div>
        <div>{{ award.place }}</div>
        <div>{{ award.year }}</div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Award Name -->
      <div class="form-group">
        <label for="name" class="label">Award Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter award name"
          class="editable-input"
        />
      </div>

      <!-- Issuing Organization -->
      <MoleculesPlacesWizard
        label="Issuing Organization"
        v-model="localData.place"
        @update:modelValue="
          (value) => {
            selectedPlace.value = value
          }
        "
      />

      <!-- Year Selector -->
      <div class="form-group">
        <label for="year" class="label">Year</label>
        <MoleculesFormsYearSelector
          :year="localData.year"
          @update:year="(newYear) => (localData.year = newYear)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <!-- Award Name -->
      <div class="form-group">
        <label for="name" class="label">Award Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter award name"
          class="editable-input"
        />
      </div>

      <!-- Issuing Organization -->
      <MoleculesPlacesWizard
        label="Issuing Organization"
        v-model="localData.place"
        @update:modelValue="
          (value) => {
            selectedPlace.value = value
          }
        "
      />

      <!-- Year Selector -->
      <div class="form-group">
        <label for="year" class="label">Year</label>
        <MoleculesFormsYearSelector
          :year="localData.year"
          @update:year="(newYear) => (localData.year = newYear)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteAward" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Explicitly destructure CRUD operations from useProfessional
const {
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional()

const props = defineProps({
  award: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
})

const localData = ref({ ...props.award })
const selectedPlace = ref(null)

// Create award
async function submitCreate() {
  try {
    console.log('[submitCreate] Submitting award:', localData.value) // Log data being submitted
    await addProfessionalArrayItem('awards', localData.value)
    console.log('[submitCreate] Award added successfully.')
  } catch (error) {
    console.error('[submitCreate] Error adding award:', error)
  }
}

// Edit award
async function submitEdit() {
  try {
    console.log('[submitEdit] Updating award:', localData.value) // Log data being updated
    await updateProfessionalArrayItem('awards', props.index, localData.value)
    console.log('[submitEdit] Award updated successfully.')
  } catch (error) {
    console.error('[submitEdit] Error updating award:', error)
  }
}

// Delete award
async function deleteAward() {
  try {
    console.log('[deleteAward] Deleting award at index:', props.index) // Log index being deleted
    await removeProfessionalArrayItem('awards', props.index)
    console.log('[deleteAward] Award removed successfully.')
  } catch (error) {
    console.error('[deleteAward] Error removing award:', error)
  }
}
</script>
