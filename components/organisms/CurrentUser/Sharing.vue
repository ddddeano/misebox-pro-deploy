<template>
  <div class="sharing-card" v-if="miseboxUser">
    <AtomsLogo size="small" />
    
    <div class="avatar-container">
      <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" @click="$emit('closeShareModal')">
        <MoleculesProfileAvatar
          :url="miseboxUser.avatar"
          size="large"
          altText="User Avatar"
          class="main-avatar"
        />
      </NuxtLink>
    </div>

    <div class="info">
      <div class="name">{{ miseboxUser.display_name }}</div>
      <div class="handle">@{{ miseboxUser.handle }}</div>
      <div class="title" v-if="professional">{{ professional.title }}</div>
    </div>

    <div class="qr-container">
      <img :src="qrCode" alt="QR Code" class="qr" v-if="qrCode" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';

defineEmits(['closeShareModal']); // Declare emitted event

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentProfessional: professional } = useProfessional();

const qrCode = ref('');

const url = `http://misebox.app/misebox-users/${currentUser?.value.uid}`;

const generateQRCode = async () => {
  try {
    qrCode.value = await QRCode.toDataURL(url);
  } catch (err) {
    console.error("QR Code generation failed:", err);
  }
};

onMounted(generateQRCode);
</script>

<style scoped>
.sharing-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background-strong);
  color: var(--text-primary);
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
  width: 320px;
  text-align: center;
  box-shadow: var(--shadow-m);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-s);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-s);
}

.avatar-container a {
  display: block;
}

.main-avatar {
  width: var(--avatar-large);
  height: var(--avatar-large);
  border-radius: var(--radius-full);
  border: 3px solid var(--border);
  transition: opacity 0.2s ease-in-out;
}

.main-avatar:hover {
  opacity: 0.8;
}

.info {
  margin-bottom: var(--spacing-m);
}

.name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.handle {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}

.title {
  margin-top: var(--spacing-m);
  font-size: var(--font-size-l);
  color: var(--text-secondary);
}

.qr-container {
  margin-top: var(--spacing-m);
}

.qr {
  width: 160px;
  color: var(--text-secondary);
  border-radius: var(--radius-m);
}

@include respond-to(mobile-portrait) {
  .sharing-card {
    width: 100%;
    padding: var(--spacing-s);
  }
}

@include respond-to(desktop) {
  .sharing-card {
    width: 400px;
  }
}
</style>
