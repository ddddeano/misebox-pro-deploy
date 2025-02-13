<!-- components/organisms/Professional/Fields/KitchenExperience.vue -->
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
            <!-- Kitchen Image on the right -->
            <div class="image-wrapper">
              <img
                v-if="kitchenExperience.image_url"
                :src="kitchenExperience.image_url"
                alt="Kitchen Image"
                class="profile-display-image"
              />
            </div>
          </div>
          <div v-else class="responsibilities-content">
            <div class="responsibilities">
              {{ kitchenExperience.responsibilities || "No responsibilities listed." }}
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
            <template v-if="!hasSelectedKitchen">
              <MoleculesPlacesSearch
                placeholder="Search or select a kitchen..."
                @select-place="handleSelectKitchen"
              />
            </template>
            <template v-else>
              <MoleculesPlacesCell :place="localData.kitchen" />
            </template>
          </template>
          <template v-else>
            <input
              type="text"
              v-model="localData.kitchen.name"
              placeholder="Enter kitchen name"
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
  kitchenExperience: { type: Object, default: () => ({}) },
  mode: { type: String, required: true, validator: (v) => ["display", "edit", "create"].includes(v) },
  index: { type: Number, default: null }
});

const localData = ref({ ...props.kitchenExperience });
const currentTab = ref("details");
const inputMode = ref("search");

// Computed property: check if a kitchen is selected
const hasSelectedKitchen = computed(() => {
  return localData.value.kitchen && (localData.value.kitchen.name || localData.value.kitchen.place_name);
});

// Computed property for display items using short_address (with a fallback to formatted_address)
const displayItems = computed(() => [
  localData.value.name || localData.value.place_name || "Kitchen Name",
  localData.value.short_address || localData.value.formatted_address || "Address",
  localData.value.role || "Role",
  localData.value.ongoing
    ? `${localData.value.from_month} ${localData.value.from_year} - Present`
    : `${localData.value.from_month} ${localData.value.from_year} - ${localData.value.to_month || "Month"} ${localData.value.to_year || "Year"}`
]);

function handleSelectKitchen(selectedKitchen) {
  localData.value.kitchen = selectedKitchen;
  console.log("Selected kitchen:", selectedKitchen);
}

function clearKitchen() {
  localData.value.kitchen = {};
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
  if (!localData.value.kitchen || !(localData.value.kitchen.name || localData.value.kitchen.place_name)) {
    console.error("Error: No kitchen selected.");
    return;
  }
  const trimmedExperience = {
    from_month: localData.value.from_month?.trim() || null,
    from_year: localData.value.from_year?.trim() || null,
    to_month: localData.value.to_month?.trim() || null,
    to_year: localData.value.to_year?.trim() || null,
    short_address: localData.value.kitchen.short_address?.trim() || localData.value.kitchen.formatted_address?.trim() || null,
    image_url: localData.value.kitchen.image_url?.trim() || null,
    name:
      localData.value.kitchen.name?.trim() ||
      localData.value.kitchen.place_name?.trim() ||
      "Unknown Kitchen",
    place_id: localData.value.kitchen.place_id?.trim() || null,
    ongoing: !!localData.value.ongoing,
    responsibilities: localData.value.responsibilities?.trim() || null,
    role: localData.value.role?.trim() || null,
  };
  console.log("Trimmed experience to submit:", trimmedExperience);
  try {
    await addProfessionalArrayItem("kitchen_experience", trimmedExperience);
    console.log("Kitchen experience added successfully.");
  } catch (error) {
    console.error("Error adding kitchen experience:", error);
  }
}

async function submitDelete() {
  try {
    await removeProfessionalArrayItem("kitchen_experience", props.index);
    console.log("Kitchen experience deleted successfully.");
  } catch (error) {
    console.error("Error deleting kitchen experience:", error);
  }
}
</script>
