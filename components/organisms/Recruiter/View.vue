<!-- components/organisms/Recruiter/View.vue -->
<template>
  <client-only>
    <div class="view-profile recruiter-profile">
      <section>
        <h2 class="view-profile-title">Recruiter Profile</h2>
        <MoleculesProfileImage
          v-if="recruiter.image_url"
          :url="recruiter.image_url"
          size="small"
          altText="Recruiter Image"
          class="primary-avatar"
        />
        <p><strong>Name:</strong> {{ recruiter.name }}</p>
        <p><strong>Company:</strong> {{ recruiter.company }}</p>
        <p><strong>Bio:</strong> {{ recruiter.bio }}</p>
        <p v-if="recruiter.projects?.length">Projects:</p>
        <ul>
          <li v-for="project in recruiter.projects" :key="project.name">
            {{ project.name }} - {{ project.year }}
          </li>
        </ul>
      </section>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  recruiter: {
    type: Object,
    required: true,
  },
});
</script>
