<!-- components/design/Molecules/Cells/Link.vue -->
<template>
  <section>
    <h2>Entity Link Cells</h2>
    <!-- Misebox User Link Cells Group -->
    <div class="group">
      <h3>Misebox User Link Cells</h3>
      <section v-if="miseboxUser && miseboxUser.id">
        <h4>🔹 Misebox User Linked User</h4>
        <OrganismsMiseboxUserLinkMiseboxUserCell :id="miseboxUser.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Misebox User Link content exists.</p>
      </section>
    </div>

    <!-- Chef Link Cells Group -->
    <div class="group">
      <h3>Chef Link Cells</h3>
      <section v-if="kitchen">
        <h4>🔹 Chef Linked Kitchen</h4>
        <OrganismsChefLinkKitchenCell :id="kitchen.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Chef Linked Kitchen content exists.</p>
      </section>
      <section v-if="supplier">
        <h4>🔹 Chef Linked Supplier</h4>
        <OrganismsChefLinkSupplierCell :id="supplier.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Chef Linked Supplier content exists.</p>
      </section>
    </div>

    <!-- Professional Link Cells Group -->
    <div class="group">
      <h3>Professional Link Cells</h3>
      <section v-if="job">
        <h4>🔹 Professional Linked Job</h4>
        <OrganismsProfessionalLinkJobCell :id="job.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Professional Linked Job content exists.</p>
      </section>
    </div>

    <!-- Recruiter Link Cells Group -->
    <div class="group">
      <h3>Recruiter Link Cells</h3>
      <section v-if="job">
        <h4>🔹 Recruiter Linked Job</h4>
        <OrganismsRecruiterLinkJobCell :id="job.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Recruiter Linked Job content exists.</p>
      </section>
      <section v-if="kitchen">
        <h4>🔹 Recruiter Linked Kitchen</h4>
        <OrganismsRecruiterLinkKitchenCell :id="kitchen.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Recruiter Linked Kitchen content exists.</p>
      </section>
      <section v-if="professional">
        <h4>🔹 Recruiter Linked Professional</h4>
        <OrganismsRecruiterLinkProfessionalCell :id="professional.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Recruiter Linked Professional content exists.</p>
      </section>
    </div>

    <!-- Supplier Link Cells Group -->
    <div class="group">
      <h3>Supplier Link Cells</h3>
      <section v-if="ingredient">
        <h4>🔹 Supplier Linked Ingredient</h4>
        <OrganismsSupplierLinkIngredientCell :id="ingredient.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Supplier Linked Ingredient content exists.</p>
      </section>
      <section v-if="kitchen">
        <h4>🔹 Supplier Linked Kitchen</h4>
        <OrganismsSupplierLinkKitchenCell :id="kitchen.id" :isDisabled="true" />
      </section>
      <section v-else>
        <p>No Supplier Linked Kitchen content exists.</p>
      </section>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  miseboxUser: Object,
  chef: Object,
  professional: Object,
  recruiter: Object,
  supplier: Object,
  kitchen: Object,
  ingredient: Object,
  job: Object
});
</script>
