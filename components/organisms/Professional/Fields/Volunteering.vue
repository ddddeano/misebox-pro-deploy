<!-- components/organisms/Professional/Fields/Volunteering.vue -->
<template>
  <div class="volunteering-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <div class="swipe-container">
        <div class="swipe-content">
        
          <div v-if="currentTab === 'details'">
            <MoleculesProfileDisplay
              :items="[
                volunteering.organization || 'Organization Name',
                volunteering.role || 'Role',
                volunteering.ongoing
                  ? `${volunteering.from_year} - Present`
                  : `${volunteering.from_year} - ${volunteering.to_year || 'N/A'}`,
              ]"
            />
          </div>

          <div v-else class="responsibilities-content">
            <div class="responsibilities">
              {{ volunteering.responsibilities || "No responsibilities listed." }}
            </div>
          </div>
        </div>

        <!-- Centered Swipe Navigation Dots -->
        <div class="swipe-dots">
          <div class="dot" :class="{ active: currentTab === 'details' }" @click="currentTab = 'details'"></div>
          <div class="dot" :class="{ active: currentTab === 'responsibilities' }" @click="currentTab = 'responsibilities'"></div>
        </div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="organization" class="label">Organization</label>
        <input
          type="text"
          id="organization"
          v-model="localData.organization"
          placeholder="Enter organization name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="role" class="label">Role</label>
        <input
          type="text"
          id="role"
          v-model="localData.role"
          placeholder="Enter role"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label class="label">From Year</label>
        <MoleculesFormsYearSelector
          :year="localData.from_year"
          @update:year="(newYear) => (localData.from_year = newYear)"
        />
      </div>

      <div class="form-group">
        <label class="label">To</label>
        <div class="checkbox-group" @click="localData.ongoing = !localData.ongoing">
          <CheckCircleIcon class="checker icon" :class="localData.ongoing ? 'checked' : 'unchecked'" />
          <span>Ongoing</span>
        </div>
      </div>

      <div class="form-group" v-if="!localData.ongoing">
        <label class="label">To Year</label>
        <MoleculesFormsYearSelector
          :year="localData.to_year"
          @update:year="(newYear) => (localData.to_year = newYear)"
        />
      </div>

      <div class="form-group">
        <textarea
          id="responsibilities"
          v-model="localData.responsibilities"
          placeholder="Describe your responsibilities"
          class="editable-input editable-textarea"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { addProfessionalArrayItem, removeProfessionalArrayItem } = useProfessional();

const props = defineProps({
  volunteering: { type: Object, required: false, default: () => ({}) },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: { type: Number, required: false },
});

const localData = ref({ ...props.volunteering });
const currentTab = ref("details");

onMounted(() => {
  if (localData.value.ongoing === undefined) {
    localData.value.ongoing = true;
  }
});

// Submit Create
async function submitCreate() {
  try {
    await addProfessionalArrayItem("volunteering", localData.value);
  } catch (error) {
    console.error("Error adding volunteering entry:", error);
  }
}

// Submit Delete
async function submitDelete() {
  try {
    await removeProfessionalArrayItem("volunteering", props.index);
  } catch (error) {
    console.error("Error deleting volunteering entry:", error);
  }
}
</script>
