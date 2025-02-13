<!-- components/organisms/Job/CTA.vue -->
<template>
  <OrganismsMiseboxUserCTA>
    <template #default>
      <!-- Require Recruiter Profile -->
      <div v-if="miseboxUser && !recruiter" class="call-to-action-message">
        <h2>Become a Recruiter</h2>
        <p>
          To create job postings, you need a Recruiter profile. Set up your profile to start hiring top talent.
        </p>
      </div>

      <!-- Require Professional Profile -->
      <div v-if="miseboxUser && !professional" class="call-to-action-message">
        <h2>Become a Professional</h2>
        <p>
          To search for jobs, you need a Professional profile. Create your profile to start exploring opportunities.
        </p>
      </div>

      <!-- Job actions for Recruiters -->
      <div v-if="miseboxUser && recruiter" class="call-to-action-existing">
        <h2>Post a New Job</h2>
        <p>Find top talent by posting a new job below.</p>
        <OrganismsJobCreate />
      </div>

      <!-- Job actions for Professionals -->
      <div v-if="miseboxUser && professional" class="call-to-action-existing">
        <h2>Find Your Next Job</h2>
        <p>Explore tailored opportunities below.</p>
        <OrganismsJobList mode="allJobs" />
      </div>
    </template>
  </OrganismsMiseboxUserCTA>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
const { currentProfessional: professional } = useProfessional();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
