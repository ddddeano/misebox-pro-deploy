<!-- components/organisms/Job/link/Recruiter/Card.vue -->
<template>
  <div class="card" v-if="recruiter && miseboxUser">
    <div class="card-header">
      <img
        v-if="recruiter.avatar"
        :src="recruiter.avatar"
        alt="User Avatar"
        class="avatar"
      />
      <div class="header-content">
        <h3>{{ recruiter.display_name || recruiter.name }}</h3>
        <p>{{ recruiter.email }}</p>
      </div>
    </div>
    <div class="card-content">
      <p><strong>Misebox Code:</strong> {{ miseboxUser.mise_code }}</p>
      <p v-if="miseboxUser.address">
        <strong>Address:</strong>
        {{ miseboxUser.address.street1 }} {{ miseboxUser.address.number }},
        {{ miseboxUser.address.town }}, {{ miseboxUser.address.country }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true }
});

const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.id);

const { fetchRecruiter } = useRecruiter();
const recruiter = fetchRecruiter(props.id);
</script>

<style scoped>
.card {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-xs);
  padding: var(--spacing-s);
  max-width: 400px;
  margin: var(--spacing-m) auto;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-s);
}

.avatar {
  width: var(--avatar-small);
  height: var(--avatar-small);
  border-radius: 50%;
  margin-right: var(--spacing-s);
  object-fit: cover;
}

.header-content h3 {
  margin: 0;
  font-size: var(--font-size-l);
  color: var(--text-primary);
}

.header-content p {
  margin: 0;
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}

.card-content p {
  margin: var(--spacing-xs) 0;
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}
</style>
