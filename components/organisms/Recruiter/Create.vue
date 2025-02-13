<!-- components/organisms/Recruiter/Create.vue -->
<template>
  <div class="entity-create">
    <!-- Search Mode -->
    <section v-if="mode === 'search'" class="creation-section">
      <OrganismsRecruiterSearch @select-recruiter="handleSelection" />
      <div v-if="show === 'found'" class="entity-cell-wrapper">
        <OrganismsRecruiterCell :recruiter="recruiter" :isDisabled="true" />
        <XCircleIcon class="icon-clear" @click="clearSelection" />
      </div>
      <p v-if="show === 'searching'" class="fallback-option">
        Can't find the recruiter?
        <button class="btn-underline" @click="toggleManualMode">Enter Manually</button>
      </p>
    </section>

    <!-- Manual Mode -->
    <section v-else-if="mode === 'manual'" class="creation-section">
      <MoleculesFormsSingleFieldLocal
        id="recruiterName"
        placeholder="Enter the Recruiter Company name"
        v-model="recruiter.name"
      />
      <div class="centered-button">
        <button class="btn btn-secondary" @click="toggleManualMode">Back to Search</button>
      </div>
    </section>

    <section v-if="hasData" class="button-section">
      <button class="btn" @click="handleProcessRecruiter">
        {{ buttonText }}
      </button>
    </section>
  </div>
</template>

<script setup>
const recruiter = ref({});
const mode = ref("search");
const router = useRouter();
const { processRecruiter } = useRecruiterCreate();

const hasData = computed(() => {
  return recruiter.value && (recruiter.value.name || Object.keys(recruiter.value).length > 0);
});

const show = computed(() => {
  return recruiter.value?.source === "firestore" || recruiter.value?.source === "google"
    ? "found"
    : "searching";
});

const buttonText = computed(() => {
  if (mode.value === "manual") {
    return "Create Recruiter";
  } else {
    if (recruiter.value.source === "google") {
      return "Save Selected Recruiter";
    } else if (recruiter.value.source === "firestore") {
      return "Join Recruiter";
    } else {
      return "Save Recruiter";
    }
  }
});

const handleSelection = (selectedRecruiter) => {
  clearSelection();
  recruiter.value = selectedRecruiter;
};

const clearSelection = () => {
  recruiter.value = {};
};

function toggleManualMode() {
  if (mode.value === "search") {
    mode.value = "manual";
    recruiter.value.source = "manual";
  } else {
    clearSelection();
    mode.value = "search";
  }
}

async function handleProcessRecruiter() {
  try {
    const recruiterId = await processRecruiter(recruiter.value);
    router.push(`/recruiters/${recruiterId}`);
  } catch (error) {
    console.error("[RecruiterCreate] Error processing recruiter:", error.message);
  }
}
</script>

