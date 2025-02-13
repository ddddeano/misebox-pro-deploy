<!-- components/molecules/forms/ManualKitchen.vue -->
<template>
  <form class="manual-kitchen-form" @submit.prevent="submitPlace">
    <label>
      Place Name:
      <input type="text" v-model="form.place_name" placeholder="Enter place name" />
    </label>
    <label>
      City:
      <input type="text" v-model="form.city" placeholder="Enter city" />
    </label>
    <label>
      Region:
      <input type="text" v-model="form.region" placeholder="Enter region" />
    </label>
    <label>
      Country:
      <input type="text" v-model="form.country" placeholder="Enter country" />
    </label>
    <div class="form-actions">
      <button type="submit" class="btn">Confirm</button>
      <button type="button" class="btn" @click="resetForm">Cancel</button>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";

// Define emits for the component
const emit = defineEmits(["select-kitchen"]);

// Form object for the UI
const form = ref({
  place_name: "Test Kitchen",
  city: "Test city", // Maps to 'city'
  region: "Test region", // Maps to 'region'
  country: "Test Country", // Maps to 'country'
});

// Compute formatted address from form fields
const computeFormattedAddress = () =>
  [form.value.city, form.value.region, form.value.country]
    .filter(Boolean)
    .join(", ")
    .trim();

// Emit the place object back to the parent on submission
const submitPlace = () => {
  if (!form.value.place_name) {
    alert("Place name is required.");
    return;
  }

  emit("select-kitchen", {
    ...form.value,
    source: "manual",
    formatted_address: computeFormattedAddress(),
  });
};

// Reset form fields
const resetForm = () => {
  form.value = {
    place_name: "",
    city: "",
    region: "",
    country: "",
  };
};
</script>

