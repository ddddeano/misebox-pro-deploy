<!-- components/organisms/Supplier/Cell.vue -->
<!-- File: components/organisms/Supplier/Cell.vue -->
<template>
  <div class="cell supplier-cell" v-if="supplier">
    <NuxtLink :to="isDisabled ? null : `/suppliers/${supplier.id}`" class="cell-main">
      <div class="image-wrapper">
        <!-- Primary avatar: Supplier image -->
        <MoleculesProfileImage
          v-if="supplier.image_url"
          :url="supplier.image_url"
          size="small"
          altText="Supplier Image"
          class="primary-avatar"
        />
        <!-- Secondary avatar: Associated MiseboxUser's avatar, if available -->
        <MoleculesProfileAvatar
          v-if="miseboxUser && miseboxUser.avatar"
          :url="miseboxUser.avatar"
          size="small"
          altText="User Avatar"
          class="secondary-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">
          {{ miseboxUser && miseboxUser.display_name ? miseboxUser.display_name : supplier.name }}
        </span>
        <span class="handle" v-if="miseboxUser && miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </span>
        <span class="address" v-if="supplier.formatted_address">
          {{ supplier.formatted_address }}
        </span>
        <span class="highlight" v-if="supplier.companyName">
          {{ supplier.companyName }}
        </span>
      </div>
    </NuxtLink>
    <div
      v-if="!isDisabled && miseboxUser && currentUser && miseboxUser.id !== currentUser.id"
      class="interaction"
    >
      <MoleculesButtonsFollow :user="miseboxUser" />
    </div>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const props = defineProps({
  supplier: {
    type: Object,
    required: true,
    default: () => ({})
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

// Fetch the associated MiseboxUser based on supplier.id.
// For Google-sourced (unprocessed) suppliers, this may be null.
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.supplier.id);
</script>
