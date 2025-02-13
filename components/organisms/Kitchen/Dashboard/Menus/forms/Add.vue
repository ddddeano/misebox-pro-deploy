<template>
  <div class="menus-add">
    <h3>Add a New Menu</h3>
    <OrganismsKitchenDashboardMenusFormsMeta v-model="menuMeta" />

    <div class="menu-sections">
      <!-- Render each section -->
      <div v-for="(section, index) in menuSections" :key="index">
        <OrganismsKitchenDashboardMenusFormsSection v-model="menuSections[index]" />
      </div>
      <!-- Plus icon to add a new section -->
      <button type="button" class="btn btn-outline add-section-btn" @click="addSection">
        <PlusIcon class="icon" /> Add New Section
      </button>
    </div>

    <button @click="handleAddMenu" class="btn btn-primary btn-submit">
      Publish
    </button>
  </div>
</template>

<script setup>
    const { updateKitchen } = useKitchen();

const route = useRoute();
const kitchenId = route.params.kitchenId;

// Menu meta data state.
const menuMeta = ref({
  name: "",
  description: "",
  frequency: "daily",
});

// Menu sections state – each section has a name and an array of items.
const menuSections = ref([
  {
    sectionName: "",
    items: [
      { name: "" },
      { name: "" }
    ],
  },
]);

// Function to add a new section.
const addSection = () => {
  menuSections.value.push({
    sectionName: "",
    items: [{ name: "" }, { name: "" }],
  });
};

// On submit, combine meta and sections into a single menu object.
const handleAddMenu = async () => {
  if (!menuMeta.value.name.trim()) return;
  const newMenu = {
    ...menuMeta.value,
    sections: menuSections.value,
  };
  try {
    await updateKitchen({ kitchenId, menu: newMenu });
    resetFields();
  } catch (error) {
    console.error("Error adding menu:", error);
  }
};

// Reset fields to default values.
const resetFields = () => {
  menuMeta.value = { name: "", description: "", frequency: "daily" };
  menuSections.value = [{
    sectionName: "",
    items: [{ name: "" }, { name: "" }],
  }];
};
</script>

<style scoped>
.menus-add {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}

.menu-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  margin-bottom: var(--spacing-l);
}

.add-section-btn {
  align-self: flex-start;
}
</style>
