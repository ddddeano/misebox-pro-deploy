<!-- pages/[id].vue -->
<template>
  <div class="profile-page">
    <!-- Misebox User -->
    <section v-if="profileData" class="entity-section">
      <h2>Misebox User</h2>
      <pre>{{ JSON.stringify(profileData, null, 2) }}</pre>
    </section>

    <!-- Professional -->
    <section v-if="professionalData" class="entity-section">
      <h2>Professional</h2>
      <pre>{{ JSON.stringify(professionalData, null, 2) }}</pre>
    </section>

    <!-- Chef -->
    <section v-if="chefData" class="entity-section">
      <h2>Chef</h2>
      <pre>{{ JSON.stringify(chefData, null, 2) }}</pre>
    </section>

    <!-- Recruiter -->
    <section v-if="recruiterData" class="entity-section">
      <h2>Recruiter</h2>
      <pre>{{ JSON.stringify(recruiterData, null, 2) }}</pre>
    </section>

    <!-- Supplier -->
    <section v-if="supplierData" class="entity-section">
      <h2>Supplier</h2>
      <pre>{{ JSON.stringify(supplierData, null, 2) }}</pre>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";


// Get the route parameters
const route = useRoute();
const routeId = route.params.id;

// Fetch data using managers
const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional } = useProfessional();
const { fetchChef } = useChef();
const { fetchRecruiter } = useRecruiter();
const { fetchSupplier } = useSupplier();

const profileData = fetchMiseboxUser(routeId);
const professionalData = fetchProfessional(routeId);
const chefData = fetchChef(routeId);
const recruiterData = fetchRecruiter(routeId);
const supplierData = fetchSupplier(routeId);
</script>

<style scoped>
.entity-section {
  margin-bottom: 20px;
}

pre {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  color: #333;
  overflow-x: auto;
}
</style>
