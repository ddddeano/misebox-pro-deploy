<!-- components/atoms/Logo.vue -->
<!-- atoms/logo -->
<template>
  <NuxtLink to="/" class="logo-link">
    <img
      src="@/assets/logo.png"
      alt="Misebox"
      :class="['logo', sizeClass]"
    />
  </NuxtLink>
</template>

<script setup>

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});


const sizeClass = computed(() => `logo--${props.size}`);
</script>

<style scoped>
.logo-link {
  display: inline-block;
  line-height: 0;
}

.logo {
  height: auto;
  width: 100%;
}

.logo--small {
  width: var(--logo-width-small);
}

.logo--medium {
  width: var(--logo-width-medium);
}

.logo--large {
  width: var(--logo-width-large);
}
</style>