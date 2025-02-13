<template>
  <client-only>
    <div class="edit-profile" v-if="chef">
      <!-- Specialties -->
      <MoleculesFormsFirestoreArrayOfStrings
        label="Specialties"
        collectionName="chefs"
        target="specialties"
        :firebaseValue="chef.specialties"
        placeholder="Enter your specialties"
        :documentID="documentID"
      />

      <!-- Short Bio -->
      <MoleculesFormsFirestoreTextArea
        label="Short Bio"
        collectionName="chefs"
        target="bio_short"
        :documentID="documentID"
        :firebaseValue="chef.bio_short"
        placeholder="Write a short bio"
        :maxLength="450"
      />

      <!-- Long Bio -->
      <MoleculesFormsFirestoreTextArea
        label="Long Bio"
        collectionName="chefs"
        target="bio_long"
        :documentID="documentID"
        :firebaseValue="chef.bio_long"
        placeholder="Write a detailed bio"
        :maxLength="1000"
      />

      <!-- Gallery -->
      <MoleculesFormsFirestoreObjectArray
        label="Gallery"
        collectionName="chefs"
        target="gallery"
        :firebaseValue="chef.gallery"
        :documentID="documentID"
        :isGallery="true" 
      >
        <template #display="{ item, index }">
          <div class="gallery-grid-item">
            <img :src="item.image_url" class="gallery-image" alt="Gallery Image" />
            <div v-if="item.name" class="image-name">{{ item.name }}</div>
          </div>
        </template>
        <template #edit="{ item, index }">
          <MoleculesFormsFirestoreFieldsGallery
            :image="item"
            :index="index"
            :collectionName="'chefs'"
            :documentID="documentID"
            mode="edit"
          />
        </template>
        <template #create>
          <MoleculesFormsFirestoreFieldsGallery
            :collectionName="'chefs'"
            :documentID="documentID"
            mode="create"
          />
        </template>
      </MoleculesFormsFirestoreObjectArray>
    </div>
    <div v-else class="loading-container">
      <p>Loading chef profile...</p>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";

const currentUser = useCurrentUser();
const { currentChef: chef } = useChef();
const documentID = computed(() => currentUser.value?.uid || "");
</script>
