<!-- components/organisms/Recruiter/search/Search.vue -->
<template>
  <div class="entity-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a recruiter..."
      class="editable-input"
    />
    <transition name="dropdown">
      <div class="dropdown search-dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectRecruiter(result)"
          class="entity-cell-wrapper"
        >
        
          <OrganismsRecruiterCell :recruiter="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Use the recruiter search composable; again, no need to call fetchFirestorePlaceIds.
const {
  searchQuery,
  mergedResults,
  searchFirestore,
  searchGoogle,
  clearSearch
} = useRecruiterSearch(miseboxUser.location);

const emits = defineEmits(["select-recruiter"]);

const handleSelectRecruiter = (recruiter) => {
  emits("select-recruiter", recruiter);
  clearSearch(); // Clear the search after selection
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};
</script>
