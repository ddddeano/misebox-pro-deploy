// composables/Utils/search/useFirestoreMergeSearch.js
// File: composables/Utils/search/useFirestoreMergeSearch.js
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useFirestoreMergeSearch = (collectionName) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, collectionName);
  const firestoreResults = ref([]);
  const firestorePlaceIds = ref([]);

  const searchFirestore = async (query) => {
    if (!query || query.trim().length < 2) { // Allow 2+ characters
      console.log("[searchFirestore] Query too short. Clearing results.");
      firestoreResults.value = [];
      return;
    }
    const normalizedQuery = query.trim().toLowerCase();
    try {
      const querySnapshot = await getDocs(collectionRef);
      console.log(`[searchFirestore] Found ${querySnapshot.docs.length} documents in ${collectionName}`);
      firestoreResults.value = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data(), source: "firestore" }))
        .filter(result => {
          if (!result.search_terms) return false;
          if (Array.isArray(result.search_terms)) {
            return result.search_terms.some(term => term.toLowerCase().includes(normalizedQuery));
          }
          if (typeof result.search_terms === "string") {
            return result.search_terms.toLowerCase().includes(normalizedQuery);
          }
          return false;
        });
      console.log(`[searchFirestore] Returning ${firestoreResults.value.length} filtered results.`);
    } catch (error) {
      console.error(`[searchFirestore] Error in ${collectionName}:`, error);
    }
  };

  return {
    firestoreResults,
    firestorePlaceIds,
    searchFirestore,
  };
};
