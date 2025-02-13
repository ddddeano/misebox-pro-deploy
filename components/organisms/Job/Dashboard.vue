<!-- components/organisms/Job/Dashboard.vue -->
<template>
  <div class="job-dashboard">
    <header>
      <h1>Job Dashboard</h1>
      <p>Manage your job applications and postings.</p>
    </header>

    <section v-if="miseboxUser && jobs">
      <p><strong>User:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Total Jobs:</strong> {{ jobs?.length || 0 }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/jobs`">View All Jobs</router-link>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { jobsCollection: jobs } = useJob();
</script>
