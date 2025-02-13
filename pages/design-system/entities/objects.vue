<!-- pages/design-system/entities/objects.vue -->
<template>
  <div class="design-container">
    <DesignSideMenu />
    <div class="tabs-container">
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tab-button', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="tab-content">
        <!-- Kitchen -->
        <template v-if="activeTab === 'kitchen' && kitchen">
          <!-- <OrganismsKitchenEdit :kitchen="kitchen" /> -->

          <div class="copy-container">
            <span>"components/organisms/Kitchen/Edit.vue"</span>
            <span>"components/organisms/Kitchen/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Kitchen/Edit.vue\ncomponents/organisms/Kitchen/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(kitchenWithTeam)">Copy Kitchen Data</button>
          <pre>{{ formatJson(kitchenWithTeam) }}</pre>

          <OrganismsKitchenView :kitchen="kitchen" />
        </template>

        <!-- Ingredient -->
        <template v-if="activeTab === 'ingredient' && ingredient">
          <OrganismsIngredientEdit :ingredient="ingredient" />
          <div class="copy-container">
            <span>"components/organisms/Ingredient/Edit.vue"</span>
            <span>"components/organisms/Ingredient/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Ingredient/Edit.vue\ncomponents/organisms/Ingredient/View.vue')">
              Copy Paths
            </button>
          </div>
          <button @click="copyToClipboard(ingredient)">Copy Ingredient Data</button>
          <pre>{{ formatJson(ingredient) }}</pre>
          <OrganismsIngredientView :ingredient="ingredient" />
        </template>

        <!-- Job -->
        <template v-if="activeTab === 'job' && job">
          <OrganismsJobEdit :job="job" />
          <div class="copy-container">
            <span>"components/organisms/Job/Edit.vue"</span>
            <span>"components/organisms/Job/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Job/Edit.vue\ncomponents/organisms/Job/View.vue')">
              Copy Paths
            </button>
          </div>
          <button @click="copyToClipboard(job)">Copy Job Data</button>
          <pre>{{ formatJson(job) }}</pre>
          <OrganismsJobView :job="job" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDocs, collection } from "firebase/firestore";
import { useFirestore } from "vuefire";

const db = useFirestore();
const tabs = ["kitchen", "ingredient", "job"];
const activeTab = ref(tabs[0]);

// Hardcoded document IDs
const kitchenId = "fAw7kjlXqTCe7MAa1hqR";
const ingredientId = "3COhy9KZU5yelq08HvZx";
const jobId = "O9EWwZgDJrHdoV1jg95s";

// Fetch Kitchen Data
const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(kitchenId);
const team = ref([]);

onMounted(async () => {
  kitchen.value = await fetchKitchen(kitchenId);
  await fetchTeamMembers();
});

// Fetch Team Members
const fetchTeamMembers = async () => {
  if (!kitchen.value) return;

  try {
    const teamCollection = collection(db, `kitchens/${kitchenId}/team`);
    const querySnapshot = await getDocs(teamCollection);
    team.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(`[fetchTeamMembers] Retrieved ${team.value.length} team members`);
  } catch (error) {
    console.error("[fetchTeamMembers] Error:", error);
  }
};

// Combine Kitchen and Team Data (Preventing Cyclic References)
const kitchenWithTeam = computed(() => {
  return JSON.parse(
    JSON.stringify({
      kitchen: kitchen.value,
      team: team.value
    })
  );
});

// Fetch Ingredient Data
const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(ingredientId);

// Fetch Job Data
const { fetchJob } = useJob();
const job = fetchJob(jobId);

// Format JSON with indentation for better readability
const formatJson = (data) => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error formatting JSON:", error);
    return "{}";
  }
};

// Copy JSON to clipboard
const copyToClipboard = async (data) => {
  try {
    await navigator.clipboard.writeText(formatJson(data));
    console.log("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

// Copy text (paths) to clipboard
const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Component paths copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy paths:", err);
  }
};
</script>

<style scoped>
.design-container {
  display: flex;
}

.tabs-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.tab-bar {
  display: flex;
  gap: var(--spacing-m);
  padding: var(--spacing-s);
  background: var(--background-2);
  border-bottom: 1px solid var(--border);
}

.tab-button {
  padding: var(--spacing-s) var(--spacing-m);
  border: none;
  background: none;
  cursor: pointer;
  font-size: var(--font-size-m);
  font-weight: bold;
  color: var(--text-secondary);
}

.tab-button.active {
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary);
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: var(--spacing-m);
}

pre {
  background: var(--background-2);
  padding: var(--spacing-s);
  border-radius: var(--radius-s);
  font-size: var(--font-size-s);
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.copy-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  background: var(--background-2);
  border-radius: var(--radius-s);
  font-size: var(--font-size-s);
}

button {
  padding: 8px 12px;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 5px;
}

button:hover {
  background-color: var(--primary-hover);
}
</style>
