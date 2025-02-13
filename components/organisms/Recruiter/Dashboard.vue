<!-- components/organisms/Recruiter/Dashboard.vue -->
<template>
  <div class="recruiter-dashboard">
    <header>
      <h1>Recruiter Dashboard</h1>
      <p>Manage your recruitment activities and job postings.</p>
    </header>

    <section v-if="miseboxUser && recruiter">
      <p><strong>Name:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Open Positions:</strong> {{ recruiter.jobs?.length || 0 }}</p>
      <p><strong>Team Size:</strong> {{ recruiter.team?.length || 0 }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/recruiters/${currentUser.uid}/edit`">Edit Profile</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();
</script>
