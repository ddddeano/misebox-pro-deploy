<!-- components/organisms/Professional/Fields/EmploymentExperience.vue -->
<template>
  <div class="professional-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <div class="swipe-container">
        <div class="swipe-content">
          <!-- Slide System: Details vs. Responsibilities -->
          <div v-if="currentTab === 'details'" class="image-display-container">
            <!-- Details on the left -->
            <div class="details">
              <MoleculesProfileDisplay :items="displayItems" />
            </div>
            <!-- Employer Image on the right -->
            <div class="image-wrapper">
              <img
                v-if="employmentExperience.image_url"
                :src="employmentExperience.image_url"
                alt="Employer Image"
                class="profile-display-image"
              />
            </div>
          </div>
          <div v-else class="responsibilities-content">
            <div class="responsibilities">
              {{ employmentExperience.responsibilities || "No responsibilities listed." }}
            </div>
          </div>
        </div>
        <!-- Swipe Navigation Dots -->
        <div class="swipe-dots">
          <div class="dot" :class="{ active: currentTab === 'details' }" @click="currentTab = 'details'"></div>
          <div class="dot" :class="{ active: currentTab === 'responsibilities' }" @click="currentTab = 'responsibilities'"></div>
        </div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <div class="input-with-toggle">
          <!-- Show search component or manual input based on inputMode -->
          <template v-if="inputMode === 'search'">
            <template v-if="!hasSelectedEmployment">
              <MoleculesPlacesSearch
                placeholder="Search or select an employer..."
                @select-place="handleSelectEmployment"
              />
            </template>
            <template v-else>
              <MoleculesPlacesCell :place="localData" />
            </template>
          </template>
          <template v-else>
            <input
              type="text"
              v-model="localData.name"
              placeholder="Enter employer name"
              class="editable-input"
            />
          </template>
          <!-- Toggle Icons always on the right -->
          <div class="toggle-icons-inline">
            <MagnifyingGlassIcon
              v-if="inputMode === 'manual'"
              class="icon"
              @click="switchToSearch"
            />
            <ItalicIcon
              v-if="inputMode === 'search'"
              class="icon"
              @click="switchToManual"
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <input type="text" id="role" v-model="localData.role" placeholder="Enter role" class="editable-input" />
      </div>
      <div class="form-group">
        <MoleculesFormsMonthAndYearSelector
          :month="localData.from_month"
          :year="localData.from_year"
          @update:month="newMonth => (localData.from_month = newMonth)"
          @update:year="newYear => (localData.from_year = newYear)"
        />
      </div>
      <div class="form-group">
        <div class="checkbox-group" @click="toggleOngoing">
          <CheckCircleIcon
            class="checker icon"
            :class="{ checked: localData.ongoing, unchecked: !localData.ongoing }"
          />
          <span>Ongoing</span>
        </div>
        <MoleculesFormsMonthAndYearSelector
          v-if="!localData.ongoing"
          :month="localData.to_month"
          :year="localData.to_year"
          @update:month="newMonth => (localData.to_month = newMonth)"
          @update:year="newYear => (localData.to_year = newYear)"
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
        <MoleculesProfileDisplay :items="displayItems" />
        <TrashIcon class="icon delete-icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { addProfessionalArrayItem, removeProfessionalArrayItem } = useProfessional();

const props = defineProps({
  employmentExperience: { type: Object, default: () => ({}) },
  mode: { type: String, required: true, validator: (v) => ["display", "edit", "create"].includes(v) },
  index: { type: Number, default: null }
});

// Use a flat object (like your kitchen experience)
const localData = ref({ ...props.employmentExperience });
const currentTab = ref("details");
const inputMode = ref("search");

// Check if an employer has been selected by checking flat fields
const hasSelectedEmployment = computed(() => {
  return localData.value.name || localData.value.place_name;
});

// Build display items from the flat structure
const displayItems = computed(() => [
  (localData.value.name || localData.value.place_name) || "Employer Name",
  (localData.value.short_address || localData.value.formatted_address) || "Address",
  localData.value.role || "Role",
  localData.value.ongoing
    ? `${localData.value.from_month} ${localData.value.from_year} - Present`
    : `${localData.value.from_month} ${localData.value.from_year} - ${localData.value.to_month || "Month"} ${localData.value.to_year || "Year"}`
]);

// When an employer is selected, merge its data into the flat object
function handleSelectEmployment(selectedEmployment) {
  localData.value = { ...localData.value, ...selectedEmployment };
  console.log("Selected employment:", selectedEmployment);
}

function clearEmployment() {
  localData.value = {};
}

function switchToManual() {
  inputMode.value = "manual";
}

function switchToSearch() {
  inputMode.value = "search";
}

function toggleOngoing() {
  localData.value.ongoing = !localData.value.ongoing;
  if (localData.value.ongoing) {
    localData.value.to_month = "";
    localData.value.to_year = "";
  }
}

async function submitCreate() {
  if (!localData.value.name && !localData.value.place_name) {
    console.error("Error: No employer selected.");
    return;
  }
  const trimmedExperience = {
    from_month: localData.value.from_month?.trim() || null,
    from_year: localData.value.from_year?.trim() || null,
    to_month: localData.value.to_month?.trim() || null,
    to_year: localData.value.to_year?.trim() || null,
    short_address: localData.value.short_address?.trim() ||
                   localData.value.formatted_address?.trim() || null,
    image_url: localData.value.image_url?.trim() || null,
    name:
      (localData.value.name?.trim() || localData.value.place_name?.trim()) ||
      "Unknown Employer",
    place_id: localData.value.place_id?.trim() || null,
    ongoing: !!localData.value.ongoing,
    responsibilities: localData.value.responsibilities?.trim() || null,
    role: localData.value.role?.trim() || null,
  };
  console.log("Trimmed experience to submit:", trimmedExperience);
  try {
    await addProfessionalArrayItem("employment_experience", trimmedExperience);
    console.log("Employment experience added successfully.");
  } catch (error) {
    console.error("Error adding employment experience:", error);
  }
}

async function submitDelete() {
  try {
    await removeProfessionalArrayItem("employment_experience", props.index);
    console.log("Employment experience deleted successfully.");
  } catch (error) {
    console.error("Error deleting employment experience:", error);
  }
}
</script>
