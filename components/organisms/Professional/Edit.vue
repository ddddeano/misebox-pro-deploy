<!-- components/organisms/Professional/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="professional">
      <!-- 1) Title (Single Field) -->
      <MoleculesFormsFirestoreSingle
        label="Title"
        collectionName="professionals"
        target="title"
        :documentID="documentID"
        :firebaseValue="professional.title"
        placeholder="Enter your title"
      />

      <!-- 2) Short Bio (Single Text Area) -->
      <MoleculesFormsFirestoreTextArea
        label="Short Bio"
        collectionName="professionals"
        target="bio_short"
        :documentID="documentID"
        :firebaseValue="professional.bio_short"
        placeholder="Write a short bio"
        :maxLength="450"
      />

      <!-- 3) Long Bio (Single Text Area) -->
      <MoleculesFormsFirestoreTextArea
        label="Long Bio"
        collectionName="professionals"
        target="bio_long"
        :documentID="documentID"
        :firebaseValue="professional.bio_long"
        placeholder="Write a detailed bio"
        :maxLength="1000"
      />

      <!-- 4) Kitchen Experience (Array) -->
      <MoleculesFormsFirestoreObjectArray
        label="Kitchen Experience"
        collectionName="professionals"
        target="kitchen_experience"
        :firebaseValue="professional.kitchen_experience"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsKitchenExperience :kitchenExperience="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsKitchenExperience :kitchenExperience="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsKitchenExperience mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Other Employment Experience"
        collectionName="professionals"
        target="other_employment_experience"
        :firebaseValue="professional.other_employment_experience"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsOtherEmploymentExperience :employmentExperience="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsOtherEmploymentExperience :employmentExperience="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsOtherEmploymentExperience mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Certifications"
        collectionName="professionals"
        target="certifications"
        :firebaseValue="professional.certifications"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsCertification :certification="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsCertification :certification="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsCertification mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Education"
        collectionName="professionals"
        target="education"
        :firebaseValue="professional.education"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsEducation :education="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsEducation :education="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsEducation mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Languages"
        collectionName="professionals"
        target="languages"
        :firebaseValue="professional.languages"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsLanguage :language="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsLanguage :language="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsLanguage mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Volunteering"
        collectionName="professionals"
        target="volunteering"
        :firebaseValue="professional.volunteering"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsVolunteering :volunteering="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsVolunteering :volunteering="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsVolunteering mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Projects"
        collectionName="professionals"
        target="projects"
        :firebaseValue="professional.projects"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsProject :project="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsProject :project="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsProject mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray>

      <MoleculesFormsFirestoreObjectArray
        label="Locations"
        collectionName="professionals"
        target="locations"
        :firebaseValue="professional.locations"
        :documentID="documentID"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsLocation :location="item" :index="index" mode="display" />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsLocation :location="item" :index="index" mode="edit" />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsLocation mode="create" />
        </template>
      </MoleculesFormsFirestoreObjectArray> 
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentProfessional: professional } = useProfessional();
const documentID = computed(() => currentUser.value?.uid || "");
</script>
