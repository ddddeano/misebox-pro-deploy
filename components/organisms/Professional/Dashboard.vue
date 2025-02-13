<!-- components/organisms/Professional/Dashboard.vue -->
<!-- components/organisms/Professional/Edit.vue -->
<template>
  <client-only>
Dashboard
Upgrade your business card here...
  </client-only>
</template>

<script setup>

const currentUser = useCurrentUser();
const { currentProfessional: professional } = useProfessional();
</script>
