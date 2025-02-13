<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <NuxtLink v-if="crumb.link" :to="crumb.link">{{ crumb.name }}</NuxtLink>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  baseName: String, // Example: "Ingredients"
  basePath: String, // Example: "/ingredients"
  entityId: String, // Dynamic ID (e.g., ingredientId)
  entityName: String, // Actual entity name (e.g., "Tomato")
});

const route = useRoute();

const breadcrumbs = computed(() => {
  let breadcrumbList = [{ name: "Home", link: "/" }];

  if (props.baseName && props.basePath) {
    breadcrumbList.push({ name: props.baseName, link: props.basePath });
  }

  if (props.entityId) {
    breadcrumbList.push({
      name: props.entityName || `#${props.entityId}`,
      link: `${props.basePath}/${props.entityId}`,
    });

    if (route.path.includes("edit")) {
      breadcrumbList.push({ name: "Edit", link: null });
    } else if (route.path.includes("dashboard")) {
      breadcrumbList.push({ name: "Dashboard", link: null });
    }
  } else if (route.path.includes("create")) {
    breadcrumbList.push({ name: "Create", link: null });
  }

  return breadcrumbList;
});
</script>

<style scoped>
.breadcrumbs ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumbs li {
  margin-right: 10px;
}

.breadcrumbs a {
  text-decoration: none;
  color: var(--primary);
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
</style>
