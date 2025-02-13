<!-- components/organisms/Professional/Fields/Education.vue -->
<template>
  <div class="education-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <div class="swipe-container">
        <div class="swipe-content">
          <div v-if="currentTab === 'details'" class="image-display-container">
            <!-- Details on the left -->
            <div class="details">
              <MoleculesProfileDisplay :items="displayItems" />
            </div>
            <!-- Institution Image on the right -->
            <div class="image-wrapper">
              <img 
                v-if="education.image_url"
                :src="education.image_url"
                alt="Institution Image"
                class="profile-display-image"
              />
            </div>
          </div>
          <div v-else class="additional-info-content">
            <a
              v-if="education.document_url"
              :href="education.document_url"
              target="_blank"
              class="view-document btn"
            >
              View Document
            </a>
          </div>
        </div>
        <!-- Swipe Navigation Dots -->
        <div class="swipe-dots">
          <div class="dot" :class="{ active: currentTab === 'details' }" @click="currentTab = 'details'"></div>
          <div class="dot" :class="{ active: currentTab === 'additional_info' }" @click="currentTab = 'additional_info'"></div>
        </div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Institution Selection with Inline Toggle Icons -->
      <div class="form-group">
        <div class="input-with-toggle">
          <template v-if="inputMode === 'search'">
            <template v-if="!hasSelectedOrganization">
              <MoleculesPlacesSearch
                placeholder="Search or select an institution..."
                @select-place="handleSelectInstitution"
              />
            </template>
            <template v-else>
              <MoleculesPlacesCell :place="localData.place" />
            </template>
          </template>
          <template v-else>
            <input
              type="text"
              v-model="localData.place.name"
              placeholder="Enter institution name"
              class="editable-input"
            />
          </template>
          <!-- Inline Toggle Icons always on the right -->
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
        <label for="degree" class="label">Certification/Degree</label>
        <input type="text" id="degree" v-model="localData.degree" placeholder="Enter degree" class="editable-input" />
      </div>

      <div class="form-group">
        <label class="label">Start Year</label>
        <MoleculesFormsYearSelector
          :year="localData.start_year"
          @update:year="newYear => (localData.start_year = newYear)"
        />
      </div>

      <div class="form-group">
        <div class="checkbox-group" @click="localData.ongoing = !localData.ongoing">
          <CheckCircleIcon
            class="checker icon"
            :class="{ checked: localData.ongoing, unchecked: !localData.ongoing }"
          />
          <span>Ongoing</span>
        </div>
      </div>

      <div class="form-group" v-if="!localData.ongoing">
        <MoleculesFormsYearSelector
          :year="localData.end_year"
          @update:year="newYear => (localData.end_year = newYear)"
        />
      </div>

      <MoleculesFormsFirestoreDocumentUpload
        :userId="userId"
        collection="professionals"
        storagePath="education"
        label="Upload Education Document"
        @update:documentUrl="url => localData.document_url = url"
      />

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
const currentUser = useCurrentUser();
const userId = computed(() => currentUser.value?.uid);

const { addProfessionalArrayItem, removeProfessionalArrayItem } = useProfessional();

const props = defineProps({
  education: { type: Object, default: () => ({}) },
  mode: { type: String, required: true, validator: (v) => ["display", "edit", "create"].includes(v) },
  index: { type: Number, required: false },
});

const localData = ref({ ...props.education });
const currentTab = ref("details");
const inputMode = ref("search");

// Ensure localData.place exists
if (!localData.value.place) {
  localData.value.place = {};
}

function handleSelectInstitution(selectedInstitution) {
  localData.value.place = selectedInstitution;
  console.log("Selected institution:", selectedInstitution);
}

function switchToManual() {
  inputMode.value = "manual";
}

function switchToSearch() {
  inputMode.value = "search";
}

const hasSelectedOrganization = computed(() => {
  return localData.value.place && (localData.value.place.name || localData.value.place.place_name);
});

const displayItems = computed(() => [
  localData.value.place.name || "Institution Name",
  localData.value.short_address || localData.value.place?.formatted_address || "Address",
  localData.value.degree || "Degree",
  localData.value.ongoing
    ? `${localData.value.start_year} - Present`
    : `${localData.value.start_year} - ${localData.value.end_year || "Year"}`
]);

async function submitCreate() {
  if (!localData.value.place || !localData.value.place.name) {
    console.error("Error: No issuing institution selected.");
    return;
  }
  const trimmedEducation = {
    degree: localData.value.degree?.trim() || null,
    place_name:
      localData.value.place.name?.trim() ||
      localData.value.place.place_name?.trim() ||
      "Unknown Institution",
    formatted_address: localData.value.place.formatted_address?.trim() || null,
    short_address: localData.value.place.short_address?.trim() ||
      localData.value.place.formatted_address?.trim() ||
      null,
    image_url: localData.value.place.image_url?.trim() || null,
    start_year: localData.value.start_year?.toString().trim() || null,
    end_year: localData.value.ongoing ? null : (localData.value.end_year?.toString().trim() || null),
    ongoing: !!localData.value.ongoing,
    document_url: localData.value.document_url || null,
  };
  console.log("Trimmed education to submit:", trimmedEducation);
  try {
    await addProfessionalArrayItem("education", trimmedEducation);
    console.log("Education added successfully.");
  } catch (error) {
    console.error("Error adding education:", error);
  }
}

async function submitDelete() {
  try {
    await removeProfessionalArrayItem("education", props.index);
    console.log("Education deleted successfully.");
  } catch (error) {
    console.error("Error deleting education:", error);
  }
}
</script>




