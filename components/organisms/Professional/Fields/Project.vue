<!-- components/organisms/Professional/Fields/Project.vue -->
<template>
  <div class="project-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <div class="swipe-container">
        <div class="swipe-content">
          <div v-if="currentTab === 'details'">
            <MoleculesProfileDisplay
              :items="[
                project.name || 'Project Name',
                project.role || 'Role',
                project.ongoing
                  ? `${project.from_year} - Present`
                  : `${project.from_year} - ${project.to_year || 'Year'}`,
              ]"
            />
          </div>

          <div v-else class="responsibilities-content">
            <div class="responsibilities">
              {{ project.responsibilities || "No responsibilities listed." }}
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
        <label for="name" class="label">Project Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter project name"
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
        <label class="label">From</label>
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

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode object-array-cell">
      <div class="profile-edit">
        <MoleculesProfileDisplay
          :items="[
            project.name || 'Project Name',
            project.role || 'Role',
            project.ongoing
              ? `${project.from_year} - Present`
              : `${project.from_year} - ${project.to_year || 'Year'}`,
          ]"
        />
        <TrashIcon class="icon delete-icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { addProfessionalArrayItem, removeProfessionalArrayItem } = useProfessional();

const props = defineProps({
  project: { type: Object, required: false, default: () => ({}) },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value)
  },
  index: { type: Number, required: false },
});

const localData = ref({ ...props.project });
const currentTab = ref("details");

onMounted(() => {
  if (localData.value.ongoing === undefined) {
    localData.value.ongoing = true;
  }
});

// Submit Create
async function submitCreate() {
  if (!localData.value.name) {
    console.error("Error: No project name provided.");
    return;
  }

  const trimmedProject = {
    name: localData.value.name?.trim() || null,
    role: localData.value.role?.trim() || null,
    from_year: localData.value.from_year?.trim() || null,
    to_year: localData.value.ongoing ? null : localData.value.to_year?.trim(),
    ongoing: !!localData.value.ongoing,
    responsibilities: localData.value.responsibilities?.trim() || null,
  };

  try {
    await addProfessionalArrayItem("projects", trimmedProject);
  } catch (error) {
    console.error("Error adding project:", error);
  }
}

// Submit Delete
async function submitDelete() {
  try {
    await removeProfessionalArrayItem("projects", props.index);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}
</script>
