<!-- components/organisms/MiseboxUser/Create.vue -->
<template>
  <div class="entity-create">
    <h2>Create Your Misebox User Profile</h2>
    <MoleculesFormsSingleFieldLocal
      id="displayName"
      placeholder="Enter your display name"
      v-model="miseboxUser.display_name"
    />
    <section v-if="hasData" class="button-section">
      <button class="btn" @click="handleProcessMiseboxUser">
        Create a Misebox User
      </button>
    </section>
  </div>
</template>

<script setup>
const miseboxUser = ref({});
const { createMiseboxUser } = useMiseboxUser();
const router = useRouter();
const currentUser = useCurrentUser();

// hasData is true only when display_name is non-empty
const hasData = computed(() => {
  const name = miseboxUser.value.display_name || "";
  return name.trim() !== "";
});

async function handleProcessMiseboxUser() {
  // Add the current user's email to the miseboxUser object before creating the profile
  miseboxUser.value.email = currentUser.value?.email;
  await createMiseboxUser(miseboxUser.value);
  router.push(`/misebox-users/${currentUser.value?.uid}`);
}
</script>
