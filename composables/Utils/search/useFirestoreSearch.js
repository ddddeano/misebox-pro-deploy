// composables/Utils/search/useFirestoreSearch.js
// File: composables/Utils/search/useFirestoreSearch.js
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useFirestoreSearch = (collectionName) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, collectionName);
  const results = ref([]);

  const searchFirestore = async (query) => {
    if (!query || query.trim().length < 3) {
      results.value = [];
      return;
    }
    const normalizedQuery = query.trim().toLowerCase();
    try {
      const querySnapshot = await getDocs(collectionRef);
      const mappedResults = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        source: "firestore",
      }));
      results.value = mappedResults.filter(result => {
        if (!result.search_terms) return false;
        if (Array.isArray(result.search_terms)) {
          return result.search_terms.some(term => term.toLowerCase().includes(normalizedQuery));
        }
        if (typeof result.search_terms === "string") {
          return result.search_terms.toLowerCase().includes(normalizedQuery);
        }
        return false;
      });
    } catch (error) {
      console.error(`[searchFirestore] Error in ${collectionName}:`, error);
    }
  };

  return {
    results,
    searchFirestore,
  };
};
