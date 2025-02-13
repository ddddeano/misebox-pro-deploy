<!-- components/molecules/forms/EditModeSection.vue -->
<template>
  <transition name="fade">
    <div v-if="isEditing && !isFolded" class="editing">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="editing-list-item"
        >
          <slot
            v-if="editingIndex === index"
            name="edit"
            :item="viewModel[index]"
            :index="index"
          />
          <slot v-else name="display" :item="item" :index="index" />
          <div class="list-icons">
            <PencilIcon
              v-if="editingIndex !== index"
              class="icon edit-icon"
              @click="emitEdit(index)"
            />
            <CheckCircleIcon
              v-if="editingIndex === index"
              class="icon confirm-icon"
              @click="emitConfirm(index)"
            />
            <ChevronUpIcon
              v-if="editingIndex === index"
              class="icon toggle-icon"
              @click="emitCancelEdit"
            />
            <XCircleIcon
              class="icon delete-icon"
              @click="emitDelete(index)"
            />
          </div>
        </li>
      </ul>
      <div class="centred-icons">
        <ChevronUpIcon class="icon toggle-icon" @click="emitCancelEdit" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

const firestore = useFirestore();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  isFolded: {
    type: Boolean,
    required: true,
  },
  editingIndex: {
    type: Number,
    default: null,
  },
  viewModel: {
    type: Array,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  documentID: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "edit-success",
  "edit-cancel",
  "delete-item",
]);

const emitEdit = (index) => {
  console.log("Emitting edit for index:", index);
  emit("edit-success", index);
};

const emitConfirm = async (index) => {
  try {
    console.log("Updating item at index:", index);
    const updatedArray = [...props.items];
    updatedArray[index] = props.viewModel[index];

    if (!props.collectionName || !props.documentID || !props.target) {
      throw new Error("Missing collectionName, documentID, or target.");
    }

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: updatedArray,
    });

    console.log("Item successfully updated:", updatedArray[index]);
    emit("edit-success", null);
  } catch (error) {
    console.error("Error updating item in Firestore:", error);
  }
};

const emitCancelEdit = () => {
  console.log("Emitting cancel edit");
  emit("edit-cancel");
};

const emitDelete = (index) => {
  console.log("Emitting delete for index:", index);
  emit("delete-item", index);
};
</script>

<style lang="scss" scoped>
.editing {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editing-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
}

.list-icons {
  display: flex;
  gap: 0.5rem;
}

.centred-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
