<!-- components/organisms/Kitchen/Create.vue -->
<template>
  <div class="entity-create">
    <section v-if="mode === 'search'" class="creation-section">
      <OrganismsKitchenSearch @select-kitchen="handleSelection" />
      <div v-if="show === 'found'" class="entity-cell-wrapper">
        <OrganismsKitchenCell :kitchen="kitchen" :isDisabled="true" />
        <XCircleIcon class="icon-clear" @click="clearSelection" />
      </div>
      <p v-if="show === 'searching'" class="fallback-option">
        Can't find the kitchen?
        <button class="btn-underline" @click="toggleManualMode">Enter Manually</button>
      </p>
    </section>

    <!-- Manual Mode -->
    <section v-else-if="mode === 'manual'" class="creation-section">
      <MoleculesFormsSingleFieldLocal
        id="kitchenName"
        placeholder="Enter the Kitchen name"
        v-model="kitchen.name"
      />
      <div class="centered-button">
        <button class="btn btn-secondary" @click="toggleManualMode">Back to Search</button>
      </div>
    </section>

    <!-- Action Button -->
    <section v-if="hasData" class="button-section">
      <button class="btn" @click="handleProcessKitchen">
        {{ buttonText }}
      </button>
    </section>
  </div>
</template>

<script setup>
const kitchen = ref({});
const mode = ref("search");
const router = useRouter();
const { processKitchen } = useKitchenCreate();

const hasData = computed(() => {
  return kitchen.value && (kitchen.value.name || Object.keys(kitchen.value).length > 0);
});

const show = computed(() => {
  return kitchen.value?.source === "firestore" || kitchen.value?.source === "google"
    ? "found"
    : "searching";
});

const buttonText = computed(() => {
  if (mode.value === "manual") {
    return "Create Kitchen";
  } else {
    if (kitchen.value.source === "google") {
      return "Save Selected Kitchen";
    } else if (kitchen.value.source === "firestore") {
      return "Join Kitchen";
    } else {
      return "Save Kitchen";
    }
  }
});

function handleSelection(selectedKitchen) {
  clearSelection();
  kitchen.value = selectedKitchen;
}

function clearSelection() {
  kitchen.value = {};
}

function toggleManualMode() {
  if (mode.value === "search") {
    mode.value = "manual";
    kitchen.value.source = "manual";
  } else {
    clearSelection();
    mode.value = "search";
  }
}

async function handleProcessKitchen() {
  try {
const kitchenid = await processKitchen(kitchen.value)
router.push(`/kitchens/${kitchenid}`);
} catch (error) {
    console.error("[KitchenCreate] Error processing kitchen:", error.message);
  }
}
</script>
