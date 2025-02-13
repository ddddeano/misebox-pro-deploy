<!-- components/organisms/Chef/Pill.vue -->
<template>
  <div class="pill chef-pill" v-if="miseboxUser && chef">
    <NuxtLink :to="`/chefs/${chef.id}`" class="pill-header">
      <div class="pill-avatar">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="small"
          :altText="miseboxUser.display_name || 'Chef Avatar'"
        />
      </div>
      <div class="pill-content">
        <div class="title" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </div>
        <div class="subtitle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
})

const currentUser = useCurrentUser()
const { fetchMiseboxUser } = useMiseboxUser()
const miseboxUser = fetchMiseboxUser(props.chef.id)
</script>
