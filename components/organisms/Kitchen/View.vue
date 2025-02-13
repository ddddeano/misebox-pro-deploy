<!-- components/organisms/Kitchen/View.vue -->
<template>
  <client-only>
    <div v-if="kitchen" class="view-profile">
      <!-- Description Section -->
      <section v-if="kitchen.description" class="profile-section">
        <div class="view-profile-title">Description</div>
        <div>{{ kitchen.description }}</div>
      </section>
      <!-- Metadata Section -->
      <section class="profile-section">
        <div v-if="kitchen.created_at">
          <strong>Profile Created:</strong> {{ formattedCreatedAt }}
        </div>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Kitchen details not found.</p>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCurrentUser } from "vuefire";

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

// Get the current user
const currentUser = useCurrentUser();

// Format created_at date
const formattedCreatedAt = computed(() => {
  return props.kitchen.created_at
    ? new Date(props.kitchen.created_at).toLocaleDateString()
    : "Unknown";
});

// Fetch team members
const { fetchTeamMembers } = useKitchenTeam();
const teamMembers = ref([]);

onMounted(async () => {
  if (props.kitchen.id) {
    teamMembers.value = await fetchTeamMembers(props.kitchen.id);
  }
});

// ✅ Check if the current user is in the team
const isTeamMember = computed(() => {
  return teamMembers.value.some(member => member.id === currentUser.value?.uid);
});
</script>
