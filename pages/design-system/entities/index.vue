<!-- pages/design-system/entities/index.vue -->
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

      <div class="tab-content page">
        <!-- Misebox User -->
        <template v-if="activeTab === 'MiseboxUser' && miseboxUser">
          <OrganismsMiseboxUserEdit />
          
          <div class="copy-container">
            <span>"components/organisms/MiseboxUser/Edit.vue"</span>
            <span>"components/organisms/MiseboxUser/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/MiseboxUser/Edit.vue\ncomponents/organisms/MiseboxUser/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(miseboxUser)">Copy User Data</button>
          <pre>{{ formatJson(miseboxUser) }}</pre>

          <OrganismsMiseboxUserView :miseboxUser="miseboxUser" />
        </template>

        <!-- Chef -->
        <template v-if="activeTab === 'Chef' && chef">
          <OrganismsChefEdit />

          <div class="copy-container">
            <span>"components/organisms/Chef/Edit.vue"</span>
            <span>"components/organisms/Chef/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Chef/Edit.vue\ncomponents/organisms/Chef/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(chef)">Copy User Data</button>
          <pre>{{ formatJson(chef) }}</pre>

          <OrganismsChefView :chef="chef" />
        </template>

        <!-- Professional -->
        <template v-if="activeTab === 'Professional' && professional">
          <OrganismsProfessionalEdit />

          <div class="copy-container">
            <span>"components/organisms/Professional/Edit.vue"</span>
            <span>"components/organisms/Professional/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Professional/Edit.vue\ncomponents/organisms/Professional/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(professional)">Copy User Data</button>
          <pre>{{ formatJson(professional) }}</pre>

          <OrganismsProfessionalView :professional="professional" />
        </template>

        <!-- Recruiter -->
        <template v-if="activeTab === 'Recruiter' && recruiter">
          <OrganismsRecruiterEdit />

          <div class="copy-container">
            <span>"components/organisms/Recruiter/Edit.vue"</span>
            <span>"components/organisms/Recruiter/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Recruiter/Edit.vue\ncomponents/organisms/Recruiter/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(recruiter)">Copy User Data</button>
          <pre>{{ formatJson(recruiter) }}</pre>

          <OrganismsRecruiterView :recruiter="recruiter" />
        </template>

        <!-- Supplier -->
        <template v-if="activeTab === 'Supplier' && supplier">
          <OrganismsSupplierEdit />

          <div class="copy-container">
            <span>"components/organisms/Supplier/Edit.vue"</span>
            <span>"components/organisms/Supplier/View.vue"</span>
            <button @click="copyTextToClipboard('components/organisms/Supplier/Edit.vue\ncomponents/organisms/Supplier/View.vue')">
              Copy Paths
            </button>
          </div>

          <button @click="copyToClipboard(supplier)">Copy User Data</button>
          <pre>{{ formatJson(supplier) }}</pre>

          <OrganismsSupplierView :supplier="supplier" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["MiseboxUser", "Chef", "Professional", "Recruiter", "Supplier"];
const activeTab = ref(tabs[0]);

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();
const { currentProfessional: professional } = useProfessional();
const { currentRecruiter: recruiter } = useRecruiter();
const { currentSupplier: supplier } = useSupplier();

// Format JSON with indentation for better readability
const formatJson = (data) => JSON.stringify(data, null, 2);

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
