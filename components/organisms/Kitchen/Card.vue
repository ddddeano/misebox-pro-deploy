<!-- components/organisms/Kitchen/Card.vue -->
<template>
  <div class="card kitchen-card" v-if="kitchen">
    <NuxtLink :to="`/kitchens/${kitchen.id}`" class="card-main">
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="kitchen.image_url"
          :url="kitchen.image_url"
          size="large"
          altText="Kitchen Image"
          class="kitchen-image"
        />
      </div>
      <div class="card-content">
        <div class="card-title">{{ kitchen.name || 'Unnamed Kitchen' }}</div>
        <div v-if="kitchen.formatted_address">{{ kitchen.formatted_address }}</div>
      </div>
    </NuxtLink>
    <div class="card-footer">
      <ShareIcon class="icon" @click="copyKitchenUrl" />
      <LinkIcon v-if="kitchen.website" class="icon" @click="openWebsite" />
      <MapPinIcon v-if="kitchen.location" class="icon" @click="openGoogleMaps" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

// Compute full URL of the kitchen
const kitchenUrl = computed(() => {
  return `${window.location.origin}/kitchens/${props.kitchen.id}`;
});

// ✅ Copy Kitchen URL to Clipboard
const copyKitchenUrl = async () => {
  try {
    await navigator.clipboard.writeText(kitchenUrl.value);
    alert("Kitchen link copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy URL:", error);
    alert("Failed to copy link.");
  }
};

// ✅ Open Google Maps
const googleMapsUrl = computed(() => {
  if (props.kitchen.location?.lat && props.kitchen.location?.lng) {
    return `https://www.google.com/maps?q=${props.kitchen.location.lat},${props.kitchen.location.lng}`;
  }
  return '';
});

const openGoogleMaps = () => {
  if (googleMapsUrl.value) {
    window.open(googleMapsUrl.value, '_blank');
  }
};

// ✅ Open Website in New Tab
const openWebsite = () => {
  if (props.kitchen.website) {
    let url = props.kitchen.website.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    window.open(url, '_blank');
  }
};
</script>
