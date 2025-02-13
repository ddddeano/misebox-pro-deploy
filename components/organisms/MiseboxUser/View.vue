<!-- components/organisms/MiseboxUser/View.vue -->
<template>
  <div class="view-profile">
    
    <!-- 🔹 Full Bio -->
    <section v-if="miseboxUser.user_bio" class="profile-section">
      <p v-html="formattedBio"></p>
    </section>
 
    <!-- 🔹 Subscription Plan -->
    <section v-if="miseboxUser.subscription" class="profile-section">
      <h2 class="profile-title">Subscription</h2>
      <p>Premium Member since {{ formattedSubscriptionDate }}</p>
    </section>

    <!-- 🔹 Member Since -->
    <section v-if="miseboxUser.created_at" class="profile-section">
      <h2 class="profile-title">Member Since</h2>
      <p>{{ formattedJoinDate }}</p>
    </section>

    <!-- 🔹 Location -->
<section v-if="miseboxUser.location" class="profile-section">
  <h2 class="profile-title">Location</h2>
  <p>{{ miseboxUser.location.short_address }}</p>
</section>

    <!-- 🔹 Full Name -->
    <section v-if="miseboxUser.full_name" class="profile-section">
      <h2 class="profile-title">Full Name</h2>
      <p>
        {{ miseboxUser.full_name.firstName }} 
        {{ miseboxUser.full_name.middleName || '' }} 
        {{ miseboxUser.full_name.lastName }}
      </p>
    </section>

    <!-- 🔹 Contact Info (Togglable for Privacy) -->
    <section v-if="isViewingOwn && (miseboxUser.email || miseboxUser.phone_number)" class="profile-section">
      <h2 class="profile-title private">
        Contact
        <EyeSlashIcon v-if="isViewingOwn" class="icon" @click="toggleContactVisibility" />
      </h2>
      <p v-if="showContact && miseboxUser.email">
        <a :href="`mailto:${miseboxUser.email}`">{{ miseboxUser.email }}</a>
      </p>
      <p v-if="showContact && miseboxUser.phone_number">
        <a :href="`tel:${miseboxUser.phone_number}`">{{ miseboxUser.phone_number }}</a>
      </p>
    </section>

    <!-- 🔹 Address (Hidden for Privacy, Toggleable) -->
    <section v-if="isViewingOwn && miseboxUser.address" class="profile-section">
      <h2 class="profile-title private">
        Address
        <EyeSlashIcon v-if="isViewingOwn" class="icon" @click="toggleAddressVisibility" />
      </h2>
      <template v-if="showAddress">
        <p v-if="miseboxUser.address.flatNumber">Flat {{ miseboxUser.address.flatNumber }}</p>
        <p>{{ miseboxUser.address.number }} {{ miseboxUser.address.street }}</p>
        <p>{{ miseboxUser.address.town }}, {{ miseboxUser.address.county }}, {{ miseboxUser.address.country }}</p>
        <p v-if="miseboxUser.address.postalCode">Postal Code: {{ miseboxUser.address.postalCode }}</p>
      </template>
    </section>

    <!-- 🔹 Mise Code -->
    <section v-if="miseboxUser.mise_code" class="profile-section">
      <p class="profile-text">
        <strong>Mise Code:</strong> {{ miseboxUser.mise_code }}
      </p>
    </section>

    <!-- 🔹 Following List -->
    <section v-if="miseboxUser.following?.length" class="profile-section">
      <h2 class="profile-title">Following</h2>
      <ul class="profile-list">
        <li v-for="userId in miseboxUser.following" :key="userId" class="profile-list-item">
          <OrganismsMiseboxUserLinkMiseboxUserCell :id="userId" />
        </li>
      </ul>
    </section>

  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});

const currentUser = useCurrentUser();
const isViewingOwn = computed(() => currentUser.value?.uid === props.miseboxUser.id);

// ✅ Convert newlines (`\n`) into `<br>` tags for bio display
const formattedBio = computed(() => {
  if (!props.miseboxUser.user_bio) return "";
  console.log("[bio debug] Formatting bio for display:", props.miseboxUser.user_bio);
  return props.miseboxUser.user_bio.replace(/\n/g, "<br>");
});

// 🔹 Reactive state for toggling sensitive data visibility
const showContact = ref(false);
const showAddress = ref(false);

const toggleContactVisibility = () => {
  showContact.value = !showContact.value;
};

const toggleAddressVisibility = () => {
  showAddress.value = !showAddress.value;
};

// 🔹 Format Subscription Date
const formattedSubscriptionDate = computed(() => {
  if (!props.miseboxUser.subscription?.date?.seconds) return "Unknown";
  return new Date(props.miseboxUser.subscription.date.seconds * 1000).toLocaleDateString();
});

// 🔹 Format Join Date
const formattedJoinDate = computed(() => {
  if (!props.miseboxUser.created_at) return "Unknown";
  return new Date(props.miseboxUser.created_at).toLocaleDateString();
});
</script>
