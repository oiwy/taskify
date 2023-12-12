<template>
  <dialog class="modal" :class="{ 'modal--open': isModalOpen }">
    <div class="modal__container">
      <Task
        :title="task.title"
        :description="task.description"
        :completed="task.completed"
        :priority="task.priority"
      />
    </div>
  </dialog>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  &--open {
    display: flex;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<script setup lang="ts">
import { Task } from "@/entities";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object,
    default: () => {
      return {
        id: 0,
        title: "",
        description: "",
        completed: false,
        priority: "Low",
      };
    },
  },
});
</script>
