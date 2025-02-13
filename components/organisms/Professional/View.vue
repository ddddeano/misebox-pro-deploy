<!-- components/organisms/Professional/View.vue -->
<template>
  <div class="view-profile">
    
    <!-- 🔹 Title -->
    <section v-if="professional.title" class="profile-section">
      <h2 class="profile-title">Title</h2>
      <p>{{ professional.title }}</p>
    </section>

    <!-- 🔹 Short Bio -->
    <section v-if="professional.bio_short" class="profile-section">
      <h2 class="profile-title">Short Bio</h2>
      <p v-html="formattedShortBio"></p>
    </section>

    <!-- 🔹 Full Bio -->
    <section v-if="professional.bio_long" class="profile-section">
      <h2 class="profile-title">About Me</h2>
      <p v-html="formattedLongBio"></p>
    </section>

    <!-- 🔹 Kitchen Experience -->
    <section v-if="professional.kitchen_experience?.length" class="profile-section">
      <h2 class="profile-title">Kitchen Experience</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.kitchen_experience" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsKitchenExperience :kitchenExperience="item" mode="display" />
        </li>
      </ul>
    </section>

    <!-- 🔹 Other Employment Experience -->
    <section v-if="professional.other_employment_experience?.length" class="profile-section">
      <h2 class="profile-title">Other Employment Experience</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.other_employment_experience" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsOtherEmploymentExperience :employmentExperience="item" mode="display" />
        </li>
      </ul>
    </section>

    <!-- 🔹 Certifications -->
    <section v-if="professional.certifications?.length" class="profile-section">
      <h2 class="profile-title">Certifications</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.certifications" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsCertification :certification="item" mode="display" />
        </li>
      </ul>
    </section>

    <!-- 🔹 Education -->
    <section v-if="professional.education?.length" class="profile-section">
      <h2 class="profile-title">Education</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.education" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsEducation :education="item" mode="display" />
        </li>
      </ul>
    </section>

    <!-- 🔹 Languages -->
    <section v-if="professional.languages?.length" class="profile-section">
      <h2 class="profile-title">Languages</h2>
      <ul class="profile-list">
        <li v-for="(language, index) in professional.languages" :key="index" class="profile-list-item">
          {{ language.language }} - {{ language.proficiency }}
        </li>
      </ul>
    </section>

    <!-- 🔹 Volunteering -->
    <section v-if="professional.volunteering?.length" class="profile-section">
      <h2 class="profile-title">Volunteering</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.volunteering" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsVolunteering :volunteering="item" mode="display" />
        </li>
      </ul>
    </section>

    <!-- 🔹 Projects -->
    <section v-if="professional.projects?.length" class="profile-section">
      <h2 class="profile-title">Projects</h2>
      <ul class="profile-list">
        <li v-for="(item, index) in professional.projects" :key="index" class="profile-list-item">
          <OrganismsProfessionalFieldsProject :project="item" mode="display" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
});

// ✅ Fix: Convert `\\n` into actual newlines, then into `<br>` tags
function formatBio(bio) {
  if (!bio) return "";
  console.log("[bio debug] Formatting bio:", bio);
  return bio.replace(/\\n/g, "\n").replace(/\n/g, "<br>");
}

const formattedShortBio = computed(() => formatBio(props.professional.bio_short));
const formattedLongBio = computed(() => formatBio(props.professional.bio_long));

// 🔹 Format Join Date
const formattedJoinDate = computed(() => {
  if (!props.professional.created_at) return "Unknown";
  return new Date(props.professional.created_at).toLocaleDateString();
});
</script>
