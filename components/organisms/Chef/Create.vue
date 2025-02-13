<!-- components/organisms/Chef/Create.vue -->
<template>
  <div class="entity-create">
    <h2>Create Your Chef Profile</h2>
    <div class="input-list">
      <!-- Loop through current specialties -->
      <div v-for="(specialty, index) in chef.specialties" :key="index" class="array-item">
        <input
          v-model="chef.specialties[index]"
          placeholder="Enter a specialty"
          class="editable-input"
        />
        <XCircleIcon
          class="icon"
          @click="removeSpecialty(index)"
        />
      </div>

      <!-- Input for adding a new specialty -->
      <div class="add-item">
        <input
          v-model="newSpecialty"
          placeholder="Add a specialty (e.g., Pastry Chef)"
          class="editable-input"
        />
        <CheckCircleIcon
          class="icon"
          @click="addSpecialty"
        />
      </div>
    </div>
    <button class="btn" @click="processChefProfile">Create Profile</button>
  </div>
</template>

<script setup>

const chef = ref({
  specialties: [],
});
const newSpecialty = ref("");
const { processChef } = useChefCreate();
const router = useRouter();

// Add a new specialty to the array
const addSpecialty = () => {
  if (newSpecialty.value.trim() !== "") {
    chef.value.specialties.push(newSpecialty.value.trim());
    newSpecialty.value = ""; // Clear the input field
  }
};

// Remove a specialty from the array
const removeSpecialty = (index) => {
  chef.value.specialties.splice(index, 1);
};

// Process and save the chef profile
async function processChefProfile() {
  try {
    const chefId = await processChef(chef.value);
    router.push(`/chefs/${chefId}`);
  } catch (error) {
    console.error("[processChefProfile] Error creating chef profile:", error.message);
  }
}
</script>

<style scoped>
.entity-create {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-l);
}

.input-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs); /* Space between items */
}

.array-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.add-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.editable-input {
margin-bottom: 0;
}


</style>
