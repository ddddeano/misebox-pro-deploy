<!-- components/design/Molecules/Cells/Object.vue -->
<template>
  <section>
    <h2>Object Cells</h2>
    <!-- Kitchen Cells Group -->
    <div class="group">
      <h3>Kitchen Cells</h3>
      <section v-if="kitchen">
        <h4>🔹 Kitchen Cell</h4>
        <OrganismsKitchenCell :kitchen="kitchen" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Kitchen content exists.</p>
      </section>
    </div>

    <!-- Ingredient Cells Group -->
    <div class="group">
      <h3>Ingredient Cells</h3>
      <section v-if="ingredient">
        <h4>🔹 Ingredient Cell</h4>
        <OrganismsIngredientCell :ingredient="ingredient" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Ingredient content exists.</p>
      </section>
    </div>
    
    <!-- Job Cells Group -->
    <div class="group">
      <h3>Job Cells</h3>
      <section v-if="job">
        <h4>🔹 Job Cell (Current)</h4>
        <OrganismsJobCell :job="job" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Job content exists (Current).</p>
      </section>
    </div>
  </section>
</template>

<script setup>
// For objects, use hard-coded IDs.
const kitchenId = "xV1TjtJLNEffDco6NTWs";
const ingredientId = "YiEySWR2eEsadcoYsCLz";
const jobId = "O9EWwZgDJrHdoV1jg95s";

const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(kitchenId);

const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(ingredientId);

const { fetchJob } = useJob();
const job = fetchJob(jobId);
</script>
