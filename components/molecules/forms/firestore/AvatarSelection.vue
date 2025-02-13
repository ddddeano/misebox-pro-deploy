<!-- components/molecules/forms/firestore/AvatarSelection.vue -->
<template>
  <div class="form-field">
    <div class="avatar-container">
      <MoleculesProfileAvatar
        :url="item.avatar"
        size="large"
        altText="User Avatar"
      />
      <label class="camera">
        <CameraIcon class="icon" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { updateMiseboxUser } = useMiseboxUserUpdate();

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const userId = props.item.id;
    if (!userId) throw new Error("[handleFileChange] No user ID found.");

    console.log(`[handleFileChange] Uploading avatar for user: ${userId}`);
    const { avatar } = await processMiseboxUserAvatarFile(userId, file);

    await updateMiseboxUser({ id: userId, avatar }); // ✅ Ensure user ID is included
    console.log("[handleFileChange] Avatar updated successfully.");
  } catch (error) {
    console.error("[handleFileChange] Error updating avatar:", error);
  }
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.camera {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: var(--text-secondary);
  background-color: var(--background-strong);
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera:hover {
  color: var(--text-primary);
  background-color: var(--hover);
}

.camera input {
  display: none;
}
</style>
