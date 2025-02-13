<!-- components/organisms/Supplier/search/Search.vue -->
<template>
  <div class="entity-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a supplier..."
      class="editable-input"
    />
    <transition name="dropdown">
      <div class="dropdown search-dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectSupplier(result)"
          class="supplier-cell-wrapper"
        >
          <OrganismsSupplierCell :supplier="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Use the supplier search composable; note that fetchFirestorePlaceIds is no longer used.
const {
  searchQuery,
  mergedResults,
  searchFirestore,
  searchGoogle,
  clearSearch
} = useSupplierSearch(miseboxUser.location);

const emits = defineEmits(["select-supplier"]);

const handleSelectSupplier = (supplier) => {
  emits("select-supplier", supplier);
  clearSearch(); // Clear the search after selection
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};

</script>
