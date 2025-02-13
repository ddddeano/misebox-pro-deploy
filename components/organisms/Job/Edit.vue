<!-- components/organisms/Job/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="job">
      <h1>Edit Job: {{ job.title }}</h1>
      </div>
<!-- 
      <MoleculesFormsObjectArray
        label="Job Details"
        :firebaseValue="job.details"
      >
        <template #display="{ item, index }">
          <OrganismsJobFieldsDetails
            :detail="item"
            :index="index"
            :id="job.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsJobFieldsDetails
            :detail="item"
            :index="index"
            :id="job.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsJobFieldsDetails :id="job.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <MoleculesFormsObjectArray
        label="Requirements"
        :firebaseValue="job.requirements"
      >
        <template #display="{ item, index }">
          <OrganismsJobFieldsRequirements
            :requirement="item"
            :index="index"
            :id="job.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsJobFieldsRequirements
            :requirement="item"
            :index="index"
            :id="job.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsJobFieldsRequirements :id="job.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <MoleculesFormsObjectArray
        label="Responsibilities"
        :firebaseValue="job.responsibilities"
      >
        <template #display="{ item, index }">
          <OrganismsJobFieldsResponsibilities
            :responsibility="item"
            :index="index"
            :id="job.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsJobFieldsResponsibilities
            :responsibility="item"
            :index="index"
            :id="job.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsJobFieldsResponsibilities :id="job.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <MoleculesFormsObjectArray
        label="Benefits"
        :firebaseValue="job.benefits"
      >
        <template #display="{ item, index }">
          <OrganismsJobFieldsBenefits
            :benefit="item"
            :index="index"
            :id="job.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsJobFieldsBenefits
            :benefit="item"
            :index="index"
            :id="job.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsJobFieldsBenefits :id="job.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div> -->
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

// Fetch the current user and job data
const currentUser = useCurrentUser();
const { fetchJob } = useJob();
const { id } = useRoute().params;

const job = fetchJob(id);
</script>
