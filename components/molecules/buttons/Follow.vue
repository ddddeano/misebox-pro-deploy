<!-- components/molecules/buttons/Follow.vue -->
<!-- components/molecules/FollowButton.vue -->
<template>
  <!-- HeartIcon with dynamic classes and click event -->
  <HeartIcon :class="['icon', isFollowingClass, { 'clicked': isClicked }]" @click="toggleFollow" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { updateDoc, doc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { useFirestore, useCurrentUser } from 'vuefire';

const firestore = useFirestore();
const currentUser = useCurrentUser();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const localFollowingStatus = ref(false);
const isClicked = ref(false);

const isFollowingClass = computed(() => (localFollowingStatus.value ? 'following' : 'not-following'));

onMounted(async () => {
  if (currentUser.value) {
    const currentUserDocRef = doc(firestore, 'misebox-users', currentUser.value.uid);
    const docSnapshot = await getDoc(currentUserDocRef);
    if (docSnapshot.exists()) {
      const followingList = docSnapshot.data().following || [];
      localFollowingStatus.value = followingList.includes(props.user.id);
    }
  }
});

const toggleFollow = async () => {
  if (!currentUser.value) return console.error('User not authenticated.');
  try {
    const currentUserId = currentUser.value.uid;
    const followedUserId = props.user.id;
    const currentUserDocRef = doc(firestore, 'misebox-users', currentUserId);

    const newFollowingStatus = !localFollowingStatus.value;
    await updateDoc(currentUserDocRef, {
      following: newFollowingStatus ? arrayUnion(followedUserId) : arrayRemove(followedUserId),
    });

    localFollowingStatus.value = newFollowingStatus;
    isClicked.value = true;
    setTimeout(() => (isClicked.value = false), 300);
    console.log(`User ${newFollowingStatus ? 'followed' : 'unfollowed'} successfully`);
  } catch (err) {
    console.error('Error updating follow status:', err);
  }
};
</script>

<style scoped>
.following {
  color: var(--primary); /* Adjust as needed for the "following" state */
}

.not-following {
  color: var(--hover); /* Color when not following */
}
</style>
