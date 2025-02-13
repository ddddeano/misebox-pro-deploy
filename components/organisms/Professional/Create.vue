<!-- components/organisms/Professional/Create.vue -->
<template>
  <div class="entity-create">
    <h2>Create Your Professional Profile</h2>
      <MoleculesFormsSingleFieldLocal
        id="professionalTitle"
        placeholder="Enter your professional title (e.g., Freelance)"
        v-model="professional.title"
      />
    <section v-if="hasData" class="button-section">
      <button class="btn" @click="processProfessional">Save Profile</button>
    </section>
  </div>
</template>

<script setup>
const professional = ref({});
const { createProfessional } = useProfessional();
const router = useRouter();
const currentUser = useCurrentUser();

const hasData = computed(() => {
  const title = professional.value.title || "";
  return title.trim() !== "";
});

function handleSelection(value) {
  professional.value.title = value;
}

async function processProfessional() {
  try {
    await createProfessional({ ...professional.value });
    router.push(`/professionals/${currentUser.value?.uid}`);
  } catch (error) {
    console.error("[ProfessionalCreate] Error creating professional profile:", error.message);
  }
}
</script>
