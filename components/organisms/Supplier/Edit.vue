<!-- components/organisms/Supplier/Edit.vue -->
<!-- File: components/organisms/Supplier/Edit.vue -->
<template>
  <client-only>
    <div v-if="currentUser && supplier" class="edit-profile">
      <h2 class="profile-title">Edit Your Supplier Profile</h2>
      
      <!-- Supplier Header: Profile Image and Short Address -->
      <div class="form-field supplier-header">
        <MoleculesFormsImageSelection :collectionName="collection" :item="supplier" />
        <span class="short-address">{{ supplier.short_address }}</span>
      </div>
      
      <!-- Supplier Name -->
      <MoleculesFormsFirestoreSingle
        label="Name"
        :collectionName="collection"
        target="name"
        :documentID="currentUser.uid"
        :firebaseValue="supplier.name"
        placeholder="Enter the supplier's name"
      />

      <!-- Supplier Address -->
      <MoleculesFormsMultiField
        label="Address"
        :collectionName="collection"
        target="address"
        :documentID="currentUser.uid"
        :firebaseValue="supplier.address"
        :placeholders="{
          number: 'Number',
          street1: 'Street',
          street2: 'Street 2',
          town: 'Town',
          county: 'County',
          postalCode: 'Postal Code',
          country: 'Country'
        }"
        @fieldChanged="handleaddressChanged"
      />

      <!-- Short Bio -->
      <MoleculesFormsTextAreaField
        label="Short Bio"
        :collectionName="collection"
        target="short_bio"
        :documentID="currentUser.uid"
        :firebaseValue="supplier.short_bio"
        :maxLength="150"
        placeholder="Write a brief description (max 150 characters)"
      />

      <!-- Long Bio -->
      <MoleculesFormsTextAreaField
        label="Long Bio"
        :collectionName="collection"
        target="long_bio"
        :documentID="currentUser.uid"
        :firebaseValue="supplier.long_bio"
        :maxLength="1000"
        placeholder="Write a detailed description (max 1000 characters)"
      />

      <!-- Categories -->
      <MoleculesFormsArrayOfStrings
        label="Categories"
        :collectionName="collection"
        target="categories"
        :documentID="currentUser.uid"
        :firebaseValue="supplier.categories"
        placeholder="Enter categories"
        :itemPlaceholder="'Enter a category'"
      />
    </div>

    <div v-else>
      <p class="access-denied-message">
        You do not have permission to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
// Import the address utility functions.
import { computeFormattedAddress, computeShortAddress } from "@/composables/Utils/addressUtils";
import { useFirestoreUpdate } from "@/composables/Firestore/firestoreUpdate";

// Use a constant collection name for all components.
const collection = "suppliers";

// Get current user and supplier (ensure these composables are defined).
const currentUser = useCurrentUser();
const { currentSupplier: supplier } = useSupplier();

// Get the Firestore update functions.
const { updateEntity } = useFirestoreUpdate();

/**
 * Handles the fieldChanged event emitted from MoleculesFormsMultiField.
 * When the address is changed, we recompute the formatted and short addresses.
 * @param {Object} payload - The payload from the event, e.g., { target: "address", value: updatedAddress }
 */
const handleaddressChanged = async (payload) => {
  if (payload.target === "address") {
    const updatedAddress = payload.value;
    // Compute the new formatted and short addresses from the updated address.
    const newFormatted = computeFormattedAddress(updatedAddress);
    const newShort = computeShortAddress(updatedAddress);
    
    console.log("Address changed:", updatedAddress);
    console.log("New formatted address:", newFormatted);
    console.log("New short address:", newShort);
    
    // Update the local supplier reactive object so the UI reflects the new computed addresses.
    supplier.formatted_address = newFormatted;
    supplier.short_address = newShort;

    // Update Firestore with the new computed addresses.
    try {
      await updateEntity(collection, {
        formatted_address: newFormatted,
        short_address: newShort,
      });
      console.log("Firestore updated with new computed address values.");
    } catch (error) {
      console.error("Error updating computed addresses in Firestore:", error);
    }
  }
};
</script>

<style scoped>
.edit-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.profile-title {
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Supplier Header: Image and Short Address */
.supplier-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
}

.short-address {

}

/* Additional styling for form fields can be added as needed */
</style>
