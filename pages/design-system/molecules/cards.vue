<!-- pages/design-system/molecules/cards.vue -->
<template>
  <client-only>
    <div class="design-container">
      <DesignSideMenu />
      <main class="main-content">
        <h1>Design System: Cards</h1>
        <div class="card-list">
          <div class="card-group">
            <h2>User Card</h2>
            <OrganismsMiseboxUserCard />
          </div>
          <div class="card-group">
            <h2>Chef Card</h2>
            <OrganismsChefCard />
          </div>
          <div class="card-group">
            <h2>Professional Card</h2>
            <OrganismsProfessionalCard />
          </div>
          <div class="card-group">
            <h2>Recruiter Card</h2>
            <OrganismsRecruiterCard />
          </div>
          <div class="card-group">
            <h2>Supplier Card</h2>
            <OrganismsSupplierCard />
          </div>
          <div class="card-group" v-if="kitchen">
            <h2>Kitchen Card</h2>
            hello
            <OrganismsKitchenCard :kitchen="kitchen" />
          </div>
          <!-- Ingredient Card Group (object card) -->
          <div class="card-group" v-if="ingredient && ingredient.id">
            <h2>Ingredient Card</h2>
            <OrganismsIngredientCard :ingredient="ingredient" />
          </div>
          <!-- Job Card Group (object card) -->
          <div class="card-group" v-if="job && job.id">
            <h2>Job Card</h2>
            <OrganismsJobCard :job="job" />
          </div>
        </div>
      </main>
    </div>
  </client-only>
</template>

<script setup>
const kitchenId = "fAw7kjlXqTCe7MAa1hqR";
const ingredientId = "YiEySWR2eEsadcoYsCLz";
const jobId = "O9EWwZgDJrHdoV1jg95s";

const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(kitchenId);

const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(ingredientId);

const { fetchJob } = useJob();
const job = fetchJob(jobId);
</script>

<style scoped>
.design-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
}
</style>
