import { ref } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useIngredientSearch = () => {
  // Reactive variables for query and results.
  const searchQuery = ref("");
  const results = ref([]);
  
  // Get Firestore instance and reference the "ingredients" collection.
  const firestore = useFirestore();
  const ingredientsCollection = collection(firestore, "ingredients");

  /**
   * Search the "ingredients" collection.
   * - If the query is less than 3 characters, clear the results.
   * - Otherwise, fetch all documents and filter them by matching the 'search_terms' field (or fallback to 'name').
   */
  const searchFirestore = async (query) => {
    const queryText = query ? query.trim() : "";
    if (queryText.length < 3) {
      results.value = [];
      return;
    }
    const normalizedQuery = queryText.toLowerCase();
    try {
      const querySnapshot = await getDocs(ingredientsCollection);
      const allResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        source: "firestore",
      }));
      results.value = allResults.filter((item) => {
        let fieldToSearch = "";
        if (item.search_terms && item.search_terms.trim().length > 0) {
          fieldToSearch = item.search_terms;
        } else if (item.name && item.name.trim().length > 0) {
          fieldToSearch = item.name;
        }
        return fieldToSearch.toLowerCase().includes(normalizedQuery);
      });
    } catch (error) {
      console.error("[searchFirestore] Error searching Firestore:", error);
    }
  };

  // Simple function to clear search results.
  const clearSearch = () => {
    results.value = [];
  };

  return {
    searchQuery,
    searchResults: results,
    searchFirestore,
    clearSearch,
  };
};
