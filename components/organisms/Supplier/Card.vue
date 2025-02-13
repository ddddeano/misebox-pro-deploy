<!-- components/organisms/Supplier/Card.vue -->
<template>
  <div class="card supplier-card" v-if="miseboxUser && supplier && supplier.id">
    <NuxtLink :to="`/suppliers/${supplier.id}`" class="card-main">
      <div class="image-wrapper">
        <!-- Primary avatar: Supplier image -->
        <MoleculesProfileImage
          v-if="supplier.image_url"
          :url="supplier.image_url"
          size="small"
          altText="Supplier Image"
          class="primary-avatar"
        />
        <!-- Secondary avatar: Current MiseboxUser's avatar -->
        <MoleculesProfileAvatar
          v-if="miseboxUser.avatar"
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="secondary-avatar"
        />
      </div>
      <div class="card-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <span class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
        <div v-if="supplier.companyName" class="highlight">
          {{ supplier.companyName }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-footer">
      
    </div>
  </div>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();
</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
}

/* Primary avatar: Supplier image */
.primary-avatar {
  border-radius: 50%;
  position: relative;
}

/* Secondary avatar: Current MiseboxUser's avatar */
.secondary-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px; /* adjust as needed */
  height: 30px; /* adjust as needed */
  border-radius: 50%;
  z-index: 2;
}
</style>
