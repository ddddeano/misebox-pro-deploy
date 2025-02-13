<!-- components/organisms/Recruiter/Edit.vue -->
<template>
  <client-only>
    <div v-if="currentUser && recruiter" class="edit-profile">
      <h2 class="profile-title">Edit Your Recruiter Profile</h2>

      <!-- Avatar Selection -->
      <MoleculesFormsImageSelection
        collectionName="recruiters"
        :item="recruiter"
      />

      <!-- Recruiter Name -->
      <MoleculesFormsFirestoreSingle
        label="Name"
        collectionName="recruiters"
        target="name"
        :documentID="currentUser.uid"
        :firebaseValue="recruiter.name"
        placeholder="Enter your name"
      />

      <!-- Company Name -->
      <MoleculesFormsFirestoreSingle
        label="Company Name"
        collectionName="recruiters"
        target="company_name"
        :documentID="currentUser.uid"
        :firebaseValue="recruiter.company_name"
        placeholder="Enter your company name"
      />

      <!-- Company Address -->
      <MoleculesFormsFirestoreMultiField
        label="Company Address"
        collectionName="recruiters"
        target="company_address"
        :documentID="currentUser.uid"
        :firebaseValue="recruiter.company_address"
        :placeholders="{
          number: 'House Number',
          street1: 'Street 1',
          street2: 'Street 2',
          town: 'Town/City',
          county: 'County',
          postalCode: 'Postal Code',
          country: 'Country'
        }"
      />

      <!-- Short Bio -->
      <MoleculesFormsFirestoreTextArea
        label="Short Bio"
        collectionName="recruiters"
        target="short_bio"
        :documentID="currentUser.uid"
        :firebaseValue="recruiter.short_bio"
        :maxLength="150"
        placeholder="Write a brief description (max 150 characters)"
      />

      <!-- Long Bio -->
      <MoleculesFormsFirestoreTextArea
        label="Long Bio"
        collectionName="recruiters"
        target="long_bio"
        :documentID="currentUser.uid"
        :firebaseValue="recruiter.long_bio"
        :maxLength="1000"
        placeholder="Write a detailed description (max 1000 characters)"
      />

      <!-- Open Roles -->
      <!-- <MoleculesFormsObjectArray
        label="Open Roles"
        collectionName="recruiters"
        target="open_roles"
        :firebaseValue="recruiter.open_roles"
        :documentID="currentUser.uid"
      >
        <template #display="{ item }">
          <OrganismsRecruiterFieldsRole :role="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsRecruiterFieldsRole :role="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsRecruiterFieldsRole mode="create" />
        </template>
      </MoleculesFormsObjectArray> -->

      <!-- Past Placements -->
      <!-- <MoleculesFormsObjectArray
        label="Past Placements"
        collectionName="recruiters"
        target="past_placements"
        :firebaseValue="recruiter.past_placements"
        :documentID="currentUser.uid"
      >
        <template #display="{ item }">
          <OrganismsRecruiterFieldsPlacement :placement="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsRecruiterFieldsPlacement :placement="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsRecruiterFieldsPlacement mode="create" />
        </template>
      </MoleculesFormsObjectArray> -->

      <!-- Certifications -->
      <!-- <MoleculesFormsObjectArray
        label="Certifications"
        collectionName="recruiters"
        target="certifications"
        :firebaseValue="recruiter.certifications"
        :documentID="currentUser.uid"
      >
        <template #display="{ item }">
          <OrganismsRecruiterFieldsCertification :certification="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsRecruiterFieldsCertification :certification="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsRecruiterFieldsCertification mode="create" />
        </template>
      </MoleculesFormsObjectArray> -->

      <!-- Gallery -->
      <!-- <MoleculesFormsObjectArray
        label="Gallery"
        collectionName="recruiters"
        target="gallery"
        :firebaseValue="recruiter.gallery"
        :documentID="currentUser.uid"
      >
        <template #display="{ item }">
          <OrganismsRecruiterFieldsGallery :image="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsRecruiterFieldsGallery :image="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsRecruiterFieldsGallery mode="create" />
        </template>
      </MoleculesFormsObjectArray> -->
    </div>

    <div v-else>
      <p class="access-denied-message">You do not have permission to edit this profile.</p>
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentRecruiter: recruiter } = useRecruiter();
</script>

<style scoped>
.edit-profile {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.profile-title {
  margin-bottom: var(--spacing-m);
  text-align: center;
}
</style>
