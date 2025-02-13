<!-- components/organisms/MiseboxUser/Edit.vue -->
<template>
  <client-only>
    <div v-if="currentUser && miseboxUser" class="edit-profile">
      <!-- Avatar Selection -->
      <MoleculesFormsFirestoreAvatarSelection
        collectionName="misebox-users"
        :item="miseboxUser"
      />
      <button @click="activateSubscription" :disabled="miseboxUser.subscription" class="btn">
        {{ miseboxUser.subscription ? "Premium Activated" : "Activate Premium" }}
      </button>
      <!-- Display Name -->
      <MoleculesFormsFirestoreSingle
        label="Display Name"
        collectionName="misebox-users"
        target="display_name"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.display_name"
        placeholder="Enter your display name"
      />

      <!-- Handle -->
      <MoleculesFormsFirestoreSingle
        label="Handle"
        collectionName="misebox-users"
        target="handle"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.handle"
        placeholder="Enter your handle"
      />

      <!-- Email -->
      <MoleculesFormsFirestoreSingle
        label="Email"
        collectionName="misebox-users"
        target="email"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.email"
        placeholder="Enter your email"
      />

      <!-- Phone Number -->
      <MoleculesFormsFirestoreSingle
        label="Phone Number"
        collectionName="misebox-users"
        target="phone_number"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.phone_number"
        placeholder="Enter your phone number"
      />

      <!-- Location (Unique to MiseboxUser) -->
      <OrganismsMiseboxUserFieldsLocation
        label="Location"
        collectionName="misebox-users"
        target="location"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.location"
        :placeholders="{ country: 'Country', region: 'Region/State', city: 'City' }"
      />

      <!-- Date of Birth -->
      <MoleculesFormsFirestoreMulti
        label="Date of Birth"
        collectionName="misebox-users"
        target="dob"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.dob"
        :placeholders="{ day: 'DD', month: 'MM', year: 'YYYY' }"
      />

      <!-- Address -->
      <MoleculesFormsFirestoreMulti
  label="Address"
  collectionName="misebox-users"
  target="address"
  :documentID="miseboxUser.id"
  :firebaseValue="miseboxUser.address"
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


      <!-- User Bio -->
      <MoleculesFormsFirestoreTextArea
        label="User Bio"
        collectionName="misebox-users"
        target="user_bio"
        :documentID="miseboxUser.id"
        :firebaseValue="miseboxUser.user_bio"
        :maxLength="500"
        placeholder="Write something about yourself"
      />
    </div>

    <div v-else>
      <p class="access-denied-message">
        Access Denied. You are not authorized to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
import { Timestamp } from "firebase/firestore";
const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser, updateMiseboxUser } = useMiseboxUser();

// Function to activate subscription
const activateSubscription = async () => {
  try {
    const subscriptionData = {
      type: "premium",
      date: Timestamp.now(), // Firestore timestamp
    };

    await updateMiseboxUser({ id: miseboxUser.value.id, subscription: subscriptionData });

    console.log("[activateSubscription] Subscription activated with timestamp:", subscriptionData.date);
  } catch (error) {
    console.error("[activateSubscription] Error:", error);
  }
};
</script>


