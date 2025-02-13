// composables/Utils/usePaginatedCollection.js
import { query, where, limit, startAfter, collection, getDocs } from "firebase/firestore";
import { useFirestore } from "vuefire";

export function usePaginatedCollection(collectionName, pageSize, filters = {}) {
  const db = useFirestore();

  const items = ref([]);
  const lastVisible = ref(null);
  const isLoading = ref(false);
  const hasMore = ref(true);

  const fetchItems = async () => {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;

    try {
      let constraints = [limit(pageSize)];

      // Apply filters
      if (filters.excludeIds && filters.excludeIds.length) {
        constraints.push(where("id", "not-in", filters.excludeIds.slice(0, 10))); // Firestore limits to 10
      }

      // Handle pagination
      if (lastVisible.value) {
        constraints.push(startAfter(lastVisible.value));
      }

      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update pagination state
        lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Append new items
        items.value.push(...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } else {
        hasMore.value = false;
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    items,
    fetchItems,
    isLoading,
    hasMore,
  };
}
