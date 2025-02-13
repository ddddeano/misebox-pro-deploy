<!-- components/molecules/places/Search.vue -->
<!-- File: components/molecules/places/Search.vue -->
<template>
  <div class="places-search">
    <!-- Search Input -->
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      :placeholder="placeholder"
      class="editable-input"
    />

    <!-- Dropdown Results -->
    <transition name="dropdown-transition">
      <div class="dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectPlace(result)"
          class="place-cell-wrapper"
        >
          <!-- Display each result using MoleculesPlacesCell -->
          <MoleculesPlacesCell :place="result" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Define default keywords for a kitchen search (adjust as needed)
const keywords = [
  "Kitchen",
  "Restaurant",
  "Commercial Kitchen",
  "Home Kitchen",
  "Private Kitchen"
];

// Get the current user's location from your miseboxUser composable.
const { currentMiseboxUser } = useMiseboxUser();
// Provide a fallback location if needed.
const userLocation = currentMiseboxUser.value?.location || { lat: 46.948, lng: 7.4474 };

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search for a place..."
  }
});

const emits = defineEmits(["select-place"]);

// Initialize the merged search composable for the "kitchens" collection.
// This composable returns searchQuery, mergedResults (Firestore + Google),
// as well as functions to trigger a search and clear results.
const { searchQuery, mergedResults, searchGoogle, clearSearch } = useFirestoreGoogleMergeSearch(
  "kitchens",
  keywords,
  userLocation
);

const handleSelectPlace = (place) => {
  emits("select-place", place);
  clearSearch();
};

const performSearch = async () => {
  await searchGoogle();
};
</script>

<style>
.places-search{
  width: 100%;
}
</style>