<!-- pages/design-system/molecules/cells.vue -->
<template>
  <div class="design-container">
    <DesignSideMenu />
    <div class="tabs-container">
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="tab-content">
        <DesignMoleculesCellsEntity
          v-if="activeTab === 'Entity'"
          :miseboxUser="miseboxUser"
          :otherMiseboxUser="otherMiseboxUser"
          :chef="chef"
          :otherChef="otherChef"
          :professional="professional"
          :otherProfessional="otherProfessional"
          :recruiter="recruiter"
          :otherRecruiter="otherRecruiter"
          :supplier="supplier"
          :otherSupplier="otherSupplier"
        />
        <DesignMoleculesCellsLink
          v-else-if="activeTab === 'Link'"
          :miseboxUser="miseboxUser"
          :chef="chef"
          :professional="professional"
          :recruiter="recruiter"
          :supplier="supplier"
          :kitchen="kitchen"
          :ingredient="ingredient"
          :job="job"
        />
        <DesignMoleculesCellsObject
          v-else-if="activeTab === 'Object'"
          :kitchen="kitchen"
          :ingredient="ingredient"
          :job="job"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

// Define the tabs.
const tabs = ['Entity', 'Link', 'Object'];
const activeTab = ref(tabs[0]);

// Constant for "other" entity (used for main entities)
const fetchEntity = "FmXuOBGklrcU7K05fiGpS4uGn932";

// Main Entity Fetching using our standard alias for current entities
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const otherMiseboxUser = useMiseboxUser().fetchMiseboxUser(fetchEntity);

const { currentChef: chef } = useChef();
const otherChef = useChef().fetchChef(fetchEntity);

const { currentProfessional: professional } = useProfessional();
const otherProfessional = useProfessional().fetchProfessional(fetchEntity);

const { currentRecruiter: recruiter } = useRecruiter();
const otherRecruiter = useRecruiter().fetchRecruiter(fetchEntity);

const { currentSupplier: supplier } = useSupplier();
const otherSupplier = useSupplier().fetchSupplier(fetchEntity);

// Object Fetching – these IDs are defined here once.
const kitchenId = "4PjtrIVNdV89K1qx71Ct";
const ingredientId = "YiEySWR2eEsadcoYsCLz";
const jobId = "O9EWwZgDJrHdoV1jg95s";

const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(kitchenId);

const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(ingredientId);

const { fetchJob } = useJob();
const job = fetchJob(jobId);

// (For the link cells, you would also need to fetch objects like chefLinkedKitchen, etc.)
// For demonstration, assume these objects are available from similar hooks or are passed in.
</script>

<style scoped>
.design-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
}

/* The side menu is assumed to have its own styling */
.tabs-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.tab-bar {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 1rem;
}

.tab-bar button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
}

.tab-bar button.active {
  border-bottom: 3px solid #007acc;
  font-weight: bold;
  color: #007acc;
}

.tab-content {
  flex: 1;
}
</style>
