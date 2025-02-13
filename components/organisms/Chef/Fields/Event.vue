<!-- components/organisms/Chef/Fields/Event.vue -->
<template>
  <div>
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      <MoleculesProfileDisplay
        :items="[
          `Name: ${event.name || 'N/A'}`,
          `Date: ${event.date || 'N/A'}`,
          `Location: ${event.location || 'N/A'}`,
          event.description || 'No description provided'
        ]"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      <!-- Event Name -->
      <div>
        <label>Event Name</label>
        <input type="text" v-model="localData.name" placeholder="Enter event name" />
      </div>

      <!-- Event Date -->
      <div>
        <label>Date</label>
        <input type="date" v-model="localData.date" />
      </div>

      <!-- Event Location -->
      <div>
        <label>Location</label>
        <input type="text" v-model="localData.location" placeholder="Enter location" />
      </div>

      <!-- Event Description -->
      <div>
        <label>Description</label>
        <textarea v-model="localData.description" placeholder="Add a description"></textarea>
      </div>

      <!-- Action Button -->
      <button @click="submitCreate">Save</button>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'">
      <MoleculesProfileDisplay
        :items="[
          `Name: ${event.name || 'N/A'}`,
          `Date: ${event.date || 'N/A'}`,
          `Location: ${event.location || 'N/A'}`,
          event.description || 'No description provided'
        ]"
      />
      <button @click="submitDelete">Delete</button>
    </div>
  </div>
</template>

<script setup>
const { addChefArrayItem, removeChefArrayItem } = useChef();

const props = defineProps({
  event: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
});

const localData = ref({
  ...props.event,
});

// Create a new event entry
async function submitCreate() {
  try {
    await addChefArrayItem("events", localData.value);
    console.log("Event added successfully.");
  } catch (error) {
    console.error("Error adding event:", error);
  }
}

// Delete an event entry
async function submitDelete() {
  try {
    await removeChefArrayItem("events", props.index);
    console.log("Event deleted successfully.");
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}
</script>
