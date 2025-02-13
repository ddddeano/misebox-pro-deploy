<!-- components/organisms/Kitchen/CTA.vue -->
<template>
  <OrganismsMiseboxUserCTA>
    <template #default>
      <!-- Require Chef Profile -->
      <div v-if="miseboxUser && !chef" class="call-to-action-message">
        <h2>Become a Chef First</h2>
        <p>
          To create and manage kitchens, you need to have a Chef profile. Set up your Chef account to get started.
        </p>
      </div>

      <!-- Kitchen actions for Chef -->
      <div v-if="miseboxUser && chef" class="call-to-action-existing">
        <h2>Start Managing Kitchens</h2>
        <p>Manage your existing kitchens or create a new one below.</p>
        <OrganismsKitchenCreate />
      </div>
    </template>
  </OrganismsMiseboxUserCTA>
</template>

<script setup>
const { currentChef: chef } = useChef();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
