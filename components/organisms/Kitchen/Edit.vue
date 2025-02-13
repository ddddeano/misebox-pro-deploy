<template>
  <client-only>
    <div v-if="kitchen" class="edit-view">
      <!-- Avatar Selection -->
      <MoleculesFormsFirestoreImageSelection
        :item="kitchen"
        collectionName="kitchens"
      />

      <!-- Kitchen Name -->
      <MoleculesFormsFirestoreSingle
        label="Kitchen Name"
        collectionName="kitchens"
        target="name"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.name"
        placeholder="Enter your kitchen name"
      />

      <!-- Website -->
      <MoleculesFormsFirestoreSingle
        label="Website"
        collectionName="kitchens"
        target="website"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.website"
        placeholder="Enter website URL"
      />

      <!-- Address (Multi-field) -->
      <MoleculesFormsFirestoreMulti
        label="Address"
        collectionName="kitchens"
        target="address"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.address"
        :placeholders="{
          flatNumber: 'Flat Number',
          houseNumber: 'House Number',
          street: 'Street',
          town: 'Town/City',
          county: 'County',
          postalCode: 'Postal Code',
          country: 'Country'
        }"
      />

      <!-- Description -->
      <MoleculesFormsFirestoreTextArea
        label="Description"
        collectionName="kitchens"
        target="description"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.description"
        placeholder="Enter a description for this kitchen"
        :maxLength="500"
      />

      <!-- Gallery -->
      <MoleculesFormsFirestoreObjectArray
        label="Gallery"
        collectionName="kitchens"
        target="gallery"
        :firebaseValue="kitchen.gallery"
        :documentID="kitchen.id"
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
            :collectionName="'kitchens'"
            :documentID="kitchen.id"
            mode="edit"
          />
        </template>
        <template #create>
          <MoleculesFormsFirestoreFieldsGallery
            :collectionName="'kitchens'"
            :documentID="kitchen.id"
            mode="create"
          />
        </template>
      </MoleculesFormsFirestoreObjectArray>
    </div>
    <div v-else>
      <p class="loading">Loading kitchen data...</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});
</script>
