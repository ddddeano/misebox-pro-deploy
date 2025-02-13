<!-- components/organisms/MiseboxUser/Dashboard.vue -->
<template>
  <div class="misebox-user-dashboard">
    <header>
      <h1>Misebox Dashboard</h1>
      <p>Manage your personal settings and access all your profiles.</p>
    </header>

    <section v-if="miseboxUser">
      <p><strong>Name:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Handle:</strong> @{{ miseboxUser.handle }}</p>
      <p><strong>Applications Enabled:</strong> {{ miseboxUser.user_apps?.join(", ") || "None" }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/misebox-users/${currentUser.uid}/edit`">Edit Profile</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
