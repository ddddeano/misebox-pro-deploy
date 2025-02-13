<!-- components/molecules/dialogues/ChoiceForm.vue -->
<!-- components/ChoiceForm.vue -->
<template>
  <div class="choice-form">
    <!-- Team Selection -->
    <div class="form-section">
      <label class="form-label">Team</label>
      <div class="radio-group">
        <label class="radio-option">
          <input
            type="radio"
            name="team"
            value="alumni"
            v-model="choice.team"
            @change="handleTeamChange"
          />
          Alumni
        </label>
        <label class="radio-option">
          <input
            type="radio"
            name="team"
            value="current"
            v-model="choice.team"
            @change="handleTeamChange"
          />
          Current
        </label>
      </div>
    </div>

    <!-- Chef Interaction -->
    <div v-if="choice.team === 'current'" class="chef-interaction">
      <pre>{{ chef ? 'Chef Profile Found' : 'No Chef Profile' }}</pre>
      <div>
        <p v-if="chef">
          You have a chef profile. Would you like to add this kitchen to your
          kitchens?
        </p>
        <p v-else>
          You do not have a chef profile. Would you like to create one and add
          this kitchen to it?
        </p>

        <div class="interaction-actions">
          <button v-if="chef" class="btn-primary" @click="addToChefKitchens">
            Add to Kitchens
          </button>
          <button v-else class="btn-primary" @click="createChefProfile">
            Create Chef Profile
          </button>
          <button class="btn-link" @click="skipInteraction">Skip</button>
        </div>
      </div>
    </div>

    <!-- Role -->
    <div class="form-section">
      <label for="role" class="form-label">Role</label>
      <input
        id="role"
        type="text"
        v-model="choice.role"
        class="editable-input"
        placeholder="Enter role"
      />
    </div>

    <!-- Responsibilities -->
    <div class="form-section">
      <label for="responsibilities" class="form-label">Responsibilities</label>
      <textarea
        id="responsibilities"
        v-model="choice.responsibilities"
        class="editable-textarea"
        placeholder="Describe your responsibilities"
      ></textarea>
    </div>

    <!-- From Date -->
    <div class="form-section">
      <label class="form-label">From</label>
      <MoleculesFormsMonthAndYearSelector
        :month="choice.from_month"
        :year="choice.from_year"
        @update:month="(newMonth) => (choice.from_month = newMonth)"
        @update:year="(newYear) => (choice.from_year = newYear)"
      />
    </div>

    <!-- To Date -->
    <div v-if="choice.team !== 'current'" class="form-section">
      <label class="form-label">To</label>
      <MoleculesFormsMonthAndYearSelector
        :month="choice.to_month"
        :year="choice.to_year"
        @update:month="(newMonth) => (choice.to_month = newMonth)"
        @update:year="(newYear) => (choice.to_year = newYear)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  choice: {
    type: Object,
    required: true,
  },
  interaction: {
    type: Object,
    required: true,
  },
})

// Chef Hooks
const { currentChef: chef, addKitchenToChef, createChef } = useChef()

// Methods
const handleTeamChange = () => {
  console.log('[ChoiceForm] Team changed:', choice.team)
}

const addToChefKitchens = async () => {
  try {
    console.log('[ChoiceForm] Adding kitchen to chef profile.')
    interaction.addToChefProfile = true
    await addKitchenToChef(interaction.selectedKitchenId)
    console.log('[ChoiceForm] Kitchen added successfully.')
  } catch (error) {
    console.error('[ChoiceForm] Error adding kitchen to chef profile:', error)
  }
}

const createChefProfile = async () => {
  try {
    console.log('[ChoiceForm] Creating chef profile.')
    await createChef()
    console.log('[ChoiceForm] Chef profile created successfully.')
    await addToChefKitchens()
  } catch (error) {
    console.error('[ChoiceForm] Error creating chef profile:', error)
  }
}

const skipInteraction = () => {
  console.log('[ChoiceForm] Skipping chef interaction.')
  interaction.addToChefProfile = false
}
</script>

<style scoped>
.choice-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.form-section {
  margin-bottom: var(--spacing-m);
}

.radio-group {
  display: flex;
  gap: var(--spacing-s);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.radio-option input {
  margin-right: var(--spacing-xs);
}

.chef-interaction {
  margin-top: var(--spacing-m);
  padding: var(--spacing-m);
  background-color: var(--background-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
}

.interaction-actions {
  margin-top: var(--spacing-m);
  display: flex;
  gap: var(--spacing-s);
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-m);
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-link {
  background: none;
  color: var(--text-primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-link:hover {
  text-decoration: none;
}
</style>
