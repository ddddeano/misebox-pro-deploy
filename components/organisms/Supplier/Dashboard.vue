<!-- components/organisms/Supplier/Dashboard.vue -->
<template>
  <div class="supplier-dashboard">
    <header>
      <h1>Supplier Dashboard</h1>
      <p>Manage your supplier profile and available products.</p>
    </header>

    <section v-if="miseboxUser && supplier">
      <p><strong>Name:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Products Offered:</strong> {{ supplier.products?.length || 0 }}</p>
      <p><strong>Regions Covered:</strong> {{ supplier.regions?.join(", ") || "N/A" }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/suppliers/${currentUser.uid}/edit`">Edit Profile</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();
</script>
