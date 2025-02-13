<!-- components/organisms/Professional/Fields/Certification.vue -->
<template>
  <div class="certification-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <div class="swipe-container">
        <div class="swipe-content">
          <!-- Slide System: Details vs. Additional Info -->
          <div v-if="currentTab === 'details'" class="image-display-container">
            <!-- Details on the left -->
            <div class="details">
              <MoleculesProfileDisplay :items="displayItems" />
            </div>
            <!-- Certification Image on the right -->
            <div class="image-wrapper">
              <img 
                v-if="certification.image_url"
                :src="certification.image_url"
                alt="Certification Image"
                class="profile-display-image"
              />
            </div>
          </div>
          <div v-else class="additional-info-content">
            <a
              v-if="certification.document_url"
              :href="certification.document_url"
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
      <div class="form-group">
        <div class="input-with-toggle">
          <!-- Show search component or manual input based on inputMode -->
          <template v-if="inputMode === 'search'">
            <template v-if="!hasSelectedOrganization">
              <MoleculesPlacesSearch
                placeholder="Search or select an organization..."
                @select-place="handleSelectOrganization"
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
              placeholder="Enter organization name"
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
        <label for="name" class="label">Certification Name</label>
        <input type="text" id="name" v-model="localData.name" placeholder="Enter certification name" class="editable-input" />
      </div>

      <div class="form-group">
        <label class="label">Year</label>
        <MoleculesFormsYearSelector
          :year="localData.year"
          @update:year="newYear => (localData.year = newYear)"
        />
      </div>

      <MoleculesFormsFirestoreDocumentUpload
        :userId="userId"
        collection="professionals"
        storagePath="certifications"
        label="Upload Certification Document"
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
  certification: { type: Object, default: () => ({}) },
  mode: { type: String, required: true, validator: (v) => ["display", "edit", "create"].includes(v) },
  index: { type: Number, required: false },
});

const localData = ref({ ...props.certification });
const currentTab = ref("details");
const inputMode = ref("search");

onMounted(() => {
  if (!localData.value.year) {
    // Convert the year to a string to satisfy the prop type requirement
    localData.value.year = new Date().getFullYear().toString();
  }
  if (!localData.value.place) {
    localData.value.place = {};
  }
});

function handleSelectOrganization(selectedOrganization) {
  localData.value.place = selectedOrganization;
  console.log("Selected organization:", selectedOrganization);
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
  localData.value.name || localData.value.place?.place_name || "Certification Name",
  localData.value.short_address || localData.value.place?.formatted_address || "Address",
  localData.value.year || "Year"
]);

async function submitCreate() {
  if (!localData.value.place || !localData.value.place.name) {
    console.error("Error: No issuing organization selected.");
    return;
  }
  const trimmedCertification = {
    name: localData.value.name?.trim() || null,
    place_name:
      localData.value.place.name?.trim() ||
      localData.value.place.place_name?.trim() ||
      "Unknown Organization",
    formatted_address: localData.value.place.formatted_address?.trim() || null,
    short_address: localData.value.place.short_address?.trim() ||
      localData.value.place.formatted_address?.trim() ||
      null,
    image_url: localData.value.place.image_url?.trim() || null,
    year: localData.value.year?.toString().trim() || null,
    document_url: localData.value.document_url || null,
  };
  console.log("Trimmed certification to submit:", trimmedCertification);
  try {
    await addProfessionalArrayItem("certifications", trimmedCertification);
    console.log("Certification added successfully.");
  } catch (error) {
    console.error("Error adding certification:", error);
  }
}

async function submitDelete() {
  try {
    await removeProfessionalArrayItem("certifications", props.index);
    console.log("Certification deleted successfully.");
  } catch (error) {
    console.error("Error deleting certification:", error);
  }
}
</script>
