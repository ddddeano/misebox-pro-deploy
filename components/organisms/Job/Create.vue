<!-- components/organisms/Job/Create.vue -->
<template>
  <div v-if="recruiter" class="entity-create">
    <h2>Create a New Job</h2>
    <MoleculesFormsSingleFieldLocal
      id="jobTitle"
      label="Job Title"
      v-model="job.job_title"
      placeholder="Enter job title"
    />

  

    <div class="kitchen-list-section">
      <label>Select a Kitchen</label>
      <div v-if="kitchens.length > 0">
        <ul class="kitchen-list">
          <li
            v-for="kitchenId in kitchens"
            :key="kitchenId"
            @click="selectKitchen(kitchenId)"
            :class="{ selected: job.kitchen_id === kitchenId }"
          >
            <OrganismsRecruiterLinkKitchenCell
              :id="kitchenId"
              :isDisabled="false"
              :isSelected="job.kitchen_id === kitchenId"
            />
          </li>
        </ul>
      </div>
      <div v-else class="no-kitchens">
        <p>You must connect a kitchen before creating jobs.</p>
        <router-link to="/kitchens/create" class="btn btn-secondary">
          Connect a Kitchen
        </router-link>
      </div>
    </div>

    <div class="input-group">
      <label for="startDate">Start Date</label>
      <MoleculesFormsMyCalendar v-model="job.start_date" id="startDate" />
    </div>

    <div class="price-input-group">
      <MoleculesFormsSingleFieldLocal
        id="price"
        label="Price"
        v-model="job.price"
        placeholder="Enter price"
      />
      <span class="currency-label">{{ recruiter.currency || 'USD' }}</span>
    </div>

    <section v-if="hasData" class="button-section">
      <button class="btn" @click="handleProcessJob">Save Job</button>
    </section>
  </div>
  <div v-else>
    <p>Loading recruiter info...</p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const job = ref({
  job_title: "Cook - Entremétier", // Default job title
  kitchen_id: "",
  start_date: formatDate(new Date()), // Today's date in "YYYY-MM-DD" format
  price: "38.00"
});

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const { processJob } = useJobCreate();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();

const kitchens = computed(() => miseboxUser.value?.kitchens || []);
const kitchenCount = computed(() => kitchens.value.length);
const hasData = computed(() => job.value.job_title && job.value.kitchen_id && job.value.start_date && job.value.price);

function selectKitchen(kitchenId: string) {
  job.value.kitchen_id = kitchenId;
}

async function handleProcessJob() {
  try {
    const jobId = await processJob(job.value);
    router.push(`/jobs/${jobId}`);
  } catch (error: any) {
    console.error("[JobCreate] Error processing job:", error.message);
  }
}

onMounted(() => {
  if (kitchenCount.value === 1) {
    // Automatically select the only available kitchen.
    job.value.kitchen_id = kitchens.value[0];
  }
});
</script>

<style scoped>
.price-input-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
.currency-label {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}

</style>
