<!-- components/design/Molecules/Cells/Entity.vue -->
<template>
  <section>
    <h2>Main Entity Cells</h2>
    
    <!-- Misebox User Group -->
    <div class="group">
      <h3>Misebox User Cells</h3>
      <section v-if="miseboxUser">
        <h4>🔹 Misebox User Cell (Current)</h4>
        <OrganismsMiseboxUserCell :miseboxUser="miseboxUser" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Misebox User content exists (Current).</p>
      </section>
      <section v-if="otherMiseboxUser">
        <h4>🔹 Misebox User Cell (Other)</h4>
        <OrganismsMiseboxUserCell :miseboxUser="otherMiseboxUser" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Misebox User content exists (Other).</p>
      </section>
    </div>
    
    <!-- Chef Group -->
    <div class="group">
      <h3>Chef Cells</h3>
      <section v-if="chef">
        <h4>🔹 Chef Cell (Current)</h4>
        <OrganismsChefCell :chef="chef" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Chef content exists (Current).</p>
      </section>
      <section v-if="otherChef">
        <h4>🔹 Chef Cell (Other)</h4>
        <OrganismsChefCell :chef="otherChef" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Chef content exists (Other).</p>
      </section>
    </div>
    
    <!-- Professional Group -->
    <div class="group">
      <h3>Professional Cells</h3>
      <section v-if="professional">
        <h4>🔹 Professional Cell (Current)</h4>
        <OrganismsProfessionalCell :professional="professional" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Professional content exists (Current).</p>
      </section>
      <section v-if="otherProfessional">
        <h4>🔹 Professional Cell (Other)</h4>
        <OrganismsProfessionalCell :professional="otherProfessional" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Professional content exists (Other).</p>
      </section>
    </div>
    
    <!-- Recruiter Group -->
    <div class="group">
      <h3>Recruiter Cells</h3>
      <section v-if="recruiter">
        <h4>🔹 Recruiter Cell (Current)</h4>
        <OrganismsRecruiterCell :recruiter="recruiter" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Recruiter content exists (Current).</p>
      </section>
      <section v-if="otherRecruiter">
        <h4>🔹 Recruiter Cell (Other)</h4>
        <OrganismsRecruiterCell :recruiter="otherRecruiter" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Recruiter content exists (Other).</p>
      </section>
    </div>
    
    <!-- Supplier Group -->
    <div class="group">
      <h3>Supplier Cells</h3>
      <section v-if="supplier">
        <h4>🔹 Supplier Cell (Current)</h4>
        <OrganismsSupplierCell :supplier="supplier" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Supplier content exists (Current).</p>
      </section>
      <section v-if="otherSupplier">
        <h4>🔹 Supplier Cell (Other)</h4>
        <OrganismsSupplierCell :supplier="otherSupplier" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Supplier content exists (Other).</p>
      </section>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  miseboxUser: Object,
  otherMiseboxUser: Object,
  chef: Object,
  otherChef: Object,
  professional: Object,
  otherProfessional: Object,
  recruiter: Object,
  otherRecruiter: Object,
  supplier: Object,
  otherSupplier: Object
});
</script>
