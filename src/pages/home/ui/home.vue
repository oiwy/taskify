<template>
  <el-container class="home">
    <div class="home__add">
      <el-button type="primary" @click="store.addTask()" plain>
        Add task
      </el-button>
    </div>
    <!-- Add component Tasks with Task -->
    <div
      v-for="task in incompleteTasks"
      v-if="incompleteTasks.length > 0"
      :key="task.id"
    >
      <Task
        v-if="!task.completed"
        :title="task.title"
        :description="task.description"
        :completed="task.completed"
        :priority="task.priority"
        @complete-task="store.completeTask(task.id)"
        @delete-task="store.deleteTask(task.id)"
        @edit-task="store.editTask(task)"
      />
    </div>
    <el-empty v-else :image-size="200" />
    <CompleteTask />
  </el-container>
  <ModalTask />
</template>

<style lang="scss" scoped>
.home {
  flex-direction: column;
  gap: 12px;

  &__add {
    display: flex;
    gap: 5px;
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Task, TaskModel } from "@/entities";
import { useModalStore } from "@/pages";
import { CompleteTask, ModalTask } from "@/widgets";

const store = useModalStore();
let tasks = ref<TaskModel[]>(store.getTasks());

watch(
  () => store.tasks,
  () => {
    tasks.value = store.tasks;
  }
);

const incompleteTasks = computed(() => {
  return tasks.value.filter((task: { completed: boolean }) => !task.completed);
});
</script>
