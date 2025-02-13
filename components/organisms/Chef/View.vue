<template>
  <client-only>
    <div class="view-profile chef-profile">
      <!-- 🔹 Member Since -->
      <section v-if="chef.created_at">
        <h2 class="view-profile-title">Member Since</h2>
        <p>{{ formattedJoinDate }}</p>
      </section>

      <!-- 🔹 Specialties (Rendered as Tags) -->
      <section v-if="chef.specialties?.length">
        <h2 class="view-profile-title">Specialties</h2>
        <ul class="tag-list">
          <li v-for="(specialty, index) in chef.specialties" :key="index" class="tag">
            {{ specialty }}
          </li>
        </ul>
      </section>

      <!-- 🔹 Short Bio -->
      <section v-if="chef.bio_short">
        <h2 class="view-profile-title">Short Bio</h2>
        <p v-html="formattedShortBio"></p>
      </section>

      <!-- 🔹 Long Bio -->
      <section v-if="chef.bio_long">
        <h2 class="view-profile-title">About Me</h2>
        <p v-html="formattedLongBio"></p>
      </section>

      <!-- 🔹 Kitchens (Pulled from MiseboxUser) -->
      <section v-if="miseboxUser?.kitchens?.length">
        <h2 class="view-profile-title">Kitchens</h2>
        <ul class="kitchens-list">
          <li v-for="kitchenId in miseboxUser.kitchens" :key="kitchenId">
            <OrganismsChefLinkKitchenCell :id="kitchenId" />
          </li>
        </ul>
      </section>

      <!-- 🔹 Gallery (Grid Layout) -->
      <section v-if="chef.gallery?.length">
        <div class="gallery-grid">
          <div v-for="image in chef.gallery" :key="image.image_url" class="gallery-grid-item">
            <img :src="image.image_url" :alt="image.name || 'Gallery Image'" />
            <p class="image-name">{{ image.name }}</p>
          </div>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
});

// Fetch MiseboxUser directly
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.chef.id);

// Format Join Date
const formattedJoinDate = computed(() => {
  return props.chef.created_at
    ? new Date(props.chef.created_at).toLocaleDateString()
    : "Unknown";
});

// Convert newlines (`\n`) into `<br>` for display
const formatTextForDisplay = (text) => {
  return text ? text.replace(/\n/g, "<br>") : "";
};

// Computed properties for bios
const formattedShortBio = computed(() => formatTextForDisplay(props.chef.bio_short));
const formattedLongBio = computed(() => formatTextForDisplay(props.chef.bio_long));
</script>

<style scoped>
/* 🔹 Specialties (Tags) */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  padding: 0;
  margin: 0;
  list-style: none;
}

.tag {
  background: var(--background-2);
  padding: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--radius-m);
  font-size: var(--font-size-s);
  color: var(--text-primary);
}

/* 🔹 Gallery Grid Layout */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-s);
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 🔹 Gallery Grid Items */
.gallery-grid-item {
  text-align: center;
  padding: var(--spacing-xxs);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
  background-color: var(--background-2);
}

.gallery-grid-item img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-m);
  object-fit: cover;
}

/* 🔹 Image Name */
.image-name {
  justify-content: center;
  display: flex;
  margin-top: var(--spacing-xxs);
  font-size: var(--font-size-s);
  color: var(--text-primary);
}
</style>
