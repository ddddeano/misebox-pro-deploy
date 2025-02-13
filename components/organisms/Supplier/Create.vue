<!-- components/organisms/Supplier/Create.vue -->
<template>
  <div class="entity-create">
    <!-- Search Mode -->
    <section v-if="mode === 'search'" class="creation-section">
      <OrganismsSupplierSearch @select-supplier="handleSelection" />
      <div v-if="show === 'found'" class="entity-cell-wrapper">
        <OrganismsSupplierCell :supplier="supplier" :isDisabled="true" />
        <XCircleIcon class="icon-clear" @click="clearSelection" />
      </div>
      <p v-if="show === 'searching'" class="fallback-option">
        Can't find the supplier?
        <button class="btn-underline" @click="toggleManualMode">Enter Manually</button>
      </p>
    </section>

    <!-- Manual Mode -->
    <section v-else-if="mode === 'manual'" class="creation-section">
      <MoleculesFormsSingleFieldLocal
        id="supplierName"
        placeholder="Enter the Supplier Company name"
        v-model="supplier.company_name"
      />
      <div class="centered-button">
        <button class="btn btn-secondary" @click="toggleManualMode">Back to Search</button>
      </div>
    </section>

    <!-- Action Button -->
    <section v-if="hasData" class="button-section">
      <button class="btn" @click="handleProcessSupplier">
        {{ buttonText }}
      </button>
    </section>
  </div>
</template>

<script setup>
const supplier = ref({});
const mode = ref("search");
const router = useRouter();
const { processSupplier } = useSupplierCreate();

const hasData = computed(() => {
  return supplier.value && (supplier.value.company_name || Object.keys(supplier.value).length > 0);
});

const show = computed(() => {
  return supplier.value?.source === "firestore" || supplier.value?.source === "google"
    ? "found"
    : "searching";
});

const buttonText = computed(() => {
  if (mode.value === "manual") {
    return "Create Supplier";
  } else {
    if (supplier.value.source === "google") {
      return "Save Selected Supplier";
    } else if (supplier.value.source === "firestore") {
      return "Join Supplier";
    } else {
      return "Save Supplier";
    }
  }
});

const handleSelection = (selectedSupplier) => {
  clearSelection();
  supplier.value = selectedSupplier;
};

const clearSelection = () => {
  supplier.value = {};
};

function toggleManualMode() {
  if (mode.value === "search") {
    mode.value = "manual";
    supplier.value.source = "manual";
  } else {
    clearSelection();
    mode.value = "search";
  }
}

async function handleProcessSupplier() {
  try {
    const supplierId = await processSupplier(supplier.value);
    router.push(`/suppliers/${supplierId}`);
  } catch (error) {
    console.error("[SupplierCreate] Error processing supplier:", error.message);
  }
}
</script>

