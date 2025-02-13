<!-- components/organisms/Kitchen/search/Search.vue -->
<!-- File: components/organisms/Kitchen/search/Search.vue -->
<template>
  <div class="kitchen-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a kitchen..."
      class="editable-input"
    />
    <transition name="dropdown-transistion">
      <div class="dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectKitchen(result)"
          class="kitchen-cell-wrapper"
        >
          <OrganismsKitchenCell :kitchen="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Kitchen search composable
const {
  searchQuery,
  mergedResults,
  searchFirestore,
  searchGoogle,
  clearSearch,
} = useKitchenSearch(miseboxUser.location);

const emits = defineEmits(["select-kitchen"]);

const handleSelectKitchen = (kitchen) => {
  emits("select-kitchen", kitchen);
  clearSearch(); // Clear the search when a kitchen is selected
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};

// ✅ Load Google Maps only when search is mounted (Client-side)
onMounted(async () => {
  if (process.server) return; // Prevent SSR execution

  try {
    await loadGoogleMapsScript();
    console.log("✅ Google Maps is ready to use!");
  } catch (error) {
    console.error("❌ Error loading Google Maps:", error);
  }
});
</script>
