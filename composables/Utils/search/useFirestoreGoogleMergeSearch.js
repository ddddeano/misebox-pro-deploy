// composables/Utils/search/useFirestoreGoogleMergeSearch.js
// File: composables/Utils/search/useFirestoreGoogleMergeSearch.js

const DEFAULT_LOCATION = { lat: 51.5074, lng: -0.1278 };

export const useFirestoreGoogleMergeSearch = (collectionName, keywords = [], passedLocation = null) => {
  const radius = 5000; // Default search radius

  // Get current MiseboxUser for fallback
  const { currentMiseboxUser } = useMiseboxUser();

  // Determine valid location: passedLocation > MiseboxUser.location > default
  const validLocation = computed(() => {
    return passedLocation?.lat && passedLocation?.lng
      ? passedLocation
      : currentMiseboxUser?.location?.lat && currentMiseboxUser?.location?.lng
      ? currentMiseboxUser.location
      : DEFAULT_LOCATION;
  });

  // Firestore search logic
  const { firestoreResults, firestorePlaceIds, searchFirestore } = useFirestoreMergeSearch(collectionName);

  // Google search composable (pass validLocation.value)
  const { searchQuery, googleResults, searchGoogle, clearSearch, isSearchingGoogle } = useGoogleSearch(
    keywords,
    validLocation.value,
    radius
  );

  const isSearchingFirestore = ref(false);

  watch(searchQuery, async (newQuery) => {
    if (!newQuery || newQuery.trim().length < 2) {  // Allow 2+ character queries
      console.log("[useFirestoreGoogleMergeSearch] Query too short. Clearing results.");
      firestoreResults.value = [];
      googleResults.value = [];
      return;
    }
    console.log("[useFirestoreGoogleMergeSearch] Searching Firestore...");
    isSearchingFirestore.value = true;
    await searchFirestore(newQuery);
    isSearchingFirestore.value = false;
    if (firestoreResults.value.length < 10) {
      console.log(
        `[useFirestoreGoogleMergeSearch] Firestore has ${firestoreResults.value.length} results. Searching Google with radius ${radius}m...`
      );
      isSearchingGoogle.value = true;
      searchGoogle(newQuery, radius);
    } else {
      console.log("[useFirestoreGoogleMergeSearch] Firestore has sufficient results. Skipping Google search.");
      googleResults.value = [];
    }
  });

  return {
    searchQuery,
    firestoreResults,
    googleResults,
    mergedResults: computed(() => [
      ...firestoreResults.value,
      ...googleResults.value.filter(gResult => !firestorePlaceIds.value.includes(gResult.place_id))
    ]),
    searchFirestore,
    searchGoogle,
    clearSearch,
    isSearchingFirestore,
    isSearchingGoogle,
    validLocation,
  };
};
