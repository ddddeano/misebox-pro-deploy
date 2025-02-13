// composables/Utils/search/useGoogleSearch.js
import { ref, computed } from 'vue';
import { getValidLocation } from './locationUtils';

export const useGoogleSearch = (passedLocation = null, radius = 5000, miseboxUser = null) => {
  const searchQuery = ref("");
  const googleResults = ref([]);
  const lastSearchedQuery = ref("");
  const isSearchingGoogle = ref(false);

  // Use a computed property to automatically recalc the valid location
  const validLocation = computed(() => {
    return getValidLocation(passedLocation, miseboxUser);
  });

  const { debouncedFunction } = useDebounce(async () => {
    const trimmedQuery = searchQuery.value.trim();
    if (trimmedQuery.length < 3) {
      console.log("[useGoogleSearch] Query too short. Clearing results.");
      googleResults.value = [];
      return;
    }
    if (!validLocation.value?.lat || !validLocation.value?.lng) {
      console.error("[useGoogleSearch] ❌ No valid location! Ensure { lat, lng } is set.");
      return;
    }
    if (trimmedQuery === lastSearchedQuery.value) {
      console.log("[useGoogleSearch] Skipping duplicate query:", trimmedQuery);
      return;
    }
    lastSearchedQuery.value = trimmedQuery;
    isSearchingGoogle.value = true;
    console.log(
      `🌍 [Google API] Searching "${trimmedQuery}" within ${radius}m at (${validLocation.value.lat}, ${validLocation.value.lng})`
    );
    try {
      const google = await loadGoogleMapsScript();
      googleResults.value = await fetchGooglePlacesData(trimmedQuery, google, validLocation.value, radius);
    } catch (error) {
      console.error("[useGoogleSearch] ❌ Error searching Google Places:", error);
    } finally {
      isSearchingGoogle.value = false;
    }
  });

  const searchGoogle = () => {
    if (!validLocation.value?.lat || !validLocation.value?.lng) {
      console.error("[useGoogleSearch] ❌ Cannot search Google Places without valid location.");
      return;
    }
    debouncedFunction();
  };

  const clearSearch = () => {
    searchQuery.value = "";
    googleResults.value = [];
    lastSearchedQuery.value = "";
  };

  return {
    searchQuery,
    googleResults,
    searchGoogle,
    clearSearch,
    isSearchingGoogle,
    validLocation, // For debugging purposes
  };
};
